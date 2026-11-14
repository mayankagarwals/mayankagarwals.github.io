It is easy to misread a CUDA out-of-memory error. The GPU can report gigabytes reserved by PyTorch, a much smaller number actively allocated to tensors, and still be unable to satisfy a new allocation. That is not necessarily a capacity problem. It can be a *layout* problem.

PyTorch's `expandable_segments` option is an experimental response to one particular layout problem: workloads whose allocation sizes change a little from iteration to iteration. It does not make the GPU larger. It gives the caching allocator a different way to arrange memory so that small, unusable gaps do not accumulate as readily.

The useful mental model is not “a smarter cache.” It is “virtual address space as a flexible container for physical GPU pages.”

## The allocator's normal bargain

PyTorch uses a caching allocator for CUDA memory. Rather than return every freed tensor allocation immediately to CUDA, it retains blocks and reuses them later. This avoids repeated `cudaMalloc` / `cudaFree` calls and the synchronization costs they can bring.

That bargain works exceptionally well when a program repeatedly asks for the same shapes. A training job with a fixed batch size, fixed sequence length, and a stable execution graph tends to revisit familiar allocation sizes. A freed block can serve a later request, and the allocator settles into a steady state.

The hard case is *nearby* shapes. Consider batched inference that first runs with batch size `N` and later with `N + 1`. Its temporary tensors are not all the same size: one may scale like `N × A`, another like `N × A × B`. Some new requests can reuse an old block, some cannot, and the blocks that are almost useful leave small tails behind.

One tail is harmless. Across dozens of layers and changing shapes, those tails become slivers scattered through otherwise reserved memory. The application can have plenty of aggregate free bytes but no single suitable span for a new, large request. That is external fragmentation.

> Allocation failures are about satisfying one request at one addressable location—not merely adding up all free bytes.

## What a segment changes

With the normal strategy, large requests are backed by segments that begin at independently allocated locations. `expandable_segments:True` changes the unit of growth. Instead of acquiring a fresh segment for each larger need, PyTorch tries to maintain a segment per CUDA stream that can grow at its end.

When a new allocation needs more room, the allocator appends physical memory to that segment. Allocations for the slightly larger case can therefore tile into a growing contiguous region instead of being scattered among newly created, nearly compatible segments.

The benefit compounds with depth. A model with many layers can otherwise create a corresponding number of size-specific leftovers. A growable segment turns many of those individually stranded tails into part of a single allocation space.

## The virtual-memory mechanism underneath

CUDA's lower-level virtual-memory APIs make this possible. They separate three jobs that `cudaMalloc` normally bundles together:

1. Reserve a virtual address range.
2. Create physical memory backing.
3. Map physical memory into all or part of that address range and give the GPU access to it.

PyTorch reserves a very large virtual address range for an expandable segment, but initially maps only the physical memory it needs. As demand grows, it creates more physical handles and maps them directly after the existing portion. To the allocator, the segment has one stable, contiguous address range even though its physical backing arrived over time.

This is conceptually closer to extending a file with `mmap`-style primitives than repeatedly requesting unrelated heap objects. CUDA exposes the relevant primitives as `cuMemAddressReserve`, `cuMemCreate`, `cuMemMap`, and `cuMemSetAccess`. PyTorch's source describes page-granular growth; the exact granularity is an implementation and platform detail, not an application-level contract.

There is a second useful consequence. If the allocator runs out of memory, it can unmap empty physical pages from an expandable segment and make those pages available for another mapping. It cannot rescue memory held by a live tensor, but it has more flexibility with unused portions of its own layout.

## Turning it on

Set the allocator configuration before launching the process that uses CUDA:

```bash
export PYTORCH_ALLOC_CONF=expandable_segments:True
python serve.py
```

`PYTORCH_CUDA_ALLOC_CONF` remains an alias for backwards compatibility, but current PyTorch documentation names `PYTORCH_ALLOC_CONF` as the primary variable. Multiple allocator settings are comma-separated.

This option belongs to PyTorch's native caching allocator. It is not a universal CUDA-memory switch: settings that alter the native allocator are not necessarily meaningful when the allocator backend is `cudaMallocAsync`.

## When it is the right experiment

Try `expandable_segments` when all of the following are broadly true:

- allocation shapes vary at runtime—dynamic batch sizes, token lengths, image dimensions, or request mixes are common examples;
- the workload fails or becomes unstable near memory capacity even though allocator diagnostics point to reserved-but-inactive memory; and
- you can test the setting in an environment representative of production.

It is less compelling for a workload that has already reached a stable allocation pattern. In that case, it adds complexity without necessarily improving peak memory use. It is also not a cure for a genuine capacity problem: if the live model weights, activations, and workspaces require more physical memory than the device has, a different layout cannot change that fact.

The feature is documented as experimental, so it deserves the same discipline as any allocator change. Test the specific PyTorch, CUDA driver, hardware, multiprocessing, and serving setup you intend to run. Measure latency and throughput as well as whether the out-of-memory error disappears.

## Diagnose before declaring victory

Allocator knobs are most valuable when they follow evidence. PyTorch exposes `torch.cuda.memory_stats()`, `torch.cuda.memory_summary()`, and `torch.cuda.memory_snapshot()` to inspect allocator behavior. A memory snapshot is particularly helpful for seeing the allocation patterns that produce fragmentation.

My preferred sequence is:

1. Reproduce the failure with the real shape distribution, not a single synthetic batch.
2. Capture allocator statistics or a snapshot near the failure.
3. Enable `expandable_segments:True` at process startup.
4. Repeat the same workload and compare success rate, reserved memory, tail latency, and throughput.

If the workload is dynamic, this setting can be a clean escape hatch: not because it finds extra GPU memory, but because it avoids turning usable memory into a collection of addresses that are each just a little too small.

## References

- [PyTorch CUDA semantics: memory management](https://docs.pytorch.org/docs/stable/notes/cuda.html#memory-management)
- [PyTorch `CUDACachingAllocator.cpp`: “Expandable Segments” design note](https://github.com/pytorch/pytorch/blob/main/c10/cuda/CUDACachingAllocator.cpp)

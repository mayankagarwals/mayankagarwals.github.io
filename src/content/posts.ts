export type PostMetadata = {
    slug: string;
    title: string;
    description: string;
    date: string;
    displayDate: string;
    readingTime: string;
    filename: string;
};

export const posts: PostMetadata[] = [
    {
        slug: 'pytorch-expandable-segments',
        title: 'How PyTorch expandable_segments turns fragmentation into a mapping problem',
        description: 'A look below the caching allocator: why slightly changing shapes leave GPU memory stranded, and how expandable segments use CUDA virtual memory to recover it.',
        date: '2026-11-13',
        displayDate: 'November 13, 2026',
        readingTime: '8 min read',
        filename: 'pytorch-expandable-segments.md',
    },
];

export function getPost(slug: string | undefined) {
    return posts.find((post) => post.slug === slug);
}

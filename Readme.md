# Personal website

## Writing workflow

The Markdown file in `public/posts/` is the canonical source for each article. The blog index and its metadata live in `src/content/posts.ts`.

To publish a new post locally:

1. Add a Markdown file in `public/posts/`.
2. Add its metadata to the `posts` array in `src/content/posts.ts`. The `slug` becomes the URL: `/#/blog/<slug>`.
3. Run `npm run build` to make sure the production site compiles.

The Markdown file is the version to refine first; Substack can be a formatted copy of that finished article.

## Local development

1. Install node version 16 
2. Run `npm install`
3. Run `npm start`

## Deployment

Run `npm run deploy` to publish to GitHub Pages.


# liewcf.org

Astro-generated static profile and Project catalog for `liewcf.org`.

The visitor-facing site uses semantic HTML, plain CSS, vanilla browser JavaScript, and typed local Markdown for Projects. Astro provides static generation and local preview only; there is no server runtime, Tailwind, client-side UI framework, CMS, or API backend.

## Development

```sh
npm install
npm run dev
```

Open `http://localhost:4321`. The development server also binds to the local network on port `4321`.

## Checks

```sh
npm run check
```

This checks Astro types, builds `dist/`, serves that production output, and runs the Playwright public-contract suite.

## Files

- `src/pages/index.astro` — homepage content, metadata, outbound links, and vanilla browser behavior.
- `src/pages/about.astro` — expanded factual About page.
- `src/content/projects/` — typed, draft-aware Project Markdown.
- `src/pages/projects/` — Project catalog and generated detail routes.
- `src/pages/404.astro` — branded noindex 404 page.
- `public/` — stable CSS, assets, crawler/security/agent files, redirects, and headers.
- `dist/` — generated static production output.
- `tests/e2e/navigation.spec.ts` — production-output public-contract tests.

## Deployment

Cloudflare Pages should publish the generated static output.

Recommended settings:

- Build command: `npm run build`
- Output directory: `dist`
- Runtime environment variables: none

Run `npm run check` locally or in CI before deploying. Cloudflare Pages should upload only `dist/`.

# liewcf.org

Astro-generated static profile, About, Project catalog, and Updates publication surface for `liewcf.org`.

The visitor-facing site uses semantic HTML, plain CSS, vanilla browser JavaScript, and typed local Markdown for Projects and Updates. Astro provides build and preview tooling only; production has no server runtime, adapter, database, API backend, runtime environment variables, Tailwind, or client-side UI framework.

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

This is the release gate. It checks Astro diagnostics, validates valid and invalid Update fixtures, creates a clean production build in `dist/`, serves that output, and runs the Playwright public-contract suite across the homepage, About, Projects, Updates, RSS, discovery, routing, security artifacts, assets, responsive behavior, and draft exclusion.

## Files

- `src/pages/index.astro` — homepage content, metadata, outbound links, and vanilla browser behavior.
- `src/pages/about.astro` — expanded factual About page.
- `src/content/projects/` — typed, draft-aware Project Markdown.
- `src/pages/projects/` — Project catalog and generated detail routes.
- `src/content/updates/` — typed, draft-aware Update Markdown linked to exactly one Project.
- `src/pages/updates/` — chronological Update index, generated detail routes, and RSS.
- `src/pages/index.md.ts` — generated agent-facing Markdown synchronized with published content.
- `src/pages/sitemap.xml.ts` — generated sitemap synchronized with published content.
- `src/pages/404.astro` — branded noindex 404 page.
- `public/` — stable CSS, assets, crawler/security/agent files, redirects, and headers.
- `dist/` — generated static production output.
- `tests/e2e/navigation.spec.ts` — production-output public-contract tests.

## Cloudflare production contract

Cloudflare Pages should publish the generated static output.

Recommended settings:

- Build command: `npm run build`
- Output directory: `dist`
- Runtime environment variables: none

The generated `_redirects` and `_headers` files preserve the site’s routing, discovery, content-type, and security contracts. Run `npm run check` locally or in CI before deploying. Cloudflare Pages should upload only `dist/`.

No production deployment, Cloudflare dashboard change, or DNS change is performed by this repository handoff.

## Future Decap compatibility

The typed local Markdown collections are compatible with a future Decap CMS phase, but this release intentionally contains no `/admin/` route, Decap bundle, authentication or backend configuration, secret, server runtime, or runtime environment requirement. Adding that phase requires a separate accepted decision and implementation.

# liewcf.org

Static one-page profile site for `liewcf.org`.

The site is plain HTML and CSS. It is intentionally not a blog, CMS, Astro app, or multi-page portfolio.

## Development

```sh
npm install
npm run dev
```

Open `http://127.0.0.1:4321`.

## Checks

```sh
npm run check
```

This runs the Playwright smoke tests for the static profile page.

## Files

- `index.html` — page content, metadata, and outbound links.
- `styles.css` — all visual styling and responsive layout.
- `assets/` — profile, Open Graph, favicon, and touch-icon assets.
- `robots.txt` — crawler access rules.
- `tests/e2e/navigation.spec.ts` — static page smoke tests.

## Deployment

Cloudflare Pages should publish the static site directly.

Recommended settings:

- Build command: `exit 0`
- Output directory: `/`
- Runtime environment variables: none

Run `npm run check` locally or in CI before deploying. Cloudflare Pages should only upload the static files from the repository root.

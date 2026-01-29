# liewcf.org

Personal site and portfolio built with Astro.

Theme: based on the Dante Astro Theme by Just Good UI (GPL-3.0). See `LICENSE`.

## Development

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

## Content

- Projects live in `src/content/projects/` (Markdown files).
- Blog posts live in `src/content/blog/`.

## Deployment (Cloudflare Pages)

Build settings:

- Build command: `npm ci && npm run build`
- Output directory: `dist`

Environment variables:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL` (default `hello@liewcf.org`)
- `CONTACT_TO_EMAIL` (default `liewcf@gmail.com`)
- `TURNSTILE_SECRET_KEY`
- `PUBLIC_TURNSTILE_SITE_KEY`

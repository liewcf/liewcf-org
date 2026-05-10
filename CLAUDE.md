# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## Project

`liewcf.org` is a simple static one-page profile site built with plain HTML and CSS.

It is intentionally not an Astro app, blog, CMS, multi-page portfolio, contact form, or API-backed site.

## Commands

- Install dependencies: `npm install`
- Start local preview: `npm run dev`
- Run smoke checks: `npm run check`
- Run Playwright directly: `npm run test:e2e`

## Architecture

- `index.html` owns all page content, metadata, and outbound links.
- `styles.css` owns all visual styling and responsive behavior.
- `assets/` contains profile images, Open Graph image, favicons, and touch icons.
- `robots.txt` contains crawler access rules.
- `tests/e2e/navigation.spec.ts` contains Playwright smoke checks.

There is no framework runtime, generated route layer, content collection system, Cloudflare Pages Function, or runtime environment-variable requirement.

## Code Style

- Prefer semantic HTML and plain CSS.
- Keep the page concise and profile-focused.
- Keep changes small and easy to inspect.
- Do not add a framework, blog, CMS behavior, routing, API functions, contact form, Turnstile, Resend, or a large build pipeline unless the user explicitly asks for a new direction.

## Contact And Links

- Contact is outbound-link only.
- Email uses `mailto:`.
- External profile links should have clear accessible names and safe `rel` attributes where appropriate.

## Validation

- Run `npm run check` after page, asset, or link changes when feasible.
- For visual changes, preview with `npm run dev` and inspect desktop and mobile widths.

## Deployment

Cloudflare Pages should publish the static site directly from the repository root.

Recommended settings:

- Build command: `exit 0`
- Output directory: `/`
- Runtime environment variables: none

Run `npm run check` locally or in CI before deploying.

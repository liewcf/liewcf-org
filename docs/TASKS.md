# Tasks

## Current

- [ ] Preview the final static page on desktop and mobile widths before launch if visual layout changes continue.
- [ ] Configure and verify `www.liewcf.org` in Cloudflare so it redirects cleanly to `https://liewcf.org/`.
- [ ] Validate Google Search Console indexing and sitemap submission after deployment.
- [ ] Enable Cloudflare Markdown for Agents for `liewcf.org`, then verify `Accept: text/markdown` returns `Content-Type: text/markdown`.

## Blockers

- None recorded.

## Done

- [x] Decided to replace the Astro site with a static one-page profile.
- [x] Removed the contact form/API direction in favor of outbound contact links.
- [x] Kept a tiny npm workflow for preview and smoke checks.
- [x] Updated Cloudflare guidance to use `exit 0` and keep checks local/CI.
- [x] Refined one-page copy, renamed "Proof points" to "Things I've Built", and switched the hero to the portrait image.
- [x] Added a placeholder-backed featured GitHub projects section for later curated repo copy.
- [x] Featured `project-memory`, `QuickRes`, `enjinmel-smtp`, and `public-draft-share` on the static homepage with direct GitHub links.
- [x] Removed ignored migration/build leftovers and deleted unused tracked image/favicon files no longer referenced by the static page.
- [x] Confirmed Cloudflare Pages settings: build command `npm ci && npm run build` works with no-op build script, output directory set to `/`. Live site at `liewcf.org` (custom domain) matches local source.
- [x] Added sitemap and JSON-LD structured data from `docs/SEO_AUDIT_FIX_PLAN.md`.
- [x] Added AVIF/WebP hero image sources with JPG fallback and `fetchpriority="high"` for the LCP image.
- [x] Added Cloudflare Pages `_redirects` rules for removed routes: `/about/`, `/blog/`, `/projects/`, and `/contact/`.
- [x] Added static agent discovery: Cloudflare Pages `_headers`, open Content Signals in `robots.txt`, an empty API catalog Linkset, an Agent Skills index with verified digest, and read-only homepage WebMCP tools.

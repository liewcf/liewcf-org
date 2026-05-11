# Tasks

## Current

- [ ] Preview the final static page on desktop and mobile widths before launch if visual layout changes continue.
- [ ] Validate live DNS/index status and Search Console submission from an external network after deployment.

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

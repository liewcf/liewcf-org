---
title: Current Tasks
description: Current tasks, blockers, verification state, and recommended next actions.
doc_type: task_state
status: active
created: 2026-07-19
updated: 2026-07-19
tags:
  - project-memory
  - tasks
  - current-state
audience:
  - agent
  - maintainer
related:
  - PROJECT_CONTEXT.md
  - DECISIONS.md
  - CHANGELOG_WORK.md
---

# Tasks

## Recommended Next Action

- None recorded.

## Current

- None.

## Verification

- The curated featured-project update passes all 18 Playwright smoke tests and has been inspected at 1440px and 390px widths with no horizontal overflow.

## Blockers

- None recorded.

## Not Doing

- Cloudflare Markdown for Agents is not currently being enabled because the site is on a Cloudflare Free account, where that feature is not available. Do not keep this as an open launch task unless the account plan or Cloudflare feature availability changes.

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
- [x] Applied small accessibility/UI polish in `styles.css`: darker muted text, smooth link/button color transitions, and larger touch targets on coarse-pointer devices.
- [x] Previewed the final static page on desktop and mobile widths before launch.
- [x] Configured and verified `www.liewcf.org` redirects cleanly to `https://liewcf.org/` with a live `301` check.
- [x] Validated Google Search Console indexing and sitemap submission after deployment.
- [x] Fixed the specification.website audit gaps in source: real Cloudflare Pages 404 page, HSTS, clickjacking protection, CSP, Permissions-Policy, `/.well-known/security.txt`, `/llms.txt`, and `/index.md`.
- [x] Verified live deployment: real 404 on nonexistent path, HSTS, CSP/frame-ancestors, and Permissions-Policy headers confirmed working.
- [x] Applied the `redesign-existing-projects` skill in a `redesign/taste-skill` worktree: neutral-premium palette, self-hosted Outfit, zig-zag focus grid, dot+grain texture, glassmorphism cards, staggered scroll reveals, active/hover states, skip-link, `100dvh`, widened shell. 18/18 tests pass.
- [x] Updated the featured project set to `youtube-watchlist-manager`, `enjinmel-smtp`, `verified-person-research`, and `imagezoom`, including the category filters, Markdown profile, WebMCP output, and regression coverage.

---
title: Current Tasks
description: Current tasks, blockers, verification state, and recommended next actions.
doc_type: task_state
status: active
created: 2026-07-19
updated: 2026-07-26
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

- Have the coordinating task review and integrate ticket 05, then select the next unblocked ticket from the existing private frontier.

## Current

- Ticket 05 is implemented in its separate worktree, pending coordinating-task review and integration. Private ticket status remains unchanged.

## Verification

- The curated featured-project update passes all 18 Playwright smoke tests and has been inspected at 1440px and 390px widths with no horizontal overflow.
- Matt engineering-skill setup uses gitignored `.scratch/` for private local issues, default triage statuses, and single-context domain docs under the conventions in `docs/agents/`.
- `/grill-with-docs` reached shared understanding for the Astro scope, recorded the Project and Update language in `CONTEXT.md`, and accepted ADR 0001.
- `/to-spec` published the Astro migration specification to the private local tracker with `ready-for-agent` status and the existing `npm run check` command as its single acceptance seam.
- `/to-tickets` published seven private `ready-for-agent` tracer-bullet tickets. Ticket 01 is the initial frontier; tickets 04 and 05 can proceed independently after ticket 03.
- Ticket 01 now generates the preserved homepage and branded 404 through fully static Astro output; `npm run check` covers Astro diagnostics, a clean production build, and 21 Playwright public-contract checks against Astro preview.
- Ticket 02 now publishes a canonical factual About page through a shared Home/About site shell, removes the obsolete About redirect, adds About to the sitemap, and keeps unfinished Projects/Updates destinations out of navigation.
- `npm run check` reports clean Astro diagnostics, builds three static pages, and passes 25 Playwright checks, including shared navigation/current-page state, About metadata/content/contact boundaries, skip-link focus, homepage regressions, and 1440px/390px overflow coverage.
- Ticket 03 adds a typed, repository-slugged, production-draft-aware Project collection; `/projects/`; four canonical detail routes; shared accessible filtering/cards; Projects navigation; sitemap entries; `/uploads/` cover-image support; and the current no-Updates state without introducing Update routes.
- `npm run check` reports clean Astro diagnostics, builds eight static pages, and passes 30 Playwright checks covering catalog order, four details, metadata, credential-free HTTP(S) live-URL validation, filtering, optional-section rendering, GitHub/detail links, production draft exclusion, and 1440px/390px overflow behavior.
- `astro dev` locally serves the draft fixture at `/projects/draft-preview/` with HTTP 200, while the production build contains no draft route or listing.
- Ticket 04 makes published featured Project Markdown the source for homepage cards, ordering, category filters, and WebMCP Project results; the four launch entries carry explicit order metadata and draft/non-featured entries stay excluded.
- `npm run check` reports clean Astro diagnostics, builds eight static pages, and passes 31 Playwright checks including the four-card homepage contract, manual feature order, all metadata-derived filter counts, internal/GitHub links, draft exclusion, and visible/WebMCP equality.
- Browser QA at 1440×900 and 390×844 confirms the derived filters wrap without horizontal overflow, pressed state/live counts work, Project actions remain distinct, and no relevant console warnings or errors occur.
- Ticket 05 adds a typed Project-linked Update collection, zero-entry `/updates/`, Project timelines, slug-based details, production-aware sitemap/RSS generation, final navigation, production draft exclusion, and real 404 handling for former Blog routes.
- `npm run check` reports clean Astro diagnostics, validates one published fixture plus three invalid relationship fixtures, builds nine static pages with zero Update details, and passes 35 Playwright checks including desktop/mobile overflow coverage.
- `astro dev` locally serves `/updates/draft-preview/` with HTTP 200 and its `imagezoom` relationship, while the production build excludes that draft from routes and discovery surfaces.

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
- [x] Configured the Matt engineering skills with a private local Markdown issue tracker, default triage statuses, and single-context domain-doc conventions.
- [x] Defined the Astro migration scope through `/grill-with-docs`, including pages, content relationships, publishing boundaries, design preservation, static deployment, and future Decap compatibility.
- [x] Synthesized and privately published the implementation-ready Astro migration specification with exhaustive user stories, implementation decisions, testing decisions, and exclusions.
- [x] Split the Astro migration into seven dependency-aware private tickets, one file per vertical slice.

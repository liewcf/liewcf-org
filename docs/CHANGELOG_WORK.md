---
title: Work Changelog
description: Dated notes on changed files, deliverables, tooling, checks, and verification.
doc_type: work_log
status: active
created: 2026-07-19
updated: 2026-07-26
tags:
  - project-memory
  - changelog
  - work-log
  - verification
audience:
  - agent
  - maintainer
related:
  - PROJECT_CONTEXT.md
  - DECISIONS.md
  - TASKS.md
---

# Work Changelog

## 2026-05-10

- Added a committed design spec for replacing the Astro site with a static one-page profile.
- Migrated the live site surface to `index.html`, `styles.css`, root-level assets, and `robots.txt`.
- Replaced Astro/Tailwind tooling with a tiny Vite preview command and Playwright smoke checks.
- Removed Astro source, content collections, Cloudflare contact API, and old framework configuration.
- Updated README, AGENTS.md, and project memory for the static one-page architecture.

## 2026-05-11

- Updated README and CLAUDE.md so Cloudflare Pages deploys static root files with build command `exit 0`; `npm run check` remains local/CI verification.
- Refined `index.html` copy to simpler profile wording and changed the section label from "Proof points" to "Things I've Built".
- Switched the hero image from the landscape WordCamp photo to `assets/liewcf-profile.jpg` so mobile cropping shows the person clearly.
- Updated `tests/e2e/navigation.spec.ts` to expect the portrait hero image alt text.
- Verified the current static site with `npm run check`; Playwright reported 2 passing tests.
- Added a static featured GitHub projects section with three placeholder project cards, responsive styling, and Playwright coverage for the new section.
- Verified the featured projects update with `npm run check`; Playwright reported 2 passing tests. Previewed desktop and mobile widths with no horizontal overflow.
- Replaced the featured-project placeholders with `project-memory`, `QuickRes`, `enjinmel-smtp`, and `public-draft-share`, then adjusted the project grid to a two-column desktop layout.
- Updated Playwright coverage to assert the four featured project names and verified with `npm run check`; Playwright reported 2 passing tests.
- Removed ignored generated leftovers (`.astro/`, `dist/`, Playwright reports/results, local notes, `.DS_Store`) and unused tracked assets no longer referenced by `index.html`.
- Verified the cleanup with `npm run check`; Playwright reported 2 passing tests.
- Fixed Cloudflare Pages deployment: added `"build": "exit 0"` to package.json scripts (Pages runs `npm run build` by default) and changed the output directory from `dist` to `/` in Cloudflare Dashboard to match the static root structure.
- Confirmed live site at `https://liewcf.org` (custom domain, backed by Cloudflare Pages on `liewcf-org.pages.dev`) matches local `index.html` after redeploy.
- Added `sitemap.xml` with canonical `https://liewcf.org/` and referenced it from `robots.txt`.
- Added static `Person` and `WebSite` JSON-LD to `index.html` with absolute production URLs.
- Tightened page `<title>` and added `og:site_name` meta.
- Extended Playwright tests to assert sitemap, robots.txt sitemap line, and JSON-LD presence/parsing.
- Verified with `npm run check`; 4 Playwright tests passing.
- Committed and pushed the SEO/static cleanup work to `origin/main` as `02a7557` (`Improve static site SEO metadata and sitemap`).
- Updated project memory to record the static SEO architecture and remaining external validation follow-up.

## 2026-05-12

- Added `assets/liewcf-profile.avif` and `assets/liewcf-profile.webp`, updated the hero image to use AVIF/WebP/JPG fallback, and added `fetchpriority="high"` plus `decoding="async"` for the LCP image.
- Extended Playwright coverage for the modern hero image sources and LCP attributes; verified with `npm run check` reporting 4 passing tests.
- Pushed `e57b5f9` (`Optimize hero image delivery`); PageSpeed API retest reported 100 scores for performance, accessibility, best practices, and SEO on both mobile and desktop.
- Added root `_redirects` rules so removed legacy routes redirect to `/` with 301 status on Cloudflare Pages.
- Extended Playwright coverage to assert `_redirects` contains `/about/`, `/blog/`, `/projects/`, and `/contact/` rules; verified with `npm run check` reporting 5 passing tests.
- Pushed `c65c5b1` (`Redirect removed routes to homepage`).
- Added Cloudflare Pages `_headers` with homepage Link headers for `/.well-known/api-catalog` and the Agent Skills index, plus content-type overrides for the discovery files.
- Added `Content-Signal: ai-train=yes, search=yes, ai-input=yes` to `robots.txt`.
- Added `/.well-known/api-catalog` as an empty `application/linkset+json` Linkset because the site has no real API.
- Added `/.well-known/agent-skills/index.json` and `/.well-known/agent-skills/liewcf-profile/SKILL.md` with a verified SHA-256 digest.
- Added read-only WebMCP tools in `index.html` for profile summary, featured projects, and contact links when `navigator.modelContext` is available.
- Extended Playwright coverage for agent-readiness headers, Content Signals, discovery files, digest verification, and WebMCP registration; verified the focused spec with 9 passing tests.

## 2026-05-14

- Reduced referenced image/icon asset weight without changing dimensions: rebuilt the legacy ICO favicon and recompressed the profile JPG/WebP/AVIF fallbacks.

## 2026-05-20

- Applied small accessibility/UI polish in `styles.css`: darker muted text, smooth link/button color transitions, and 48px touch targets for profile, project, and footer links on coarse-pointer devices. Verified with `npm run check` reporting 9 passing Playwright tests, then pushed commit `d887244`.
- Completed post-deployment Search Console validation for homepage indexing and sitemap submission.
- Updated project memory to record the completed `www` redirect/Search Console validation and the Cloudflare Markdown for Agents limitation on the current Cloudflare Free account.

## 2026-05-22

- Referenced the scratch preview in `/Users/cheonfongliew/.gemini/antigravity/scratch/liewcf-preview/` and updated `index.html`/`styles.css` with tighter editorial copy, light/dark styling tokens, visible focus states, numbered focus tiles, project repo labels, and a static category filter for featured projects.
- Preserved the existing no-contact-form direction: kept contact as outbound `mailto:` links and did not copy the scratch preview's form section or external font links.
- Extended Playwright coverage for external link safety, static project filtering, and outbound-only contact.
- Added root `favicon.ico`, updated the homepage ICO link to `/favicon.ico`, and added Playwright coverage so browser chrome and tools that probe the conventional favicon path get a 200 response; regenerated both ICO files from `assets/apple-touch-icon.png` after the previous ICO rendered blank.

## 2026-05-23

- Removed cleanup candidates that no longer matched the static site: ignored `test-results/` and `.superpowers/` generated leftovers, duplicate `assets/favicon.ico`, and stale Prettier config files that referenced old Astro/Tailwind plugins without an active formatting script.
- Fixed the modern web audit findings by adding explicit list semantics to styled homepage lists, switching base font sizes from `px` to `rem`, and adding Playwright regression coverage.

## 2026-05-31

- Added a root `404.html` so Cloudflare Pages can serve unknown routes with a real 404 response instead of the homepage SPA fallback.
- Added site-wide Cloudflare Pages security headers in `_headers`: HSTS, CSP with `frame-ancestors 'none'`, `X-Frame-Options: DENY`, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy`.
- Added `/.well-known/security.txt`, `/llms.txt`, and `/index.md`, plus explicit content-type rules for those files.
- Extended Playwright smoke coverage for the audit fixes: 404 page source, security headers, security contact file, and agent-facing text files.

## 2026-07-04

- Applied the `Leonxlnx/taste-skill` `redesign-existing-projects` skill in a new git worktree on branch `redesign/taste-skill` (sibling dir `liewcf.org-redesign`); `main` checkout untouched.
- Changed `styles.css`: added `@font-face` for self-hosted Outfit (latin variable woff2); dropped Georgia serif from `h1`/`h2`/`.tile-number`; normalized `font-weight: 750` → 600; neutralized the palette (`--paper` `#fafaf9`, `--ink` `#18181b`, `--line` `#e4e4e7`, neutral shadows) while keeping terracotta as the single accent; swapped the graph-paper `body::before` for a dot grid and added a fixed `body::after` grain overlay; widened `.page-shell`/`.site-footer` 1120px → 1200px; bumped `.section` padding 54px → 72px; `100vh` → `100dvh`; softened card radius 8px → 14px and hero-image 8px → 12px; reworked the focus grid into an asymmetric zig-zag with per-tile `margin-top` offsets; added `:active` scale, card hover lift, true-glassmorphism inner border, `text-wrap: balance/pretty`, `scroll-behavior: smooth`, skip-link styles, and staggered reveal transitions.
- Changed `index.html`: added a font preload link, a "Skip to content" link, and an `IntersectionObserver` reveal script (before the WebMCP guard) with a no-IO fallback; existing filter logic and WebMCP registration unchanged.
- Added `assets/fonts/outfit-latin.woff2` (Outfit variable, latin subset, 32 KB) and `assets/grain.svg` (tiled `feTurbulence` noise, 323 B).
- Verified with `npm run check`: 18/18 Playwright tests pass. Curl-checked both new assets serve 200 (`font/woff2`, `image/svg+xml`). Audited: no inline `style=""`, no external font/style/script refs, no `font-size: 18px`/`16px` in `styles.css`. Captured desktop + mobile screenshots; note: visual self-review was limited because the executing model cannot process image input.

## 2026-07-19

- Refreshed the `AGENTS.md` project-memory requirement, added Project Memory Metadata v1 frontmatter to all four `docs/*.md` memory files, and normalized `docs/TASKS.md` with recommended-next-action and verification sections.
- Verified the setup and metadata repair scripts are idempotent and `git diff --check` passes.
- Replaced the featured homepage projects with the user-curated set `youtube-watchlist-manager`, `enjinmel-smtp`, `verified-person-research`, and `imagezoom`; synchronized the filters, Markdown profile, read-only WebMCP list, Playwright assertions, and future-agent guidance.
- Verified the update with `npm run check` (18/18 passing), desktop and mobile previews, and a 390px overflow check (`scrollWidth` equals `clientWidth`).

## 2026-07-26

- Configured Matt engineering skills in `CLAUDE.md` and `docs/agents/` with a private local Markdown issue tracker, default triage statuses, and single-context domain-doc conventions.
- Added `.scratch/` to `.gitignore` so private specs and issues stay out of the public repository.
- Recorded `/grill-with-docs` as the next step for defining the requested Astro migration; `CONTEXT.md` and ADRs remain lazy outputs of that flow rather than empty setup files.
- Verified nested `.scratch/` spec and issue paths resolve to the ignore rule, the `CLAUDE.md` setup block is unique, `git diff --check` passes, and all 18 Playwright checks pass.
- Completed `/grill-with-docs` for the Astro migration and created `CONTEXT.md` with the canonical Project and Update language.
- Added accepted ADR 0001 for reintroducing Astro as a fully static multi-page site while preserving the current design and deferring Decap CMS.
- Recorded `/to-spec` as the next flow; no site implementation changed during the interview.
- Published the Astro migration specification to the gitignored private local tracker with `ready-for-agent` status.
- Defined `npm run check` as the single production-output acceptance seam and recorded `/to-tickets` as the next flow.
- Published seven gitignored `ready-for-agent` Astro migration tickets as separate tracer-bullet files with explicit blocking edges.
- Recorded ticket 01 as the initial implementation frontier; tickets 04 and 05 form the only parallel branch after ticket 03.
- Implemented ticket 01 by moving the unchanged visitor-facing homepage and branded 404 onto Astro 7 fully static production output without an adapter or browser framework runtime.
- Moved stable public CSS, images, fonts, crawler/security/agent resources, redirects, and headers under `public/` so their generated URLs remain unchanged.
- Replaced Vite/no-op build commands with Astro development, type-check, build, and production-preview commands bound to `0.0.0.0:4321`.
- Adapted Playwright coverage to the generated `dist/` seam and added production-output, reveal fallback, reduced-motion, keyboard-focus, real-404, and externally callable WebMCP assertions.
- Upgraded the new Astro toolchain to the audit-recommended patched major and applied non-breaking transitive updates; `npm audit` reports 0 vulnerabilities.
- Verified `npm run check`: Astro reported 0 errors, 0 warnings, and 0 hints; the static build generated two pages; all 21 Playwright tests passed.

---
title: Decisions
description: Important project, product, technical, process, or content decisions with rationale and consequences.
doc_type: decision_log
status: active
created: 2026-07-19
updated: 2026-07-26
tags:
  - project-memory
  - decisions
  - rationale
audience:
  - agent
  - maintainer
related:
  - PROJECT_CONTEXT.md
  - TASKS.md
  - CHANGELOG_WORK.md
---

# Decisions

## 2026-05-10

- Replace the Astro portfolio/blog with a simple static one-page Editorial Profile site.
- Remove blog, project pages, content collections, the contact form, and the Cloudflare Pages contact API rather than archiving them in the repo.
- Keep a tiny npm workflow for local preview and Playwright smoke checks.
- Keep repo-level project memory in `AGENTS.md` plus `docs/PROJECT_CONTEXT.md`, `docs/DECISIONS.md`, `docs/TASKS.md`, and `docs/CHANGELOG_WORK.md`.

## 2026-05-11

- Use Cloudflare Pages build command `exit 0` for this static site; keep `npm run check` as local/CI verification rather than a Pages deployment build step.
- Use the square portrait asset for the hero image because the landscape WordCamp image cropped poorly on mobile.
- Keep featured GitHub projects as a curated static section in `index.html`, using placeholder entries until exact repository URLs and copy are chosen.
- Keep SEO enhancements static and hand-authored: a one-URL root `sitemap.xml`, a sitemap reference in `robots.txt`, and factual `Person`/`WebSite` JSON-LD in `index.html`.

## 2026-05-12

- Use Cloudflare Pages `_redirects` for removed legacy routes instead of restoring those pages.
- Keep the hero portrait as AVIF/WebP with JPG fallback and `fetchpriority="high"` for the LCP image.
- Add agent-readiness metadata as static files and headers only: Link headers, Content Signals, an empty API catalog, an Agent Skills index, and browser WebMCP tools.
- Prefer truthful discovery over placeholder protocols: do not publish OAuth/OIDC metadata, OAuth protected-resource metadata, or an MCP Server Card until the site actually has protected APIs or a remote MCP server.

## 2026-05-20

- Do not pursue Cloudflare Markdown for Agents on the current Cloudflare Free account because the feature is not available there; keep the repo's existing static agent discovery as the supported agent-facing surface unless the account plan or feature availability changes.

## 2026-05-22

- Adopt the scratch preview's stronger editorial copy, light/dark CSS tokens, visible focus states, numbered focus tiles, and static project category filter while preserving the repo rule that contact stays outbound `mailto:` only. Do not add the preview contact form unless a future explicit decision changes the site's no-form/no-API direction.

## 2026-05-31

- Keep specification.website audit fixes static and Cloudflare Pages-native: use root `404.html` for real 404 status, root `_headers` for HSTS/CSP/clickjacking/permissions headers, and plain text files for `security.txt`, `llms.txt`, and the Markdown profile.
- Keep the CSP compatible with the current inline JSON-LD and small inline homepage script; remove `'unsafe-inline'` only if those inline scripts move to external files.

## 2026-07-04

- Applied the `Leonxlnx/taste-skill` `redesign-existing-projects` skill (Scan → Diagnose → Fix) in a dedicated worktree on branch `redesign/taste-skill`; referenced the skill's `SKILL.md` rather than copying it into the repo.
- Chose a neutral-premium aesthetic: neutralized the warm paper/ink/line palette to neutral zinc tones, kept the existing terracotta (`#b6402d`/`#7e2d21`) as the single accent, and dropped the Georgia serif display headings in favor of a self-hosted Outfit variable sans for hierarchy via size/weight/tracking.
- Self-hosted the Outfit variable woff2 (latin subset, ~32 KB) under `assets/fonts/` with a local `@font-face` to fix the previously broken font reference within the CSP `font-src 'self'` constraint; no external font CDN.
- Reworked the 3-equal-column focus grid (the skill's top-flagged "most generic AI layout") into an asymmetric zig-zag via CSS-only per-tile `margin-top` offsets; kept the same three `<article class="focus-tile">` markup.
- Added premium surface and motion upgrades within the no-framework constraint: dot-grid background, fixed grain overlay (`assets/grain.svg`), true-glassmorphism inner border on project cards, `:active` scale feedback, card hover lift, and staggered `IntersectionObserver` scroll reveals (opacity/transform only, respecting `prefers-reduced-motion`).
- Kept all test-pinned copy, structure, asset filenames, CSS-unit rules (`1.125rem`/`1rem`, no `18px`/`16px`), and the inline filter/WebMCP scripts unchanged; all 18 Playwright smoke tests pass.

## 2026-07-19

- Feature the user-curated repositories `youtube-watchlist-manager`, `enjinmel-smtp`, `verified-person-research`, and `imagezoom` in that order, keeping the static homepage cards, category filters, Markdown profile, WebMCP output, and tests synchronized without adding a GitHub API dependency.

## 2026-07-26

- Configure the Matt engineering skills with a private local Markdown issue tracker under gitignored `.scratch/` because the repository is public and its planning issues must remain private.
- Use the default triage status vocabulary and a single-context domain-doc layout. Let `/domain-modeling`, normally reached through `/grill-with-docs`, create root `CONTEXT.md` and `docs/adr/` lazily when the Astro migration resolves domain language or architectural decisions.
- Reintroduce Astro as a static generator for an expanded multi-page site while retaining the current neutral-premium design, plain CSS, vanilla browser scripts, Cloudflare Pages hosting, and existing public contracts.
- Add About, Projects, Project details, Updates, and Update details. Use Updates instead of Blog, require each Update to belong to one Project, and return 404 for old Blog URLs.
- Publish Projects and Updates manually from local Markdown content collections with draft support. Launch with the current four Projects and no Updates; defer Decap CMS administration and authentication to a future phase.
- Keep contact outbound-only and exclude Tailwind, client-side UI frameworks, SSR, databases, runtime APIs, and environment variables from the initial migration. See `docs/adr/0001-reintroduce-astro-as-static-multipage-site.md`.
- Use one Astro site shell for shared metadata defaults, skip-link/main focus behavior, page structure, footer, and responsive Home/About navigation. Expose only routes that are live and use `aria-current="page"` for the active destination.
- Keep the About narrative limited to professional themes already supported by the homepage and curated projects; do not add chronology, employers, adoption claims, awards, or personal-history claims without verified source material.
- Derive each Project’s canonical slug from its GitHub repository name and fail the build when the Markdown filename does not match it; keep the established launch order in one source helper rather than adding non-presentation ordering metadata.
- Use required typed Project fields for title, summary, GitHub repository URL, categories, featured state, and draft state. Limit optional metadata to status, live URL, and a stable `/uploads/` cover-image URL, rendering each only when present.
- Keep Project drafts available through `astro dev` while filtering them from production indexes, homepage featuring, generated detail routes, sitemap, and navigation-linked published surfaces.
- Publish the initial Projects catalog and four concise case studies from established copy and public repository documentation. Each detail page states that it has no published Updates without adding Update routes or implying that publishing is live.

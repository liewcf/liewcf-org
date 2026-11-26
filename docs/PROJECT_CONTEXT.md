---
title: Project Context
description: Stable project facts, structure, workflows, resources, and constraints.
doc_type: context
status: stable
created: 2026-07-19
updated: 2026-11-26
tags:
  - project-memory
  - context
  - durable-knowledge
audience:
  - agent
  - maintainer
related:
  - DECISIONS.md
  - TASKS.md
  - CHANGELOG_WORK.md
---

# Project Context

## Overview

- Project purpose: Personal profile and credibility page for `liewcf.org`.
- Primary users: Visitors who want to understand who Liew CheonFong is, what he builds, and how to contact or follow him.
- Last verified production deployment: [`4076118`](https://github.com/liewcf/liewcf-org/commit/40761187d7d3b6bcdec1b51ebac46167376f030c) on `main` deployed successfully to [Cloudflare Pages](https://637ca0d1.liewcf-org.pages.dev/) on 2026-11-19. Live verification covered both contact redirects, the three native WebMCP tools, the zone bridge, CSP, and analytics beacon absence. See `docs/CHANGELOG_WORK.md` for evidence and scope.

- The October refresh was observed live on 2026-11-19. The homepage showed the latest two published Updates, and the sitemap listed five Projects and six Updates. All 15 sitemap URLs returned successfully with matching canonicals.

## Approved Direction

- Replace the current implementation with an Astro-generated static multi-page site while preserving the current design and public contracts.
- Add About, Projects, Project details, Updates, and Update details. Updates replaces Blog; old Blog URLs return 404.
- Store Projects and Updates as local Markdown content collections with typed frontmatter and draft support. The site publishes five Projects and six Updates.
- Keep production fully static on Cloudflare Pages. Decap CMS compatibility is planned, but CMS administration, authentication, SSR, databases, runtime APIs, Tailwind, and client-side UI frameworks are outside the initial migration.
- The accepted rationale and consequences are recorded in `docs/adr/0001-reintroduce-astro-as-static-multipage-site.md`.

## Architecture

- Framework: Astro in fully static output mode; no adapter or browser framework runtime.
- Styling: Plain CSS in `public/styles.css`. Neutral-premium palette (zinc off-white/near-black base with a single terracotta accent); self-hosted Outfit variable sans (latin woff2 in `public/assets/fonts/`) for all text with hierarchy via size/weight/tracking; dot-grid background with a fixed grain overlay (`public/assets/grain.svg`); asymmetric zig-zag focus grid; glassmorphism project cards with hover lift; visible-by-default content with optional `IntersectionObserver` motion respecting `prefers-reduced-motion`; `:active` scale feedback; visible focus rings; `100dvh` viewport units; ~1200px max-width shell.
- Content: Hand-authored homepage/About markup plus typed `projects` and `updates` collections. Project filenames must match their canonical GitHub repository names; published featured entries use validated `featured` and `featuredOrder` metadata as the source for homepage cards, categories, order, and WebMCP Project results. Update filenames provide independent publication slugs, and every Update contains a non-empty Markdown body plus one validated existing Project reference. Production excludes drafts, and a published Update must resolve to a published Project; local development can preview draft content and draft relationships.
- Site shell: `src/layouts/SiteLayout.astro` owns shared metadata, navigation, skip-link/main focus behavior, page structure, and the footer contact link. Navigation marks exact routes as the current page and highlights the parent section on detail routes.
- Updates: `/updates/`, slug-based detail routes, Project timelines, and `/updates/rss.xml` use the same chronological production-aware helper. Six entries cover the original two milestones plus GitHub-sourced September changes for ImageZoom, YouTube Watchlist Manager, and Verified Person Research, and an August EnjinMel SMTP compatibility check. Every new note links immutable source commits and separates recorded verification from publication status.
- SEO: The shared layout owns canonical and Open Graph/Twitter metadata; the homepage supplies its static `Person`/`WebSite` JSON-LD. `src/pages/sitemap.xml.ts` includes live fixed routes plus published Project and Update details, and `public/robots.txt` references the generated sitemap.
- UI behavior: homepage and catalog Project cards share a small client-side category filter. Homepage filter options and result counts derive from published featured Project categories; filtering must not introduce API calls, routing, or hidden build/runtime dependencies.
- Redirects: `public/_redirects` preserves the API catalog alias. The static contact page is served at `/contact/`. Former Blog URLs intentionally return the branded 404.
- Error handling: `src/pages/404.astro` generates `dist/404.html` so unknown routes receive a real branded 404 response instead of an SPA fallback.
- Security headers: `public/_headers` applies HSTS, CSP with `frame-ancestors 'none'`, `X-Frame-Options: DENY`, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy` to static responses.
- Agent discovery: `public/_headers` advertises `/.well-known/api-catalog` and `/.well-known/agent-skills/index.json`; `public/robots.txt` declares `Content-Signal: ai-train=yes, search=yes, ai-input=yes`; `public/llms.txt` links the human and machine entry points; `src/pages/index.md.ts` generates `/index.md` from published Projects and Updates. The homepage registers three read-only tools when `document.modelContext.registerTool()` is available.
- Security contact: `/.well-known/security.txt` publishes the public email contact for security reports.
- Assets: `public/assets/` contains the unchanged portrait, AVIF/WebP/JPG hero image fallback, Open Graph image, SVG favicon, touch icon, self-hosted Outfit variable woff2, and grain overlay; `public/favicon.ico` preserves conventional browser and bot compatibility. Project media may use stable files placed under `public/uploads/` and referenced as `/uploads/…`.
- Contact: The static form uses a same-origin Cloudflare Worker with Turnstile and a single verified Gmail recipient. Direct email remains public.
- API: None; `/.well-known/api-catalog` intentionally returns an empty Linkset instead of inventing a public API.
- Auth discovery: None; do not add OAuth/OIDC or OAuth protected-resource metadata unless the site gains protected APIs.
- MCP: Browser-only WebMCP tools are exposed on the homepage. Its featured-Project result is serialized from the same published featured entries as the visible cards, including synchronized names, summaries, categories, repository URLs, and canonical detail URLs; there is no remote MCP server card unless an actual MCP server is introduced.
- Runtime environment variables: None.

## Development Workflow

- Node: `>=22.13.0 <23`.
- Package manager: npm with `package-lock.json`.
- Draft-aware development server: `npm run dev`.
- Deployment-equivalent local preview: run `npm run build`, then `npm run preview`. This serves `dist/` and excludes drafts, but does not emulate Cloudflare Pages `_headers` or `_redirects`.
- Smoke checks: `npm run check` is the single release gate. It validates Astro diagnostics, Update fixtures, a clean production build, homepage/About/Projects/Updates/RSS contracts, routing and 404 behavior, Cloudflare redirects/headers, stable assets and discovery URLs, generated Markdown synchronization, Agent Skill digest integrity, draft exclusion, responsive keyboard/focus behavior, and human/WebMCP Project consistency through 42 Playwright checks. Five offline Worker tests cover submission validation, spam checks, and email acceptance.
- Update acceptance fixtures: `npm run check` temporarily builds one valid published fixture and confirms missing, multiple, nonexistent, and draft-Project relationships plus an empty draft body fail before regenerating the actual six-Update production output.
- E2E tests: `npm run test:e2e`.
- Cloudflare Pages: the `liewcf-org` Git integration runs `npm ci && npm run build` from the repository root and publishes `dist/` from production branch `main`. Custom domain `liewcf.org` with fallback `liewcf-org.pages.dev`; `www.liewcf.org` redirects to `https://liewcf.org/`. Run `npm run check` locally or in CI before deployment.
- Cloudflare zone settings verified on 2026-11-19: Web Analytics auto-injection is disabled. The WebMCP bridge is enabled by a separate zone setting and runs with no tool packs selected. The Pages project has no analytics beacon configured.
- Release status: commit `2353fbd` was initially deployed on 2026-07-26 by direct upload after the Git integration built successfully but published an empty output directory. The Pages project output directory was corrected from blank to `dist`; both a retry and a subsequent normal `main` push completed every Git-triggered build/deploy stage successfully, and their unique deployment URLs plus `liewcf.org` were live-verified.
- Cloudflare Markdown for Agents product feature: not enabled while the site is on the current Cloudflare Free account because the feature is not available there. The repo still provides static `llms.txt` and `index.md`.
- Matt engineering skills use private local Markdown under gitignored `.scratch/` for specs and issues, the default triage status vocabulary, and a single-context domain-doc layout described in `docs/agents/`. Root `CONTEXT.md` and `docs/adr/` are created lazily when domain terms or decisions are resolved.

## Constraints

- Keep Astro fully static without an adapter, server rendering, a database, runtime API, runtime environment variables, Tailwind, or a client-side UI framework.
- Do not add blog, CMS, additional forms, email providers, or endpoints without an accepted ticket or decision.
- Keep secrets out of project memory and source files.
- Keep `.scratch/` private and never force-add or commit its issue and spec contents to this public repository.
- Preview visual changes on desktop and mobile widths before claiming completion when feasible.

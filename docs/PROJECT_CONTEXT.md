---
title: Project Context
description: Stable project facts, structure, workflows, resources, and constraints.
doc_type: context
status: stable
created: 2026-07-19
updated: 2026-07-31
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
- Current repository status: The working tree generates a homepage, About page, five-Project catalog/detail surface, and two published Project-linked Updates in the index, detail routes, RSS, sitemap, and generated Markdown profile. Typed draft-aware content, the shared Home/About/Projects/Updates shell, plain semantic HTML, CSS, vanilla browser behavior, unique canonical/social metadata, a real 404 page, static security and agent discovery files, and 38 Playwright public-contract checks remain intact. The 2026-07-31 content changes are uncommitted and have not been deployed; the last live-verified Cloudflare Pages state predates them.

## Approved Direction

- Replace the current implementation with an Astro-generated static multi-page site while preserving the current design and public contracts.
- Add About, Projects, Project details, Updates, and Update details. Updates replaces Blog; old Blog URLs return 404, and contact remains outbound-only.
- Store Projects and Updates as local Markdown content collections with typed frontmatter and draft support. The initial launch used four Projects and no Updates; the current working tree contains five Projects and two published Updates.
- Keep production fully static on Cloudflare Pages. Decap CMS compatibility is planned, but CMS administration, authentication, SSR, databases, runtime APIs, Tailwind, and client-side UI frameworks are outside the initial migration.
- The accepted rationale and consequences are recorded in `docs/adr/0001-reintroduce-astro-as-static-multipage-site.md`.

## Architecture

- Framework: Astro in fully static output mode; no adapter or browser framework runtime.
- Styling: Plain CSS in `public/styles.css`. Neutral-premium palette (zinc off-white/near-black base with a single terracotta accent); self-hosted Outfit variable sans (latin woff2 in `public/assets/fonts/`) for all text with hierarchy via size/weight/tracking; dot-grid background with a fixed grain overlay (`public/assets/grain.svg`); asymmetric zig-zag focus grid; glassmorphism project cards with hover lift; staggered `IntersectionObserver` scroll reveals respecting `prefers-reduced-motion`; `:active` scale feedback; visible focus rings; `100dvh` viewport units; ~1200px max-width shell.
- Content: Hand-authored homepage/About markup plus typed `projects` and `updates` collections. Project filenames must match their canonical GitHub repository names; published featured entries use validated `featured` and `featuredOrder` metadata as the source for homepage cards, categories, order, and WebMCP Project results. Update filenames provide independent publication slugs, and every Update contains a non-empty Markdown body plus one validated existing Project reference. Production excludes drafts, and a published Update must resolve to a published Project; local development can preview draft content and draft relationships.
- Site shell: `src/layouts/SiteLayout.astro` owns shared metadata defaults, Home/About/Projects/Updates navigation and accessible current-page state, skip-link/main focus behavior, page structure, and outbound-only footer contact.
- Updates: `/updates/`, slug-based detail routes, Project timelines, and `/updates/rss.xml` use the same chronological production-aware helper. The current two entries document Auto-Tomato and Verified Person Research verification milestones and belong to exactly those Projects.
- SEO: The shared layout owns canonical and Open Graph/Twitter metadata; the homepage supplies its static `Person`/`WebSite` JSON-LD. `src/pages/sitemap.xml.ts` includes live fixed routes plus published Project and Update details, and `public/robots.txt` references the generated sitemap.
- UI behavior: homepage and catalog Project cards share a small client-side category filter. Homepage filter options and result counts derive from published featured Project categories; filtering must not introduce API calls, routing, or hidden build/runtime dependencies.
- Redirects: `public/_redirects` sends only `/contact/` to `/` with 301 status. `/about/`, `/projects/`, and `/updates/` are live static pages; `/blog/` and former Blog-entry URLs intentionally receive the branded real 404 with no redirect.
- Error handling: `src/pages/404.astro` generates `dist/404.html` so unknown routes receive a real branded 404 response instead of an SPA fallback.
- Security headers: `public/_headers` applies HSTS, CSP with `frame-ancestors 'none'`, `X-Frame-Options: DENY`, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy` to static responses.
- Agent discovery: `public/_headers` advertises `/.well-known/api-catalog` and `/.well-known/agent-skills/index.json`; `public/robots.txt` declares `Content-Signal: ai-train=yes, search=yes, ai-input=yes`; `public/llms.txt` links the human and machine entry points; `src/pages/index.md.ts` generates `/index.md` from published Projects and Updates; the homepage registers read-only WebMCP tools when `navigator.modelContext` is available.
- Security contact: `/.well-known/security.txt` publishes the public email contact for security reports.
- Assets: `public/assets/` contains the unchanged portrait, AVIF/WebP/JPG hero image fallback, Open Graph image, SVG favicon, touch icon, self-hosted Outfit variable woff2, and grain overlay; `public/favicon.ico` preserves conventional browser and bot compatibility. Project media may use stable files placed under `public/uploads/` and referenced as `/uploads/…`.
- Contact: Outbound links only; email uses `mailto:`.
- API: None; `/.well-known/api-catalog` intentionally returns an empty Linkset instead of inventing a public API.
- Auth discovery: None; do not add OAuth/OIDC or OAuth protected-resource metadata unless the site gains protected APIs.
- MCP: Browser-only WebMCP tools are exposed on the homepage. Its featured-Project result is serialized from the same published featured entries as the visible cards, including synchronized names, summaries, categories, repository URLs, and canonical detail URLs; there is no remote MCP server card unless an actual MCP server is introduced.
- Runtime environment variables: None.

## Development Workflow

- Node: `>=22.13.0 <23`.
- Package manager: npm with `package-lock.json`.
- Draft-aware development server: `npm run dev`.
- Deployment-equivalent local preview: run `npm run build`, then `npm run preview`. This serves `dist/` and excludes drafts, but does not emulate Cloudflare Pages `_headers` or `_redirects`.
- Smoke checks: `npm run check` is the single release gate. It validates Astro diagnostics, Update fixtures, a clean production build, homepage/About/Projects/Updates/RSS contracts, routing and 404 behavior, Cloudflare redirects/headers, stable assets and discovery URLs, generated Markdown synchronization, Agent Skill digest integrity, draft exclusion, responsive keyboard/focus behavior, and human/WebMCP Project consistency through 38 Playwright checks.
- Update acceptance fixtures: `npm run check` temporarily builds one valid published fixture and confirms missing, multiple, nonexistent, and draft-Project relationships plus an empty draft body fail before regenerating the actual two-Update production output.
- E2E tests: `npm run test:e2e`.
- Cloudflare Pages: the `liewcf-org` Git integration runs `npm ci && npm run build` from the repository root and publishes `dist/` from production branch `main`. Custom domain `liewcf.org` with fallback `liewcf-org.pages.dev`; `www.liewcf.org` redirects to `https://liewcf.org/`. Run `npm run check` locally or in CI before deployment.
- Release status: commit `2353fbd` was initially deployed on 2026-07-26 by direct upload after the Git integration built successfully but published an empty output directory. The Pages project output directory was corrected from blank to `dist`; both a retry and a subsequent normal `main` push completed every Git-triggered build/deploy stage successfully, and their unique deployment URLs plus `liewcf.org` were live-verified.
- Cloudflare Markdown for Agents product feature: not enabled while the site is on the current Cloudflare Free account because the feature is not available there. The repo still provides static `llms.txt` and `index.md`.
- Matt engineering skills use private local Markdown under gitignored `.scratch/` for specs and issues, the default triage status vocabulary, and a single-context domain-doc layout described in `docs/agents/`. Root `CONTEXT.md` and `docs/adr/` are created lazily when domain terms or decisions are resolved.

## Constraints

- Keep Astro fully static without an adapter, server rendering, a database, runtime API, runtime environment variables, Tailwind, or a client-side UI framework.
- Do not add blog, CMS, contact form, Turnstile, Resend, or Cloudflare Function behavior without an accepted ticket or decision.
- Keep secrets out of project memory and source files.
- Keep `.scratch/` private and never force-add or commit its issue and spec contents to this public repository.
- Preview visual changes on desktop and mobile widths before claiming completion when feasible.

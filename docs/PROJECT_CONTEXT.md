---
title: Project Context
description: Stable project facts, structure, workflows, resources, and constraints.
doc_type: context
status: stable
created: 2026-07-19
updated: 2026-07-26
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
- Current status: Astro-generated static site with a homepage, About page, four-Project catalog/detail surface, and live zero-entry Updates index/RSS; typed draft-aware Project and Update Markdown, a shared Home/About/Projects/Updates shell, plain semantic HTML, CSS, vanilla browser behavior, unique canonical/social metadata, a published-content sitemap and generated Markdown profile, a real 404 page, static security and agent discovery files, and 38 Playwright public-contract checks against production output. All seven migration tickets and the verified post-integration fixes for visible 404 content and published Update relationships to draft Projects are integrated. The Astro migration has not been deployed or live-verified.

## Approved Direction

- Replace the current implementation with an Astro-generated static multi-page site while preserving the current design and public contracts.
- Add About, Projects, Project details, Updates, and Update details. Updates replaces Blog; old Blog URLs return 404, and contact remains outbound-only.
- Store Projects and Updates as local Markdown content collections with typed frontmatter and draft support. Launch with the current four Projects and no Updates.
- Keep production fully static on Cloudflare Pages. Decap CMS compatibility is planned, but CMS administration, authentication, SSR, databases, runtime APIs, Tailwind, and client-side UI frameworks are outside the initial migration.
- The accepted rationale and consequences are recorded in `docs/adr/0001-reintroduce-astro-as-static-multipage-site.md`.

## Architecture

- Framework: Astro in fully static output mode; no adapter or browser framework runtime.
- Styling: Plain CSS in `public/styles.css`. Neutral-premium palette (zinc off-white/near-black base with a single terracotta accent); self-hosted Outfit variable sans (latin woff2 in `public/assets/fonts/`) for all text with hierarchy via size/weight/tracking; dot-grid background with a fixed grain overlay (`public/assets/grain.svg`); asymmetric zig-zag focus grid; glassmorphism project cards with hover lift; staggered `IntersectionObserver` scroll reveals respecting `prefers-reduced-motion`; `:active` scale feedback; visible focus rings; `100dvh` viewport units; ~1200px max-width shell.
- Content: Hand-authored homepage/About markup plus typed `projects` and `updates` collections. Project filenames must match their canonical GitHub repository names; published featured entries use validated `featured` and `featuredOrder` metadata as the source for homepage cards, categories, order, and WebMCP Project results. Update filenames provide independent publication slugs, and every Update contains a non-empty Markdown body plus one validated existing Project reference. Production excludes drafts, and a published Update must resolve to a published Project; local development can preview draft content and draft relationships.
- Site shell: `src/layouts/SiteLayout.astro` owns shared metadata defaults, Home/About/Projects/Updates navigation and accessible current-page state, skip-link/main focus behavior, page structure, and outbound-only footer contact.
- Updates: `/updates/` launches with a deliberate no-publications state; slug-based detail routes and Project timelines use the same chronological production-aware helper. `/updates/rss.xml` emits production URLs, zero items at launch, and Project-linked items when published content exists.
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
- Update acceptance fixtures: `npm run check` temporarily builds one valid published fixture and confirms missing, multiple, nonexistent, and draft-Project relationships plus an empty draft body fail before generating the final zero-Update production output.
- E2E tests: `npm run test:e2e`.
- Cloudflare Pages: build with `npm run build` and publish `dist/`. Custom domain `liewcf.org` with fallback `liewcf-org.pages.dev`; `www.liewcf.org` redirects to `https://liewcf.org/`. Run `npm run check` locally or in CI before deployment.
- Release handoff: the production preview was locally smoke-tested on 2026-07-26 with live pages and RSS returning 200 and draft/unknown routes returning 404. Publishing `dist/`, changing Cloudflare Pages settings or DNS, and validating the migrated live site require separate authorization and remain unperformed.
- Cloudflare Markdown for Agents product feature: not enabled while the site is on the current Cloudflare Free account because the feature is not available there. The repo still provides static `llms.txt` and `index.md`.
- Matt engineering skills use private local Markdown under gitignored `.scratch/` for specs and issues, the default triage status vocabulary, and a single-context domain-doc layout described in `docs/agents/`. Root `CONTEXT.md` and `docs/adr/` are created lazily when domain terms or decisions are resolved.

## Constraints

- Keep Astro fully static without an adapter, server rendering, a database, runtime API, runtime environment variables, Tailwind, or a client-side UI framework.
- Do not add blog, CMS, contact form, Turnstile, Resend, or Cloudflare Function behavior without an accepted ticket or decision.
- Keep secrets out of project memory and source files.
- Keep `.scratch/` private and never force-add or commit its issue and spec contents to this public repository.
- Preview visual changes on desktop and mobile widths before claiming completion when feasible.

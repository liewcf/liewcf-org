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
- Current status: Astro-generated static site with a homepage and expanded About page, a shared Home/About shell, plain semantic HTML, CSS, vanilla browser behavior, static SEO metadata/sitemap/redirects, a real 404 page, static security and agent discovery files, static featured-project filtering, completed `www` redirect/Search Console validation, only live referenced image/icon assets, and Playwright public-contract checks against production output.

## Approved Direction

- Replace the current implementation with an Astro-generated static multi-page site while preserving the current design and public contracts.
- Add About, Projects, Project details, Updates, and Update details. Updates replaces Blog; old Blog URLs return 404, and contact remains outbound-only.
- Store Projects and Updates as local Markdown content collections with typed frontmatter and draft support. Launch with the current four Projects and no Updates.
- Keep production fully static on Cloudflare Pages. Decap CMS compatibility is planned, but CMS administration, authentication, SSR, databases, runtime APIs, Tailwind, and client-side UI frameworks are outside the initial migration.
- The accepted rationale and consequences are recorded in `docs/adr/0001-reintroduce-astro-as-static-multipage-site.md`.

## Architecture

- Framework: Astro in fully static output mode; no adapter or browser framework runtime.
- Styling: Plain CSS in `public/styles.css`. Neutral-premium palette (zinc off-white/near-black base with a single terracotta accent); self-hosted Outfit variable sans (latin woff2 in `public/assets/fonts/`) for all text with hierarchy via size/weight/tracking; dot-grid background with a fixed grain overlay (`public/assets/grain.svg`); asymmetric zig-zag focus grid; glassmorphism project cards with hover lift; staggered `IntersectionObserver` scroll reveals respecting `prefers-reduced-motion`; `:active` scale feedback; visible focus rings; `100dvh` viewport units; ~1200px max-width shell.
- Content: Hand-authored homepage markup in `src/pages/index.astro` and factual About copy in `src/pages/about.astro`, both rendered through `src/layouts/SiteLayout.astro`.
- Site shell: `src/layouts/SiteLayout.astro` owns shared metadata defaults, Home/About navigation and accessible current-page state, skip-link/main focus behavior, page structure, and outbound-only footer contact. Projects and Updates remain absent from navigation until those routes are live.
- SEO: The shared layout owns canonical and Open Graph/Twitter metadata; the homepage supplies its static `Person`/`WebSite` JSON-LD. `public/sitemap.xml` contains `https://liewcf.org/` and `https://liewcf.org/about/`, and `public/robots.txt` references it.
- UI behavior: featured projects are static cards with a small client-side category filter; filtering must not introduce API calls, routing, or hidden build/runtime dependencies.
- Redirects: `public/_redirects` sends unavailable legacy routes (`/blog/`, `/projects/`, `/contact/`) to `/` with 301 status for Cloudflare Pages. `/about/` is a live static page.
- Error handling: `src/pages/404.astro` generates `dist/404.html` so unknown routes receive a real branded 404 response instead of an SPA fallback.
- Security headers: `public/_headers` applies HSTS, CSP with `frame-ancestors 'none'`, `X-Frame-Options: DENY`, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy` to static responses.
- Agent discovery: `public/_headers` advertises `/.well-known/api-catalog` and `/.well-known/agent-skills/index.json`; `public/robots.txt` declares `Content-Signal: ai-train=yes, search=yes, ai-input=yes`; `public/llms.txt` and `public/index.md` provide simple agent-facing text; the homepage registers read-only WebMCP tools when `navigator.modelContext` is available.
- Security contact: `/.well-known/security.txt` publishes the public email contact for security reports.
- Assets: `public/assets/` contains the portrait, AVIF/WebP/JPG hero image fallback, Open Graph image, SVG favicon, touch icon, self-hosted Outfit variable woff2, and grain overlay; `public/favicon.ico` preserves conventional browser and bot compatibility.
- Contact: Outbound links only; email uses `mailto:`.
- API: None; `/.well-known/api-catalog` intentionally returns an empty Linkset instead of inventing a public API.
- Auth discovery: None; do not add OAuth/OIDC or OAuth protected-resource metadata unless the site gains protected APIs.
- MCP: Browser-only WebMCP tools are exposed on the homepage; there is no remote MCP server card unless an actual MCP server is introduced.
- Runtime environment variables: None.

## Development Workflow

- Node: `>=22.13.0 <23`.
- Package manager: npm with `package-lock.json`.
- Dev server: `npm run dev`.
- Smoke checks: `npm run check`.
- E2E tests: `npm run test:e2e`.
- Cloudflare Pages: build with `npm run build` and publish `dist/`. Custom domain `liewcf.org` with fallback `liewcf-org.pages.dev`; `www.liewcf.org` redirects to `https://liewcf.org/`. Run `npm run check` locally or in CI before deployment.
- Cloudflare Markdown for Agents product feature: not enabled while the site is on the current Cloudflare Free account because the feature is not available there. The repo still provides static `llms.txt` and `index.md`.
- Matt engineering skills use private local Markdown under gitignored `.scratch/` for specs and issues, the default triage status vocabulary, and a single-context domain-doc layout described in `docs/agents/`. Root `CONTEXT.md` and `docs/adr/` are created lazily when domain terms or decisions are resolved.

## Constraints

- Keep Astro fully static without an adapter, server rendering, a database, runtime API, runtime environment variables, Tailwind, or a client-side UI framework.
- Do not add blog, CMS, contact form, Turnstile, Resend, or Cloudflare Function behavior without an accepted ticket or decision.
- Keep secrets out of project memory and source files.
- Keep `.scratch/` private and never force-add or commit its issue and spec contents to this public repository.
- Preview visual changes on desktop and mobile widths before claiming completion when feasible.

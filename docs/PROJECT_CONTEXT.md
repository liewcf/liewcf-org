# Project Context

## Overview

- Project purpose: Personal profile and credibility page for `liewcf.org`.
- Primary users: Visitors who want to understand who Liew CheonFong is, what he builds, and how to contact or follow him.
- Current status: Static one-page site with plain HTML, CSS, static SEO metadata/sitemap/redirects, a real Cloudflare Pages 404 page, static security and agent discovery files, static featured-project filtering, completed `www` redirect/Search Console validation, only live referenced image/icon assets, and Playwright smoke checks.

## Architecture

- Framework: None.
- Styling: Plain CSS in `styles.css`. Neutral-premium palette (zinc off-white/near-black base with a single terracotta accent); self-hosted Outfit variable sans (latin woff2 in `assets/fonts/`) for all text with hierarchy via size/weight/tracking; dot-grid background with a fixed grain overlay (`assets/grain.svg`); asymmetric zig-zag focus grid; glassmorphism project cards with hover lift; staggered `IntersectionObserver` scroll reveals respecting `prefers-reduced-motion`; `:active` scale feedback; visible focus rings; `100dvh` viewport units; ~1200px max-width shell.
- Content: Hand-authored HTML in `index.html`.
- SEO: `index.html` owns canonical, Open Graph/Twitter metadata, and static `Person`/`WebSite` JSON-LD; root `sitemap.xml` contains only `https://liewcf.org/`, and `robots.txt` references it.
- UI behavior: featured projects are static cards with a small client-side category filter; filtering must not introduce API calls, routing, or hidden build/runtime dependencies.
- Redirects: root `_redirects` sends removed legacy routes (`/about/`, `/blog/`, `/projects/`, `/contact/`) to `/` with 301 status for Cloudflare Pages.
- Error handling: root `404.html` exists so Cloudflare Pages serves unknown routes as real 404 responses instead of treating the site as an SPA fallback.
- Security headers: root `_headers` applies HSTS, CSP with `frame-ancestors 'none'`, `X-Frame-Options: DENY`, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy` to static responses.
- Agent discovery: root `_headers` advertises `/.well-known/api-catalog` and `/.well-known/agent-skills/index.json`; `robots.txt` declares `Content-Signal: ai-train=yes, search=yes, ai-input=yes`; `llms.txt` and `index.md` provide simple agent-facing text; `index.html` registers read-only WebMCP tools when `navigator.modelContext` is available.
- Security contact: `/.well-known/security.txt` publishes the public email contact for security reports.
- Assets: Root-level `assets/` directory for the portrait, AVIF/WebP/JPG hero image fallback, Open Graph image, SVG favicon, touch icon, self-hosted Outfit variable woff2 (`assets/fonts/outfit-latin.woff2`), and grain overlay (`assets/grain.svg`) used by `index.html`; root `favicon.ico` exists for browser and bot compatibility with the conventional favicon path.
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
- Cloudflare Pages: publish static files from the repository root; build command `exit 0`, output directory `/`. Custom domain `liewcf.org` with fallback `liewcf-org.pages.dev`; `www.liewcf.org` redirects to `https://liewcf.org/`. Run `npm run check` locally or in CI before deployment.
- Cloudflare Markdown for Agents product feature: not enabled while the site is on the current Cloudflare Free account because the feature is not available there. The repo still provides static `llms.txt` and `index.md`.

## Constraints

- Keep the site framework-free unless the user explicitly asks to reintroduce a framework.
- Do not add blog, CMS, route, contact form, Turnstile, Resend, or Cloudflare Function behavior without a new decision.
- Keep secrets out of project memory and source files.
- Preview visual changes on desktop and mobile widths before claiming completion when feasible.

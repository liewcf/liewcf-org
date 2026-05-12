# Project Context

## Overview

- Project purpose: Personal profile and credibility page for `liewcf.org`.
- Primary users: Visitors who want to understand who Liew CheonFong is, what he builds, and how to contact or follow him.
- Current status: Static one-page site with plain HTML, CSS, static SEO metadata/sitemap/redirects, static agent discovery files, only live referenced image/icon assets, and Playwright smoke checks.

## Architecture

- Framework: None.
- Styling: Plain CSS in `styles.css`.
- Content: Hand-authored HTML in `index.html`.
- SEO: `index.html` owns canonical, Open Graph/Twitter metadata, and static `Person`/`WebSite` JSON-LD; root `sitemap.xml` contains only `https://liewcf.org/`, and `robots.txt` references it.
- Redirects: root `_redirects` sends removed legacy routes (`/about/`, `/blog/`, `/projects/`, `/contact/`) to `/` with 301 status for Cloudflare Pages.
- Agent discovery: root `_headers` advertises `/.well-known/api-catalog` and `/.well-known/agent-skills/index.json`; `robots.txt` declares `Content-Signal: ai-train=yes, search=yes, ai-input=yes`; `index.html` registers read-only WebMCP tools when `navigator.modelContext` is available.
- Assets: Root-level `assets/` directory for the portrait, AVIF/WebP/JPG hero image fallback, Open Graph image, favicon, and touch icon used by `index.html`.
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
- Cloudflare Pages: publish static files from the repository root; build command set to `npm ci && npm run build` (with `"build": "exit 0"` in package.json), output directory `/`. Custom domain `liewcf.org` with fallback `liewcf-org.pages.dev`. Run `npm run check` locally or in CI before deployment.
- Markdown for Agents: enable Cloudflare's Markdown for Agents/content converter in the Cloudflare zone; this is an edge setting, not a repo runtime.

## Constraints

- Keep the site framework-free unless the user explicitly asks to reintroduce a framework.
- Do not add blog, CMS, route, contact form, Turnstile, Resend, or Cloudflare Function behavior without a new decision.
- Keep secrets out of project memory and source files.
- Preview visual changes on desktop and mobile widths before claiming completion when feasible.

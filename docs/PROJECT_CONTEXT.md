# Project Context

## Overview

- Project purpose: Personal profile and credibility page for `liewcf.org`.
- Primary users: Visitors who want to understand who Liew CheonFong is, what he builds, and how to contact or follow him.
- Current status: Static one-page site with plain HTML, CSS, image assets, and Playwright smoke checks.

## Architecture

- Framework: None.
- Styling: Plain CSS in `styles.css`.
- Content: Hand-authored HTML in `index.html`.
- Assets: Root-level `assets/` directory.
- Contact: Outbound links only; email uses `mailto:`.
- API: None.
- Runtime environment variables: None.

## Development Workflow

- Node: `>=22.13.0 <23`.
- Package manager: npm with `package-lock.json`.
- Dev server: `npm run dev`.
- Smoke checks: `npm run check`.
- E2E tests: `npm run test:e2e`.
- Cloudflare Pages: publish static files from the repository root. A build step is optional and should stay limited to install plus checks.

## Constraints

- Keep the site framework-free unless the user explicitly asks to reintroduce a framework.
- Do not add blog, CMS, route, contact form, Turnstile, Resend, or Cloudflare Function behavior without a new decision.
- Keep secrets out of project memory and source files.
- Preview visual changes on desktop and mobile widths before claiming completion when feasible.

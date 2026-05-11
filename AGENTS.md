# AGENTS.md

This repo powers `liewcf.org`, a static one-page profile site built with plain HTML and CSS. Vite is used only as a local preview server; this is not an Astro, Tailwind, CMS, blog, or multi-page portfolio app.

No Cursor rules found:

- `.cursor/rules/` not present
- `.cursorrules` not present

No Copilot instructions found:

- `.github/copilot-instructions.md` not present

If any of the above files are added later, treat them as higher-priority and update this doc.

## Quick commands

- Install: `npm install`
- Dev server: `npm run dev`
- Smoke checks: `npm run check`
- E2E tests: `npm run test:e2e`
- Node: `>=22.13.0 <23`

## Project structure

- `index.html` — the full one-page profile, metadata, and outbound links.
- `styles.css` — all styling and responsive behavior.
- `assets/` — profile image, Open Graph image, favicons, and touch icons.
- `robots.txt` — crawler access rules.
- `tests/e2e/` — Playwright smoke tests.
- `docs/` — repo-level memory, decisions, tasks, changelog, and any superpowers specs/plans.

## Code style

- Keep the site framework-free unless the user explicitly asks otherwise.
- Prefer plain semantic HTML and CSS.
- Keep page copy concise and profile-focused.
- Avoid adding blogs, CMS behavior, routing, contact forms, API functions, environment-variable requirements, or build pipelines.
- Do not restore the removed Astro/Tailwind/content-collection stack or `functions/api/contact.ts` without a new explicit decision.
- Keep the featured GitHub projects section static and curated; current project cards are placeholders until exact repository URLs and copy are chosen.
- Keep changes small and focused.

## Contact and links

- Contact is outbound-link only.
- Email uses `mailto:`.
- Social/profile links should have clear accessible names.
- Do not add secrets, forms, Turnstile, Resend, or runtime environment variables.

## Validation

- Run `npm run check` when feasible after page, link, or asset changes.
- Keep Playwright coverage aligned with the static page, including outbound profile links, featured projects, and removed routes not returning successful pages.
- For visual changes, preview with `npm run dev` and inspect desktop and mobile widths.

## Deployment

Cloudflare Pages should publish the static site directly from the repository root.

- Build command: `exit 0`
- Output directory: `/`
- Runtime environment variables: none
- Run `npm run check` locally or in CI before deployment; do not make Cloudflare Pages depend on a framework build.

## Project Memory Requirement

Keep these repo-level memory files accurate and concise when work changes project context:

- `docs/PROJECT_CONTEXT.md` for stable project facts, architecture, workflows, and constraints.
- `docs/DECISIONS.md` for dated technical or product decisions and rationale.
- `docs/TASKS.md` for current tasks, blockers, and next actions.
- `docs/CHANGELOG_WORK.md` for dated notes on changed files, behavior, docs, config, dependencies, tooling, tests, and verification.

Do not store secrets, credentials, API keys, private tokens, database dumps, or sensitive personal data in project memory.

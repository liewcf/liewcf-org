# AGENTS.md

This repo powers `liewcf.org`, a simple static one-page profile site built with plain HTML and CSS.

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

## Project structure

- `index.html` — the full one-page profile, metadata, and outbound links.
- `styles.css` — all styling and responsive behavior.
- `assets/` — profile image, Open Graph image, favicons, and touch icons.
- `robots.txt` — crawler access rules.
- `tests/e2e/` — Playwright smoke tests.
- `docs/` — repo-level memory, decisions, tasks, changelog, and superpowers specs/plans.

## Code style

- Keep the site framework-free unless the user explicitly asks otherwise.
- Prefer plain semantic HTML and CSS.
- Keep page copy concise and profile-focused.
- Avoid adding blogs, CMS behavior, routing, contact forms, API functions, or build pipelines.
- Keep changes small and focused.

## Contact and links

- Contact is outbound-link only.
- Email uses `mailto:`.
- Social/profile links should have clear accessible names.
- Do not add secrets, forms, Turnstile, Resend, or runtime environment variables.

## Validation

- Run `npm run check` when feasible after page, link, or asset changes.
- For visual changes, preview with `npm run dev` and inspect desktop and mobile widths.

## Deployment

Cloudflare Pages should publish the static site directly from the repository root. No runtime environment variables are required.

## Project Memory Requirement

Keep these repo-level memory files accurate and concise when work changes project context:

- `docs/PROJECT_CONTEXT.md` for stable project facts, architecture, workflows, and constraints.
- `docs/DECISIONS.md` for dated technical or product decisions and rationale.
- `docs/TASKS.md` for current tasks, blockers, and next actions.
- `docs/CHANGELOG_WORK.md` for dated notes on changed files, behavior, docs, config, dependencies, tooling, tests, and verification.

Do not store secrets, credentials, API keys, private tokens, database dumps, or sensitive personal data in project memory.

# AGENTS.md

This repo powers `liewcf.org`, a personal site built with Astro + TypeScript (ESM).

No Cursor rules found:

- `.cursor/rules/` not present
- `.cursorrules` not present

No Copilot instructions found:

- `.github/copilot-instructions.md` not present

If any of the above files are added later, treat them as higher-priority and update this doc.

---

## Quick commands

### Install

- Preferred: `npm ci` (uses `package-lock.json`)
- Local: `npm install`

### Dev / build

- Dev server: `npm run dev`
- Production build: `npm run build`
- Preview build: `npm run preview`
- Astro CLI passthrough: `npm run astro`
- Cloudflare Pages build: `npm ci && npm run build`

### Lint / format / typecheck

- Lint: `npm run lint`
- Fix lint: `npm run lint:fix`
- Format: `npm run format`
- Check formatting: `npm run format:check`
- Typecheck: `npm run typecheck`

### E2E tests (Playwright, Chromium only)

- Run all: `npm run test:e2e`
- UI mode: `npm run test:e2e:ui`
- Debug: `npm run test:e2e:debug`
- Single file: `npx playwright test tests/e2e/navigation.spec.ts`
- Single test by name: `npx playwright test -g "navigate to about page"`

One-time setup if browsers are missing:

- `npx playwright install chromium`

---

## Tests policy

- Only E2E tests are configured right now.
- Unit tests are intentionally not set up (avoid refactors purely for tests).
- API endpoint tests are intentionally not configured.
- Contact form submission tests are excluded (requires Turnstile/Resend secrets).

---

## Project structure

- `src/pages/` — Astro pages and routes
- `src/components/` — Astro/TS components
- `src/layouts/` — shared layouts
- `src/styles/` — global CSS
- `src/content/` — Markdown content
  - `src/content/projects/` — project entries
  - `src/content/blog/` — blog posts
- `src/content.config.ts` — content collection schema
- `functions/api/` — Cloudflare Pages Functions
- `public/` — static assets
- `dist/` — build output (generated; do not edit)

---

## Code style (match existing)

### Indentation / whitespace

- Use tabs where existing TS files do.
- Avoid reformatting unrelated files.

### Quotes / ESM

- Prefer single quotes in TS/JS.
- Repo uses ESM (`"type": "module"`), keep `import`/`export` syntax.

### Semicolons and commas

- Semicolons enabled (`semi: true`).
- Trailing commas: `es5` style.

### Imports

- Imports go at top of file.
- Avoid unused imports.
- Prefer named imports where available.

### Naming

- `camelCase` for variables/functions.
- `PascalCase` for components/types.
- `SCREAMING_SNAKE_CASE` for true constants (example: `EMAIL_SUBJECT_PREFIX`).

### TypeScript

- Avoid `any`.
- Add explicit types to exported functions and public shapes.
- Use `as` assertions sparingly.

### Error handling (API endpoints)

- Prefer early returns for validation failures.
- Return consistent JSON:
  - success: `{ ok: true }`
  - error: `{ ok: false, error: string }`
- Use `4xx` for user errors, `5xx` for server errors.

---

## Content conventions

- Projects: Markdown files in `src/content/projects/`.
- Blog posts: Markdown files in `src/content/blog/`.
- Static pages: Markdown files in `src/content/pages/`.
- Keep frontmatter in sync with `src/content.config.ts` schemas.
- Site configuration: update `src/data/site-config.ts` for nav/social/hero changes.

---

## Environment variables

From README:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL` (default `hello@liewcf.org`)
- `CONTACT_TO_EMAIL` (default `liewcf@gmail.com`)
- `TURNSTILE_SECRET_KEY`
- `PUBLIC_TURNSTILE_SITE_KEY`

---

## Agent workflow expectations

- Keep changes small and focused.
- Do not add new tooling unless asked.
- Validate with `npm run build` when feasible.

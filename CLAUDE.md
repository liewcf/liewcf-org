# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run preview` - Preview production build

### Quality Checks
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format with Prettier
- `npm run typecheck` - Run Astro type check

### Testing
- `npm run test:e2e` - Run all Playwright E2E tests
- `npx playwright test tests/e2e/navigation.spec.ts` - Run single test file
- `npx playwright test -g "navigate to about page"` - Run single test by name
- `npm run test:e2e:ui` - Open Playwright UI mode

## Architecture

### Framework & Stack
- **Astro 5** with TypeScript (ESM, strict mode)
- **Tailwind CSS 4** with Vite plugin
- **Content collections** for Markdown/MDX content with Zod schemas
- Deployed to **Cloudflare Pages** with edge functions in `functions/api/`

### Content System
Content is managed through Astro's content collections defined in `src/content.config.ts`:
- **Blog posts**: `src/content/blog/` - Uses `glob` loader for Markdown/MDX files
- **Projects**: `src/content/projects/` - Portfolio entries
- **Pages**: `src/content/pages/` - Static pages (about, terms)

Each collection has a Zod schema. Frontmatter in content files must match these schemas.

### API Endpoints
Cloudflare Pages Functions in `functions/api/`:
- `contact.ts` - Contact form handler with Turnstile verification, input validation, and Resend email delivery

### Testing Policy
- Only E2E tests with Playwright (Chromium)
- Unit tests intentionally not configured
- Contact form tests excluded (requires Turnstile/Resend secrets)

## Code Style

- Tabs for indentation (match existing files)
- Single quotes in TS/JS
- Semicolons enabled
- `camelCase` for variables/functions, `PascalCase` for components/types, `SCREAMING_SNAKE_CASE` for constants
- ESM imports/exports only

## Environment Variables

Required for contact form:
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL` (default: `hello@liewcf.org`)
- `CONTACT_TO_EMAIL` (default: `liewcf@gmail.com`)
- `TURNSTILE_SECRET_KEY`
- `PUBLIC_TURNSTILE_SITE_KEY`

## Important Files

- `src/content.config.ts` - Content collection schemas
- `src/data/site-config.ts` - Site configuration (URL, metadata)
- `astro.config.mjs` - Astro configuration with MDX, sitemap, Tailwind
- `functions/api/contact.ts` - Contact form API endpoint

# Work Changelog

## 2026-05-10

- Added a committed design spec for replacing the Astro site with a static one-page profile.
- Migrated the live site surface to `index.html`, `styles.css`, root-level assets, and `robots.txt`.
- Replaced Astro/Tailwind tooling with a tiny Vite preview command and Playwright smoke checks.
- Removed Astro source, content collections, Cloudflare contact API, and old framework configuration.
- Updated README, AGENTS.md, and project memory for the static one-page architecture.

## 2026-05-11

- Updated README and CLAUDE.md so Cloudflare Pages deploys static root files with build command `exit 0`; `npm run check` remains local/CI verification.
- Refined `index.html` copy to simpler profile wording and changed the section label from "Proof points" to "Things I've Built".
- Switched the hero image from the landscape WordCamp photo to `assets/liewcf-profile.jpg` so mobile cropping shows the person clearly.
- Updated `tests/e2e/navigation.spec.ts` to expect the portrait hero image alt text.
- Verified the current static site with `npm run check`; Playwright reported 2 passing tests.
- Added a static featured GitHub projects section with three placeholder project cards, responsive styling, and Playwright coverage for the new section.
- Verified the featured projects update with `npm run check`; Playwright reported 2 passing tests. Previewed desktop and mobile widths with no horizontal overflow.
- Replaced the featured-project placeholders with `project-memory`, `QuickRes`, `enjinmel-smtp`, and `public-draft-share`, then adjusted the project grid to a two-column desktop layout.
- Updated Playwright coverage to assert the four featured project names and verified with `npm run check`; Playwright reported 2 passing tests.
- Removed ignored generated leftovers (`.astro/`, `dist/`, Playwright reports/results, local notes, `.DS_Store`) and unused tracked assets no longer referenced by `index.html`.
- Verified the cleanup with `npm run check`; Playwright reported 2 passing tests.
- Fixed Cloudflare Pages deployment: added `"build": "exit 0"` to package.json scripts (Pages runs `npm run build` by default) and changed the output directory from `dist` to `/` in Cloudflare Dashboard to match the static root structure.
- Confirmed live site at `https://liewcf.org` (custom domain, backed by Cloudflare Pages on `liewcf-org.pages.dev`) matches local `index.html` after redeploy.
- Added `sitemap.xml` with canonical `https://liewcf.org/` and referenced it from `robots.txt`.
- Added static `Person` and `WebSite` JSON-LD to `index.html` with absolute production URLs.
- Tightened page `<title>` and added `og:site_name` meta.
- Extended Playwright tests to assert sitemap, robots.txt sitemap line, and JSON-LD presence/parsing.
- Verified with `npm run check`; 4 Playwright tests passing.
- Committed and pushed the SEO/static cleanup work to `origin/main` as `02a7557` (`Improve static site SEO metadata and sitemap`).
- Updated project memory to record the static SEO architecture and remaining external validation follow-up.

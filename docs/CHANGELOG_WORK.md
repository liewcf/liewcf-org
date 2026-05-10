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

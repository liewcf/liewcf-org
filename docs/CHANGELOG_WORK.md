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

## 2026-05-12

- Added `assets/liewcf-profile.avif` and `assets/liewcf-profile.webp`, updated the hero image to use AVIF/WebP/JPG fallback, and added `fetchpriority="high"` plus `decoding="async"` for the LCP image.
- Extended Playwright coverage for the modern hero image sources and LCP attributes; verified with `npm run check` reporting 4 passing tests.
- Pushed `e57b5f9` (`Optimize hero image delivery`); PageSpeed API retest reported 100 scores for performance, accessibility, best practices, and SEO on both mobile and desktop.
- Added root `_redirects` rules so removed legacy routes redirect to `/` with 301 status on Cloudflare Pages.
- Extended Playwright coverage to assert `_redirects` contains `/about/`, `/blog/`, `/projects/`, and `/contact/` rules; verified with `npm run check` reporting 5 passing tests.
- Pushed `c65c5b1` (`Redirect removed routes to homepage`).
- Added Cloudflare Pages `_headers` with homepage Link headers for `/.well-known/api-catalog` and the Agent Skills index, plus content-type overrides for the discovery files.
- Added `Content-Signal: ai-train=yes, search=yes, ai-input=yes` to `robots.txt`.
- Added `/.well-known/api-catalog` as an empty `application/linkset+json` Linkset because the site has no real API.
- Added `/.well-known/agent-skills/index.json` and `/.well-known/agent-skills/liewcf-profile/SKILL.md` with a verified SHA-256 digest.
- Added read-only WebMCP tools in `index.html` for profile summary, featured projects, and contact links when `navigator.modelContext` is available.
- Extended Playwright coverage for agent-readiness headers, Content Signals, discovery files, digest verification, and WebMCP registration; verified the focused spec with 9 passing tests.

## 2026-05-14

- Reduced referenced image/icon asset weight without changing dimensions: rebuilt the legacy ICO favicon and recompressed the profile JPG/WebP/AVIF fallbacks.

## 2026-05-20

- Applied small accessibility/UI polish in `styles.css`: darker muted text, smooth link/button color transitions, and 48px touch targets for profile, project, and footer links on coarse-pointer devices. Verified with `npm run check` reporting 9 passing Playwright tests, then pushed commit `d887244`.
- Completed post-deployment Search Console validation for homepage indexing and sitemap submission.
- Updated project memory to record the completed `www` redirect/Search Console validation and the Cloudflare Markdown for Agents limitation on the current Cloudflare Free account.

## 2026-05-22

- Referenced the scratch preview in `/Users/cheonfongliew/.gemini/antigravity/scratch/liewcf-preview/` and updated `index.html`/`styles.css` with tighter editorial copy, light/dark styling tokens, visible focus states, numbered focus tiles, project repo labels, and a static category filter for featured projects.
- Preserved the existing no-contact-form direction: kept contact as outbound `mailto:` links and did not copy the scratch preview's form section or external font links.
- Extended Playwright coverage for external link safety, static project filtering, and outbound-only contact.
- Added root `favicon.ico`, updated the homepage ICO link to `/favicon.ico`, and added Playwright coverage so browser chrome and tools that probe the conventional favicon path get a 200 response; regenerated both ICO files from `assets/apple-touch-icon.png` after the previous ICO rendered blank.

## 2026-05-23

- Removed cleanup candidates that no longer matched the static site: ignored `test-results/` and `.superpowers/` generated leftovers, duplicate `assets/favicon.ico`, and stale Prettier config files that referenced old Astro/Tailwind plugins without an active formatting script.
- Fixed the modern web audit findings by adding explicit list semantics to styled homepage lists, switching base font sizes from `px` to `rem`, and adding Playwright regression coverage.

## 2026-05-31

- Added a root `404.html` so Cloudflare Pages can serve unknown routes with a real 404 response instead of the homepage SPA fallback.
- Added site-wide Cloudflare Pages security headers in `_headers`: HSTS, CSP with `frame-ancestors 'none'`, `X-Frame-Options: DENY`, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy`.
- Added `/.well-known/security.txt`, `/llms.txt`, and `/index.md`, plus explicit content-type rules for those files.
- Extended Playwright smoke coverage for the audit fixes: 404 page source, security headers, security contact file, and agent-facing text files.

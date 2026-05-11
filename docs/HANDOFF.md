# SEO Implementation Handoff

## 1. Task Summary

Implement the first SEO fixes from `docs/SEO_AUDIT_FIX_PLAN.md` for the static one-page `liewcf.org` site.

Primary goal:

- Add a minimal sitemap.
- Reference the sitemap from `robots.txt`.
- Add static `Person` and `WebSite` JSON-LD to `index.html`.
- Add tests/checks so these SEO basics stay in place.

This repo is a plain HTML/CSS static site. Do not add a framework, build pipeline, CMS, route system, contact form, API function, or runtime JavaScript.

## 2. Files Likely to Edit

- `index.html`
  - Add static JSON-LD in the `<head>`.
  - Optionally tighten the `<title>`.
  - Optionally add `og:site_name`.
- `robots.txt`
  - Add `Sitemap: https://liewcf.org/sitemap.xml`.
- `sitemap.xml`
  - New file at repo root.
- `tests/e2e/navigation.spec.ts`
  - Add assertions for `/sitemap.xml`, `robots.txt`, and JSON-LD presence/parsing.
- `docs/TASKS.md`
  - Mark the implemented handoff items done or update current task status if requested.
- `docs/CHANGELOG_WORK.md`
  - Add a concise dated work note if project-memory upkeep is part of the assignment.

Do not edit assets unless a test proves an asset path is broken.

## 3. Step-by-Step Implementation Order

1. Read `docs/SEO_AUDIT_FIX_PLAN.md`, `index.html`, `robots.txt`, and `tests/e2e/navigation.spec.ts`.
2. Create root `sitemap.xml` with exactly one canonical URL: `https://liewcf.org/`.
3. Include a valid `<lastmod>` date if you can choose a stable implementation date; otherwise omit `lastmod` rather than inventing freshness.
4. Update `robots.txt` to keep:
   - `User-agent: *`
   - `Allow: /`
   - `Sitemap: https://liewcf.org/sitemap.xml`
5. Add one static JSON-LD script to `index.html` inside `<head>`.
6. Use `@graph` with two nodes:
   - `Person`
   - `WebSite`
7. Suggested `Person` fields:
   - `@type`: `Person`
   - `@id`: `https://liewcf.org/#person`
   - `name`: `Liew CheonFong`
   - `url`: `https://liewcf.org/`
   - `image`: `https://liewcf.org/assets/liewcf-profile.jpg`
   - `email`: `mailto:liewcf@gmail.com`
   - `sameAs`: `https://github.com/liewcf`, `https://www.facebook.com/LiewCheonFong`
   - `knowsAbout`: `WordPress`, `Developer utilities`, `Practical websites`, `SEO`, `Web development`
8. Suggested `WebSite` fields:
   - `@type`: `WebSite`
   - `@id`: `https://liewcf.org/#website`
   - `url`: `https://liewcf.org/`
   - `name`: `Liew CheonFong`
   - `publisher`: `{ "@id": "https://liewcf.org/#person" }`
   - `inLanguage`: `en`
9. Optionally update the title to:
   - `Liew CheonFong | WordPress Tools, Developer Utilities, and Practical Websites`
10. Add `og:site_name` with value `Liew CheonFong`.
11. Do not add `twitter:site` unless a confirmed Twitter/X handle is available.
12. Extend Playwright tests:
   - Homepage has one `script[type="application/ld+json"]`.
   - The JSON parses successfully.
   - The parsed graph includes `Person` and `WebSite`.
   - `/robots.txt` contains the sitemap URL.
   - `/sitemap.xml` returns `200` and includes only `https://liewcf.org/`.
13. Run checks.
14. Review `git diff` and make sure only intended files changed.

## 4. Exact Acceptance Criteria

- `sitemap.xml` exists at the repository root.
- `sitemap.xml` is valid XML.
- `sitemap.xml` contains `https://liewcf.org/`.
- `sitemap.xml` does not include removed legacy routes such as `/about/`, `/blog/`, `/projects/`, or `/contact/`.
- `robots.txt` still allows crawling.
- `robots.txt` includes exactly this sitemap URL: `https://liewcf.org/sitemap.xml`.
- `index.html` contains valid JSON-LD that can be parsed with `JSON.parse`.
- JSON-LD includes a `Person` node for `Liew CheonFong`.
- JSON-LD includes a `WebSite` node for `https://liewcf.org/`.
- JSON-LD uses absolute production URLs, not localhost, relative URLs, or the Cloudflare Pages fallback URL.
- Existing canonical URL remains `https://liewcf.org/`.
- Existing profile links remain unchanged:
  - `mailto:liewcf@gmail.com`
  - `https://github.com/liewcf`
  - `https://www.facebook.com/LiewCheonFong`
- Existing featured GitHub project links remain unchanged.
- Removed route test still passes for `/about/`, `/blog/`, `/projects/`, and `/contact/`.
- `npm run check` passes.

## 5. Commands to Run After Implementation

Run from repo root:

```sh
npm run check
```

Optional local preview:

```sh
npm run dev
```

Optional manual live checks after deploy, from a network that can resolve the domain:

```sh
curl -I -L https://liewcf.org/
curl -L https://liewcf.org/robots.txt
curl -L https://liewcf.org/sitemap.xml
```

Expected live checks:

- `https://liewcf.org/` returns `200`.
- `robots.txt` includes the sitemap line.
- `sitemap.xml` returns XML containing `https://liewcf.org/`.

## 6. Out-of-Scope Items

- Do not redesign the page.
- Do not add new sections or pages.
- Do not add a blog, CMS, RSS feed, sitemap generator, Astro, Tailwind, or routing.
- Do not add JavaScript behavior outside the static JSON-LD script.
- Do not add a contact form, Turnstile, Resend, Cloudflare Function, or environment variables.
- Do not create project detail pages.
- Do not change GitHub project selection or copy unless explicitly asked.
- Do not configure Google Search Console, Rich Results Test, PageSpeed Insights, Cloudflare DNS, or Cloudflare Pages settings from code.
- Do not claim live-domain verification unless you actually run and capture live checks successfully.

## 7. Risks and Things Not to Change

- The site is intentionally static and framework-free. Keep it that way.
- The canonical domain is `https://liewcf.org/`; do not switch metadata or sitemap URLs to `www`, localhost, or `liewcf-org.pages.dev`.
- Do not reintroduce removed legacy routes. Tests should continue proving they are not successful pages.
- Do not add stale or fake `lastmod` values to the sitemap. If unsure, omit `lastmod`.
- Keep the JSON-LD small and factual. Do not add unverifiable awards, employer claims, organization markup, ratings, reviews, or fake search actions.
- `twitter:site` needs a confirmed Twitter/X handle. If none is available, leave it out.
- Existing asset filenames are already referenced by `index.html`; avoid renaming them.
- There may be unrelated dirty changes in the working tree. Review `git status --short` before editing and do not revert unrelated user changes.

## 8. Rollback Notes

If the implementation causes test failures or deployment issues:

- Remove the added JSON-LD `<script type="application/ld+json">` from `index.html`.
- Remove `Sitemap: https://liewcf.org/sitemap.xml` from `robots.txt`.
- Delete root `sitemap.xml`.
- Revert only the test additions that assert sitemap/JSON-LD behavior.
- Keep unrelated existing content, assets, project cards, and route-removal tests intact.
- Run `npm run check` after rollback to confirm the original static page still passes.

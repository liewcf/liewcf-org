# Decisions

## 2026-05-10

- Replace the Astro portfolio/blog with a simple static one-page Editorial Profile site.
- Remove blog, project pages, content collections, the contact form, and the Cloudflare Pages contact API rather than archiving them in the repo.
- Keep a tiny npm workflow for local preview and Playwright smoke checks.
- Keep repo-level project memory in `AGENTS.md` plus `docs/PROJECT_CONTEXT.md`, `docs/DECISIONS.md`, `docs/TASKS.md`, and `docs/CHANGELOG_WORK.md`.

## 2026-05-11

- Use Cloudflare Pages build command `exit 0` for this static site; keep `npm run check` as local/CI verification rather than a Pages deployment build step.
- Use the square portrait asset for the hero image because the landscape WordCamp image cropped poorly on mobile.
- Keep featured GitHub projects as a curated static section in `index.html`, using placeholder entries until exact repository URLs and copy are chosen.
- Keep SEO enhancements static and hand-authored: a one-URL root `sitemap.xml`, a sitemap reference in `robots.txt`, and factual `Person`/`WebSite` JSON-LD in `index.html`.

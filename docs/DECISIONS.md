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

## 2026-05-12

- Use Cloudflare Pages `_redirects` for removed legacy routes instead of restoring those pages.
- Keep the hero portrait as AVIF/WebP with JPG fallback and `fetchpriority="high"` for the LCP image.
- Add agent-readiness metadata as static files and headers only: Link headers, Content Signals, an empty API catalog, an Agent Skills index, and browser WebMCP tools.
- Prefer truthful discovery over placeholder protocols: do not publish OAuth/OIDC metadata, OAuth protected-resource metadata, or an MCP Server Card until the site actually has protected APIs or a remote MCP server.

## 2026-05-20

- Do not pursue Cloudflare Markdown for Agents on the current Cloudflare Free account because the feature is not available there; keep the repo's existing static agent discovery as the supported agent-facing surface unless the account plan or feature availability changes.

## 2026-05-22

- Adopt the scratch preview's stronger editorial copy, light/dark CSS tokens, visible focus states, numbered focus tiles, and static project category filter while preserving the repo rule that contact stays outbound `mailto:` only. Do not add the preview contact form unless a future explicit decision changes the site's no-form/no-API direction.

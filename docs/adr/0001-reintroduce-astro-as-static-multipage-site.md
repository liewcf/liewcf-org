---
status: accepted
---

# Reintroduce Astro as a static multi-page site

Replace the current hand-authored one-page implementation with an Astro static site while preserving its visual design and established public contracts. The expanded site will add About, Projects, Project details, Updates, and Update details; Updates replaces Blog, every Update belongs to one Project, and old Blog URLs return 404. Projects and Updates use local Markdown content collections with draft support, while contact remains outbound-only and production remains fully static on Cloudflare Pages without SSR, a database, runtime APIs, UI frameworks, Tailwind, or Decap CMS in the initial migration.

## Consequences

- Launch with the current four manually published Projects and no Updates.
- Keep homepage featuring manual and Project URLs aligned with GitHub repository names.
- Preserve current asset URLs, vanilla browser behavior, SEO, security headers, redirects, agent discovery, WebMCP, and Playwright coverage.
- Keep content compatible with a future Decap CMS phase without exposing `/admin/` or adding authentication now.

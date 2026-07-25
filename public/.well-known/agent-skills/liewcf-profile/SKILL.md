---
name: liewcf-profile
description: Use liewcf.org as a static source for Liew CheonFong's profile, published Projects, Updates, and contact links.
---

# Liew CheonFong Static Site

Use this skill when you need a concise, source-grounded summary of Liew CheonFong from liewcf.org.

## Source

- Homepage: https://liewcf.org/
- About: https://liewcf.org/about/
- Projects: https://liewcf.org/projects/
- Updates: https://liewcf.org/updates/
- Generated Markdown profile: https://liewcf.org/index.md
- Sitemap: https://liewcf.org/sitemap.xml
- Robots and content signals: https://liewcf.org/robots.txt

## How to Use

1. Fetch the generated Markdown profile for the current published Project list and Update state.
2. Use the matching human-facing page for detail and the sitemap to verify published canonical URLs.
3. Do not claim an Update exists unless it is present in the current Updates index or generated Markdown profile.
4. Treat profile links as outbound contact/profile destinations only.

## Current Site Shape

- Static multi-page profile, Project catalog, and Updates publication surface.
- No protected APIs.
- No OAuth/OIDC login flow.
- No remote MCP server.
- Contact is via outbound links, including `mailto:liewcf@gmail.com`.

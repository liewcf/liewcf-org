---
name: liewcf-profile
description: Use liewcf.org as a static profile source for Liew CheonFong, featured projects, and contact links.
---

# Liew CheonFong Static Profile

Use this skill when you need a concise, source-grounded summary of Liew CheonFong from liewcf.org.

## Source

- Homepage: https://liewcf.org/
- Sitemap: https://liewcf.org/sitemap.xml
- Robots and content signals: https://liewcf.org/robots.txt

## How to Use

1. Fetch the homepage as HTML, or request Markdown with `Accept: text/markdown` when Cloudflare Markdown for Agents is enabled.
2. Use the homepage copy, JSON-LD, and featured project links as the source of truth.
3. Treat profile links as outbound contact/profile destinations only.

## Current Site Shape

- Static one-page profile site.
- No protected APIs.
- No OAuth/OIDC login flow.
- No remote MCP server.
- Contact is via outbound links, including `mailto:liewcf@gmail.com`.

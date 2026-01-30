# liewcf.org

Personal site and portfolio built with Astro.

Theme: based on the Dante Astro Theme by Just Good UI (GPL-3.0). See `LICENSE`.

## Development

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

## Content

Content is managed through Astro's content collections. Each collection has a Zod schema defined in `src/content.config.ts`.

### Blog Posts

**Location:** `src/content/blog/`

Create a `.md` or `.mdx` file:

```yaml
---
title: Post Title
publishDate: 2026-01-31 00:00:00
excerpt: Optional summary text
isFeatured: false
tags:
  - Tag1
  - Tag2
seo:
  title: SEO Title (optional)
  description: Meta description (15-160 chars)
---

Your Markdown content here.
```

### Projects

**Location:** `src/content/projects/`

```yaml
---
title: Project Name
publishDate: 2026-01-31 00:00:00
description: Project description
isFeatured: true
img: ./project-image.jpg
img_alt: Alt text
tags:
  - Tag1
repoUrl: https://github.com/...
liveUrl: https://example.com
---

Project details in Markdown.
```

### Static Pages

**Location:** `src/content/pages/`

```yaml
---
title: Page Title
seo:
  title: Page Title | Site Name
  description: Meta description
---

Page content in Markdown.
```

### Site Configuration

Edit `src/data/site-config.ts` to update:
- Site title, subtitle, description
- Navigation links (header/footer)
- Social links
- Hero section
- Posts per page

## Deployment (Cloudflare Pages)

Build settings:

- Build command: `npm ci && npm run build`
- Output directory: `dist`

Environment variables:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL` (default `hello@liewcf.org`)
- `CONTACT_TO_EMAIL` (default `liewcf@gmail.com`)
- `TURNSTILE_SECRET_KEY`
- `PUBLIC_TURNSTILE_SITE_KEY`

# Static One-Page Profile Design

Date: 2026-05-10

## Goal

Replace the current Astro portfolio/blog site with a simple static one-page profile for `liewcf.org`.

The site should act as a polished personal credibility page: who Liew CheonFong is, what he builds, and where to contact or follow him. It should not behave like a CMS, blog, multi-page portfolio, or lead-capture funnel.

## Approved Direction

- Use the Editorial Profile layout direction.
- Remove Astro, Tailwind, content collections, Markdown blog/project content, multiple routes, and the contact API.
- Keep a tiny npm workflow only for local preview and lightweight checks.
- Deploy as static files on Cloudflare Pages.
- Use outbound links only for contact.

## Architecture

The implementation should use plain static web files:

- `index.html` for the full page.
- `styles.css` for all styling.
- `assets/` for profile, Open Graph, favicon, and other static images.
- `robots.txt` for crawler instructions.
- `package.json` only for small convenience scripts.

There should be no framework runtime, no generated route layer, no content collection system, and no Cloudflare Pages Function.

Cloudflare Pages should publish the static site directly. If a build command is kept in Cloudflare for convenience, it should be trivial and should not require Astro.

## Page Structure

The page should be concise and editorial:

1. Hero profile
   - Portrait or event photo.
   - Name: Liew CheonFong.
   - Short positioning line based on the existing site: Builder, WordPress, developer tools.
   - Brief intro about building practical web experiences.
   - Primary outbound links such as email, GitHub, and Facebook.

2. What I build
   - Three short areas of focus:
     - WordPress tools.
     - Developer utilities.
     - Practical web experiences.

3. Proof points
   - A few compact credibility notes.
   - Existing project names may appear as short bullets if useful.
   - No individual project pages, Markdown entries, pagination, or collection files.

4. Contact footer
   - Plain outbound contact/profile links.
   - No form, no submission flow, and no client-side validation states.

## Removed Scope

The implementation should remove the live blog/project/page system entirely rather than archiving it inside the repo.

Remove or replace:

- `src/` Astro pages, layouts, components, content collections, utilities, and styles.
- `functions/api/contact.ts`.
- Contact form scripts, Turnstile handling, Resend integration, and related environment-variable requirements.
- Astro, Tailwind, MDX, sitemap/RSS, TypeScript app tooling, and framework-specific lint/typecheck scripts.
- E2E tests that assert navigation to removed routes.

## Contact Behavior

Contact is link-based:

- Email should use `mailto:`.
- Social/profile links should point to the approved external URLs.
- Links should have clear accessible names.
- External links should use safe attributes where appropriate.

No secrets, API keys, Turnstile keys, or email-service environment variables are needed.

## Local Workflow

Keep a minimal npm workflow, but only if it remains genuinely lightweight:

- A local preview command for serving static files.
- A smoke/check command that verifies the static page can load and key elements exist.

The checks should cover:

- The page title and main heading.
- Profile/hero image availability.
- Key email and profile links.
- Absence of old route expectations for `/about`, `/blog`, `/projects`, and `/contact`.

## Deployment Notes

Update README and project memory to reflect the new model:

- The site is a static one-page profile.
- There is no Astro build requirement.
- Cloudflare Pages should publish static files directly.
- No runtime environment variables are required.
- Old blog, project, and contact-form documentation no longer applies.

## Non-Goals

- Do not add a blog, CMS, search, RSS feed, or sitemap generator.
- Do not keep Astro just for familiarity.
- Do not preserve removed project/blog Markdown files as an archive.
- Do not add a contact form.
- Do not introduce a large design system, component framework, or build pipeline.

## Open Implementation Choices

These choices can be finalized during planning without changing the approved design:

- Whether the static assets live at repo root `assets/` or stay under `public/assets/` during migration.
- Which tiny static server/checking package, if any, should power npm scripts.
- Exact visual styling details within the approved Editorial Profile direction.

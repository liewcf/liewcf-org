# liewcf.org

Astro-generated static profile, About, Project catalog, and Updates publication surface for `liewcf.org`.

The visitor-facing site uses semantic HTML, plain CSS, vanilla browser JavaScript, and typed local Markdown for Projects and Updates. Astro generates static pages. A separate Cloudflare Worker handles contact submissions.

## Development

```sh
npm install
npm run dev
```

Open `http://localhost:4321`. The development server also binds to the local network on port `4321`.

## Checks

```sh
npm run check
```

This is the release gate. It runs offline Worker tests, checks Astro diagnostics, validates valid and invalid Update fixtures, creates a clean production build in `dist/`, serves that output, and runs the Playwright public-contract suite across the homepage, About, Projects, Updates, RSS, discovery, routing, security artifacts, assets, responsive behavior, and draft exclusion.

## Files

- `src/pages/index.astro` — homepage content, metadata, outbound links, and vanilla browser behavior.
- `src/pages/about.astro` — expanded factual About page.
- `src/content/projects/` — typed, draft-aware Project Markdown.
- `src/pages/projects/` — Project catalog and generated detail routes.
- `src/content/updates/` — typed, draft-aware Update Markdown linked to exactly one Project.
- `src/pages/updates/` — chronological Update index, generated detail routes, and RSS.
- `src/pages/index.md.ts` — generated agent-facing Markdown synchronized with published content.
- `src/pages/sitemap.xml.ts` — generated sitemap synchronized with published content.
- `src/pages/404.astro` — branded noindex 404 page.
- `public/` — stable CSS, assets, crawler/security/agent files, redirects, and headers.
- `dist/` — generated static production output.
- `tests/e2e/navigation.spec.ts` — production-output public-contract tests.

## Cloudflare production contract

Cloudflare Pages should publish the generated static output.

Recommended settings:

- Build command: `npm run build`
- Output directory: `dist`
- Runtime environment variables: none

The generated `_redirects` and `_headers` files preserve the site’s routing, discovery, content-type, and security contracts. Run `npm run check` locally or in CI before deploying. Cloudflare Pages should upload only `dist/`.

The Pages Git integration publishes changes pushed to the production branch. Deploy the contact Worker separately when its code changes.

## Contact form

The homepage, About page, and footer link to `/contact/`. The direct Gmail link also works without JavaScript. Astro preview serves the page. The browser tests simulate the spam check and email responses locally.

To enable delivery on the production domain:

1. Confirm the account has a verified destination for `liewcf@gmail.com`. The production Worker uses the domain’s existing Email Routing configuration to send to this address. Cloudflare also supports onboarding a dedicated Email Sending domain.
2. Reuse the existing managed Turnstile widget for `liewcf.org`. The contact Worker needs its public site key as `TURNSTILE_SITE_KEY` and its secret as the encrypted Worker secret `TURNSTILE_SECRET_KEY`. The site key is returned to the browser. Keep the secret in Cloudflare.
3. Deploy the Worker using `workers/contact/wrangler.jsonc` and configure those two bindings on `liewcf-contact`. The config routes only `https://liewcf.org/api/contact` and restricts the email binding to the verified Gmail inbox. The Pages build needs no keys.
4. Publish the static Pages build. Verify the contact-page headers and make an authorized test submission. Check receipt in Gmail and that Reply addresses the visitor.

The Worker validates the spam check, sends plain text from `contact@liewcf.org`, and sets the visitor’s email as `Reply-To`. The success message means Cloudflare accepted the send. The form sends one message and stores no submissions in the application.

## Future Decap compatibility

The typed local Markdown collections are compatible with a future Decap CMS phase, but this release intentionally contains no `/admin/` route, Decap bundle, authentication or backend configuration, CMS credentials or CMS runtime. Adding that phase requires a separate accepted decision and implementation.

# SEO Audit Fix Plan

Date: 2026-05-11
Site: https://liewcf.org/
Status: Historical plan; its one-page baseline was superseded by the verified static Astro migration recorded in `docs/HANDOFF.md`.

## Scope and Verification

- Audited the current repo source for the static one-page site: `index.html`, `robots.txt`, assets, and Playwright smoke coverage.
- Tried to fetch the live custom domain from this environment, but DNS resolution failed with `curl: (6) Could not resolve host: liewcf.org`. Treat live HTTP headers, redirects, and Search Console index status as still needing confirmation from a normal browser/network.
- Ran `npm run check` successfully after allowing the local Vite preview server to bind to `127.0.0.1:4321`; both Playwright smoke tests passed.

## Current Strengths

- The homepage has a clear single H1, concise page title, meta description, self-referencing canonical URL, Open Graph tags, Twitter card tags, and descriptive image alt text.
- The original one-page implementation used small image assets and a minimal static delivery model. The current implementation preserves that static production boundary through Astro-generated HTML, plain CSS, and small vanilla browser scripts.
- The page has crawlable static HTML content, direct outbound profile links, and direct GitHub project links.
- `robots.txt` allows crawling and does not accidentally block the homepage.
- Current route behavior is covered by Playwright: About and Projects are live, `/contact/` redirects permanently to the homepage, and old Blog routes receive the branded real 404.

## Findings

### P0: Confirm live DNS, redirects, and indexability

Live verification from this environment failed at DNS resolution, so the first priority is to confirm the public deployment from another network or Cloudflare dashboard:

- `https://liewcf.org/` returns `200`.
- `http://liewcf.org/` redirects to `https://liewcf.org/`.
- `https://www.liewcf.org/` either redirects to `https://liewcf.org/` or is intentionally not used.
- The Cloudflare Pages fallback domain does not compete as an alternate canonical version.
- Google Search Console can inspect and request indexing for `https://liewcf.org/`.

### P1: Add a minimal sitemap

The current `robots.txt` allows crawling but does not advertise a sitemap. For a one-page site this is not complex, but adding `/sitemap.xml` gives search engines a clean canonical URL hint and gives Search Console a stable sitemap to submit.

Recommended files:

- Add `sitemap.xml` with only `https://liewcf.org/`.
- Add `Sitemap: https://liewcf.org/sitemap.xml` to `robots.txt`.
- Add/adjust Playwright or lightweight checks so `/sitemap.xml` exists and contains only canonical indexable URLs.

### P1: Add Person and WebSite structured data

The static HTML currently has no JSON-LD. Add a small `Person` schema with `name`, `url`, `image`, `email`, `sameAs`, and `knowsAbout`, plus a lightweight `WebSite` node. This helps search engines understand that the page represents a person and connects the profile to GitHub/Facebook.

Keep it static in `index.html`; no runtime script or framework is needed.

### P1: Tighten title and social metadata around the actual brand

The current title is useful but slightly long and tool-category heavy. Keep the name first, but make the value proposition cleaner:

- Candidate title: `Liew CheonFong | WordPress Tools, Developer Utilities, and Practical Websites`
- Candidate meta description: keep current wording or add stronger proof language once project copy is final.
- Add `og:site_name` and `twitter:site` only if a stable Twitter/X handle exists; otherwise skip `twitter:site`.

### P2: Improve featured project trust signals

The featured project section is crawlable and useful, but it can become more SEO-worthy if each card has one concrete outcome or use case instead of only category descriptions. Keep the section static and curated.

Suggested direction:

- Add one short proof phrase per project, such as what problem it solves or who it helps.
- Keep direct GitHub links.
- Avoid adding separate project routes unless there is enough content to make each page genuinely useful.

### P2: Add image metadata guardrails

Current assets are small enough for a simple site. Keep image SEO/performance clean by:

- Keeping explicit `width` and `height` on the portrait image.
- Adding `loading="eager"` and `fetchpriority="high"` to the hero portrait only if it is consistently the LCP element.
- Avoiding oversized replacement images.
- Checking `og-image.jpg` remains at a social-card-friendly size and absolute URL.

### P2: Check Cloudflare response headers

Once live DNS fetch works, confirm:

- HTML has no accidental `noindex` or restrictive `x-robots-tag`.
- Static assets have reasonable cache headers.
- No mixed content.
- Compression is enabled for HTML/CSS.
- Optional: HSTS is enabled after HTTPS redirects are stable.

### P3: Search Console and external validation

After deploying the fixes:

- Submit `https://liewcf.org/sitemap.xml` in Google Search Console.
- Use URL Inspection for `https://liewcf.org/`.
- Run Rich Results Test to confirm JSON-LD parses.
- Check PageSpeed Insights for field/lab Core Web Vitals once the custom domain resolves externally.

## Implementation Order

1. Verify live DNS/redirect/indexability outside this environment.
2. Add `sitemap.xml` and reference it from `robots.txt`.
3. Add static `Person` and `WebSite` JSON-LD to `index.html`.
4. Add tests for sitemap and structured data presence.
5. Refine featured project copy when exact positioning is chosen.
6. Re-run `npm run check`, deploy, then validate Search Console, Rich Results, and PageSpeed.

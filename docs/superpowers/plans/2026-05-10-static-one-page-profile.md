# Static One-Page Profile Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current Astro multi-page portfolio/blog with a plain static one-page Editorial Profile site for `liewcf.org`.

**Architecture:** The final site is `index.html`, `styles.css`, static assets, `robots.txt`, and tiny npm scripts for preview/checks. There is no Astro, Tailwind, content collection system, Cloudflare Pages Function, contact form, or route-based navigation. Verification uses a small Playwright smoke test against the static page.

**Tech Stack:** Plain HTML, CSS, static assets, npm scripts, Playwright Chromium for smoke testing.

---

## File Structure

- Create `index.html`: complete one-page profile markup, metadata, structured headings, profile links, and image references.
- Create `styles.css`: all page styling for the Editorial Profile layout, responsive behavior, and link/button states.
- Create `assets/`: static image/icon location copied from the current `public/` assets that the one-page site still needs.
- Modify `robots.txt`: crawler rules without the old Astro sitemap index reference.
- Modify `package.json`: remove Astro/framework scripts and dependencies; keep tiny static preview/check scripts.
- Modify `package-lock.json`: regenerate after `package.json` dependency changes.
- Modify `tests/e2e/navigation.spec.ts`: replace removed route-navigation tests with one static profile smoke spec.
- Modify `playwright.config.ts`: serve the static site with the tiny preview command.
- Modify `.gitignore`: add `.superpowers/`.
- Modify `README.md`: document the static site workflow and Cloudflare Pages settings.
- Modify `AGENTS.md`: replace Astro-specific guidance with static-site guidance.
- Modify `docs/PROJECT_CONTEXT.md`, `docs/DECISIONS.md`, `docs/TASKS.md`, and `docs/CHANGELOG_WORK.md`: update repo-level memory to match the static one-page model.
- Delete `src/`, `functions/`, `scripts/playwright.mjs`, `astro.config.mjs`, `tailwind.config.cjs`, `tsconfig.json`, and `eslint.config.mjs` once replacements are in place.
- Delete old `public/` content after moving needed files to root-level `assets/` and `robots.txt`.

## Task 1: Build The Static Editorial Profile Page

**Files:**
- Create: `index.html`
- Create: `styles.css`
- Create: `assets/liewcf-profile.jpg`
- Create: `assets/liewcf-wordcamp.jpg`
- Create: `assets/og-image.jpg`
- Create: `assets/favicon.svg`
- Create: `assets/favicon.ico`
- Create: `assets/favicon-16x16.png`
- Create: `assets/favicon-32x32.png`
- Create: `assets/apple-touch-icon.png`
- Create: `assets/liewcf-pixel-512-light.png`
- Modify: `robots.txt`

- [ ] **Step 1: Copy required assets into root `assets/`**

Run:

```bash
mkdir -p assets
cp public/assets/liewcf-profile.jpg assets/liewcf-profile.jpg
cp public/assets/liewcf-wordcamp.jpg assets/liewcf-wordcamp.jpg
cp public/assets/og-image.jpg assets/og-image.jpg
cp public/favicon.svg assets/favicon.svg
cp public/favicon.ico assets/favicon.ico
cp public/favicon-16x16.png assets/favicon-16x16.png
cp public/favicon-32x32.png assets/favicon-32x32.png
cp public/apple-touch-icon.png assets/apple-touch-icon.png
cp public/liewcf-pixel-512-light.png assets/liewcf-pixel-512-light.png
cp public/robots.txt robots.txt
```

Expected: `assets/` contains the copied files and `robots.txt` exists at repo root.

- [ ] **Step 2: Create `index.html`**

Write this full file:

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Liew CheonFong | Builder, WordPress, Developer Tools</title>
		<meta name="description" content="Liew CheonFong builds WordPress tools, developer utilities, and practical web experiences.">
		<link rel="canonical" href="https://liewcf.org/">
		<meta property="og:type" content="website">
		<meta property="og:title" content="Liew CheonFong">
		<meta property="og:description" content="Builder of WordPress tools, developer utilities, and practical web experiences.">
		<meta property="og:url" content="https://liewcf.org/">
		<meta property="og:image" content="https://liewcf.org/assets/og-image.jpg">
		<meta name="twitter:card" content="summary_large_image">
		<meta name="twitter:title" content="Liew CheonFong">
		<meta name="twitter:description" content="Builder of WordPress tools, developer utilities, and practical web experiences.">
		<meta name="twitter:image" content="https://liewcf.org/assets/og-image.jpg">
		<link rel="icon" href="/assets/favicon.ico" sizes="any">
		<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
		<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
		<link rel="stylesheet" href="/styles.css">
	</head>
	<body>
		<main class="page-shell">
			<section class="hero" aria-labelledby="intro-title">
				<div class="hero-copy">
					<p class="eyebrow">Builder • WordPress • Developer Tools</p>
					<h1 id="intro-title">Hello, I’m Liew CheonFong</h1>
					<p class="lede">
						I build WordPress tools, developer utilities, and practical web experiences for people who need the web to work clearly.
					</p>
					<nav class="profile-links" aria-label="Profile links">
						<a href="mailto:liewcf@gmail.com">Email</a>
						<a href="https://github.com/liewcf" rel="me noopener">GitHub</a>
						<a href="https://www.facebook.com/LiewCheonFong" rel="me noopener">Facebook</a>
					</nav>
				</div>
				<figure class="hero-image">
					<img src="/assets/liewcf-wordcamp.jpg" alt="Liew CheonFong at WordCamp Malaysia 2025" width="960" height="1200">
				</figure>
			</section>

			<section class="section" aria-labelledby="build-title">
				<div class="section-heading">
					<p class="eyebrow">What I build</p>
					<h2 id="build-title">Small, useful tools with a clear job.</h2>
				</div>
				<div class="focus-grid">
					<article>
						<h3>WordPress tools</h3>
						<p>Plugins, publishing workflows, and site improvements shaped around real maintenance needs.</p>
					</article>
					<article>
						<h3>Developer utilities</h3>
						<p>Browser extensions, workflow helpers, and scripts that remove friction from repeated work.</p>
					</article>
					<article>
						<h3>Practical web experiences</h3>
						<p>Focused pages and interfaces that explain the offer, reduce confusion, and load quickly.</p>
					</article>
				</div>
			</section>

			<section class="section proof" aria-labelledby="proof-title">
				<div class="section-heading">
					<p class="eyebrow">Proof points</p>
					<h2 id="proof-title">A few things I’ve shipped and refined.</h2>
				</div>
				<ul class="proof-list">
					<li>WordPress and WooCommerce utilities for client and internal workflows.</li>
					<li>Browser tools that make repeated web tasks easier to inspect and complete.</li>
					<li>SEO, content, and deployment work with a bias toward simple systems that stay maintainable.</li>
				</ul>
			</section>
		</main>

		<footer class="site-footer">
			<p>Want to collaborate or compare notes?</p>
			<a href="mailto:liewcf@gmail.com">liewcf@gmail.com</a>
		</footer>
	</body>
</html>
```

- [ ] **Step 3: Create `styles.css`**

Write this full file:

```css
:root {
	color-scheme: light;
	--ink: #171717;
	--muted: #5c5c5c;
	--paper: #fbfaf7;
	--panel: #ffffff;
	--line: #ded8ce;
	--accent: #b6402d;
	--accent-dark: #7e2d21;
	--shadow: 0 24px 80px rgba(43, 34, 24, 0.12);
	font-family:
		Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

* {
	box-sizing: border-box;
}

html {
	background: var(--paper);
	color: var(--ink);
}

body {
	margin: 0;
	min-height: 100vh;
	font-size: 18px;
	line-height: 1.6;
}

body::before {
	position: fixed;
	inset: 0;
	z-index: -1;
	content: "";
	background:
		linear-gradient(90deg, rgba(23, 23, 23, 0.045) 1px, transparent 1px),
		linear-gradient(180deg, rgba(23, 23, 23, 0.035) 1px, transparent 1px);
	background-size: 72px 72px;
	mask-image: linear-gradient(to bottom, black, transparent 75%);
}

a {
	color: inherit;
	text-decoration-thickness: 0.08em;
	text-underline-offset: 0.18em;
}

a:hover {
	color: var(--accent-dark);
}

img {
	display: block;
	max-width: 100%;
	height: auto;
}

.page-shell {
	width: min(1120px, calc(100% - 40px));
	margin: 0 auto;
	padding: 48px 0 36px;
}

.hero {
	display: grid;
	grid-template-columns: minmax(0, 1.05fr) minmax(280px, 0.72fr);
	gap: clamp(32px, 6vw, 76px);
	align-items: center;
	min-height: min(760px, calc(100vh - 80px));
	padding-bottom: 28px;
}

.hero-copy {
	max-width: 720px;
}

.eyebrow {
	margin: 0 0 16px;
	color: var(--accent-dark);
	font-size: 0.76rem;
	font-weight: 800;
	letter-spacing: 0.12em;
	text-transform: uppercase;
}

h1,
h2,
h3,
p {
	margin-top: 0;
}

h1 {
	max-width: 820px;
	margin-bottom: 24px;
	font-family: Georgia, "Times New Roman", serif;
	font-size: clamp(3.25rem, 10vw, 7.6rem);
	line-height: 0.92;
	font-weight: 500;
	letter-spacing: 0;
}

.lede {
	max-width: 640px;
	margin-bottom: 30px;
	color: var(--muted);
	font-size: clamp(1.12rem, 2vw, 1.36rem);
	line-height: 1.55;
}

.profile-links {
	display: flex;
	flex-wrap: wrap;
	gap: 12px;
}

.profile-links a,
.site-footer a {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	min-height: 44px;
	padding: 10px 16px;
	border: 1px solid var(--line);
	border-radius: 999px;
	background: rgba(255, 255, 255, 0.72);
	box-shadow: 0 8px 28px rgba(43, 34, 24, 0.08);
	font-weight: 750;
	text-decoration: none;
}

.profile-links a:first-child {
	background: var(--ink);
	color: #fff;
	border-color: var(--ink);
}

.profile-links a:first-child:hover {
	background: var(--accent-dark);
	border-color: var(--accent-dark);
	color: #fff;
}

.hero-image {
	margin: 0;
	border: 1px solid var(--line);
	border-radius: 8px;
	overflow: hidden;
	box-shadow: var(--shadow);
	background: var(--panel);
	transform: rotate(1.5deg);
}

.hero-image img {
	width: 100%;
	aspect-ratio: 4 / 5;
	object-fit: cover;
}

.section {
	display: grid;
	grid-template-columns: minmax(220px, 0.42fr) minmax(0, 1fr);
	gap: clamp(24px, 5vw, 64px);
	padding: 54px 0;
	border-top: 1px solid var(--line);
}

.section-heading h2 {
	margin-bottom: 0;
	font-family: Georgia, "Times New Roman", serif;
	font-size: clamp(2rem, 4vw, 3.6rem);
	line-height: 1;
	font-weight: 500;
	letter-spacing: 0;
}

.focus-grid {
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 18px;
}

.focus-grid article {
	min-height: 220px;
	padding: 22px;
	border: 1px solid var(--line);
	border-radius: 8px;
	background: rgba(255, 255, 255, 0.7);
}

.focus-grid h3 {
	margin-bottom: 12px;
	font-size: 1.05rem;
	line-height: 1.2;
}

.focus-grid p,
.proof-list {
	color: var(--muted);
}

.proof-list {
	display: grid;
	gap: 18px;
	margin: 0;
	padding: 0;
	list-style: none;
	font-size: clamp(1.12rem, 2vw, 1.35rem);
	line-height: 1.5;
}

.proof-list li {
	padding-left: 22px;
	border-left: 3px solid var(--accent);
}

.site-footer {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	gap: 16px;
	width: min(1120px, calc(100% - 40px));
	margin: 0 auto;
	padding: 32px 0 48px;
	border-top: 1px solid var(--line);
	color: var(--muted);
}

.site-footer p {
	margin: 0;
}

@media (max-width: 820px) {
	body {
		font-size: 16px;
	}

	.page-shell {
		width: min(100% - 28px, 680px);
		padding-top: 24px;
	}

	.hero,
	.section {
		grid-template-columns: 1fr;
	}

	.hero {
		min-height: 0;
		gap: 28px;
	}

	.hero-image {
		max-width: 420px;
		transform: none;
	}

	.focus-grid {
		grid-template-columns: 1fr;
	}

	.focus-grid article {
		min-height: 0;
	}

	.site-footer {
		width: min(100% - 28px, 680px);
		align-items: flex-start;
		flex-direction: column;
	}
}
```

- [ ] **Step 4: Update `robots.txt`**

Write this full file:

```txt
User-agent: *
Allow: /
```

- [ ] **Step 5: Verify static files exist**

Run:

```bash
test -f index.html
test -f styles.css
test -f robots.txt
test -f assets/liewcf-wordcamp.jpg
test -f assets/og-image.jpg
```

Expected: all commands exit with status `0`.

- [ ] **Step 6: Commit the static page slice**

Run:

```bash
git add index.html styles.css robots.txt assets
git commit -m "feat: add static one-page profile"
```

Expected: commit succeeds and includes only static page files.

## Task 2: Replace The Tooling With A Tiny Static Workflow

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `playwright.config.ts`
- Modify: `tests/e2e/navigation.spec.ts`

- [ ] **Step 1: Replace `package.json`**

Write this full file:

```json
{
	"name": "liewcf-org",
	"type": "module",
	"version": "0.0.1",
	"engines": {
		"node": ">=22.13.0 <23"
	},
	"scripts": {
		"dev": "vite --host 127.0.0.1 --port 4321",
		"preview": "vite --host 127.0.0.1 --port 4321",
		"check": "npm run test:e2e",
		"test:e2e": "playwright test"
	},
	"devDependencies": {
		"@playwright/test": "^1.57.0",
		"vite": "^7.2.7"
	}
}
```

- [ ] **Step 2: Install the new dependency graph**

Run:

```bash
npm install
```

Expected: `package-lock.json` is regenerated with only `@playwright/test`, `vite`, and their transitive dependencies. No `astro`, `tailwindcss`, `@astrojs/*`, `eslint`, or `typescript` package should remain.

- [ ] **Step 3: Replace `playwright.config.ts`**

Write this full file:

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
	testDir: './tests/e2e',
	use: {
		baseURL: 'http://127.0.0.1:4321',
		browserName: 'chromium',
		trace: 'on-first-retry',
	},
	webServer: {
		command: 'npm run dev',
		url: 'http://127.0.0.1:4321',
		reuseExistingServer: true,
		stdout: 'pipe',
		stderr: 'pipe',
	},
});
```

- [ ] **Step 4: Replace `tests/e2e/navigation.spec.ts` with a static smoke test**

Write this full file:

```ts
import { expect, test } from '@playwright/test';

test('static profile page loads with key content and links', async ({ page }) => {
	await page.goto('/');

	await expect(page).toHaveTitle(/Liew CheonFong/);
	await expect(page.getByRole('heading', { name: 'Hello, I’m Liew CheonFong' })).toBeVisible();
	await expect(page.getByRole('img', { name: 'Liew CheonFong at WordCamp Malaysia 2025' })).toBeVisible();

	await expect(page.getByRole('link', { name: 'Email' })).toHaveAttribute('href', 'mailto:liewcf@gmail.com');
	await expect(page.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/liewcf');
	await expect(page.getByRole('link', { name: 'Facebook' })).toHaveAttribute('href', 'https://www.facebook.com/LiewCheonFong');
});

test('removed routes do not behave like live site pages', async ({ page }) => {
	for (const path of ['/about/', '/blog/', '/projects/', '/contact/']) {
		const response = await page.goto(path);
		expect(response?.status(), `${path} should not be a successful page`).not.toBe(200);
	}
});
```

- [ ] **Step 5: Run the smoke tests**

Run:

```bash
npm run test:e2e
```

Expected: both tests pass in Chromium.

- [ ] **Step 6: Commit the tooling slice**

Run:

```bash
git add package.json package-lock.json playwright.config.ts tests/e2e/navigation.spec.ts
git commit -m "chore: simplify static site tooling"
```

Expected: commit succeeds and contains only tooling/test files.

## Task 3: Remove Astro, Content, Contact API, And Old Config

**Files:**
- Delete: `src/`
- Delete: `functions/`
- Delete: `scripts/playwright.mjs`
- Delete: `astro.config.mjs`
- Delete: `tailwind.config.cjs`
- Delete: `tsconfig.json`
- Delete: `eslint.config.mjs`
- Delete: `public/`

- [ ] **Step 1: Remove obsolete framework files**

Run:

```bash
rm -rf src functions scripts astro.config.mjs tailwind.config.cjs tsconfig.json eslint.config.mjs public
```

Expected: those paths no longer exist. `index.html`, `styles.css`, `assets/`, `robots.txt`, package files, Playwright config, tests, docs, and repo metadata remain.

- [ ] **Step 2: Confirm removed scope is gone**

Run:

```bash
test ! -e src
test ! -e functions/api/contact.ts
test ! -e astro.config.mjs
test ! -e tailwind.config.cjs
test ! -e public
rg -n "Astro|Tailwind|Turnstile|Resend|content collections|/api/contact|src/content|functions/api" . --glob '!node_modules/**' --glob '!package-lock.json'
```

Expected: all `test ! -e` commands pass. `rg` may still find historical mentions in docs/specs/plans until Task 4 updates project documentation; it must not find live source/config that keeps those systems active.

- [ ] **Step 3: Run the smoke tests again**

Run:

```bash
npm run test:e2e
```

Expected: tests pass after old framework files are removed.

- [ ] **Step 4: Commit the removal slice**

Run:

```bash
git add -A src functions scripts astro.config.mjs tailwind.config.cjs tsconfig.json eslint.config.mjs public
git commit -m "chore: remove Astro site implementation"
```

Expected: commit succeeds and contains only deletions of obsolete implementation/config.

## Task 4: Update Documentation And Project Memory

**Files:**
- Modify: `README.md`
- Modify: `AGENTS.md`
- Modify: `.gitignore`
- Modify: `docs/PROJECT_CONTEXT.md`
- Modify: `docs/DECISIONS.md`
- Modify: `docs/TASKS.md`
- Modify: `docs/CHANGELOG_WORK.md`

- [ ] **Step 1: Update `.gitignore`**

Append `.superpowers/` under local/generated files:

```gitignore
# Superpowers brainstorming scratchpad
.superpowers/
```

- [ ] **Step 2: Replace `README.md`**

Write this full file:

```markdown
# liewcf.org

Static one-page profile site for `liewcf.org`.

The site is plain HTML and CSS. It is intentionally not a blog, CMS, Astro app, or multi-page portfolio.

## Development

```sh
npm install
npm run dev
```

Open `http://127.0.0.1:4321`.

## Checks

```sh
npm run check
```

This runs the Playwright smoke tests for the static profile page.

## Files

- `index.html` — page content, metadata, and outbound links.
- `styles.css` — all visual styling and responsive layout.
- `assets/` — profile, Open Graph, favicon, and touch-icon assets.
- `robots.txt` — crawler access rules.
- `tests/e2e/navigation.spec.ts` — static page smoke tests.

## Deployment

Cloudflare Pages should publish the static site directly.

Recommended settings:

- Build command: `npm install && npm run check`
- Output directory: `/`
- Runtime environment variables: none

If Cloudflare Pages is configured to skip builds, publish the repository root as the static output.
```

- [ ] **Step 3: Replace `AGENTS.md`**

Write a concise static-site version that includes:

```markdown
# AGENTS.md

This repo powers `liewcf.org`, a simple static one-page profile site built with plain HTML and CSS.

No Cursor rules found:

- `.cursor/rules/` not present
- `.cursorrules` not present

No Copilot instructions found:

- `.github/copilot-instructions.md` not present

If any of the above files are added later, treat them as higher-priority and update this doc.

## Quick commands

- Install: `npm install`
- Dev server: `npm run dev`
- Smoke checks: `npm run check`
- E2E tests: `npm run test:e2e`

## Project structure

- `index.html` — the full one-page profile, metadata, and outbound links.
- `styles.css` — all styling and responsive behavior.
- `assets/` — profile image, Open Graph image, favicons, and touch icons.
- `robots.txt` — crawler access rules.
- `tests/e2e/` — Playwright smoke tests.
- `docs/` — repo-level memory, decisions, tasks, changelog, and superpowers specs/plans.

## Code style

- Keep the site framework-free unless the user explicitly asks otherwise.
- Prefer plain semantic HTML and CSS.
- Keep page copy concise and profile-focused.
- Avoid adding blogs, CMS behavior, routing, contact forms, API functions, or build pipelines.
- Keep changes small and focused.

## Contact and links

- Contact is outbound-link only.
- Email uses `mailto:`.
- Social/profile links should have clear accessible names.
- Do not add secrets, forms, Turnstile, Resend, or runtime environment variables.

## Validation

- Run `npm run check` when feasible after page, link, or asset changes.
- For visual changes, preview with `npm run dev` and inspect desktop and mobile widths.

## Deployment

Cloudflare Pages should publish the static site directly from the repository root. No runtime environment variables are required.

## Project Memory Requirement

Keep these repo-level memory files accurate and concise when work changes project context:

- `docs/PROJECT_CONTEXT.md` for stable project facts, architecture, workflows, and constraints.
- `docs/DECISIONS.md` for dated technical or product decisions and rationale.
- `docs/TASKS.md` for current tasks, blockers, and next actions.
- `docs/CHANGELOG_WORK.md` for dated notes on changed files, behavior, docs, config, dependencies, tooling, tests, and verification.

Do not store secrets, credentials, API keys, private tokens, database dumps, or sensitive personal data in project memory.
```

- [ ] **Step 4: Replace `docs/PROJECT_CONTEXT.md`**

Write this full file:

```markdown
# Project Context

## Overview

- Project purpose: Personal profile and credibility page for `liewcf.org`.
- Primary users: Visitors who want to understand who Liew CheonFong is, what he builds, and how to contact or follow him.
- Current status: Static one-page site with plain HTML, CSS, image assets, and Playwright smoke checks.

## Architecture

- Framework: None.
- Styling: Plain CSS in `styles.css`.
- Content: Hand-authored HTML in `index.html`.
- Assets: Root-level `assets/` directory.
- Contact: Outbound links only; email uses `mailto:`.
- API: None.
- Runtime environment variables: None.

## Development Workflow

- Node: `>=22.13.0 <23`.
- Package manager: npm with `package-lock.json`.
- Dev server: `npm run dev`.
- Smoke checks: `npm run check`.
- E2E tests: `npm run test:e2e`.
- Cloudflare Pages: publish static files from the repository root. A build step is optional and should stay limited to install plus checks.

## Constraints

- Keep the site framework-free unless the user explicitly asks to reintroduce a framework.
- Do not add blog, CMS, route, contact form, Turnstile, Resend, or Cloudflare Function behavior without a new decision.
- Keep secrets out of project memory and source files.
- Preview visual changes on desktop and mobile widths before claiming completion when feasible.
```

- [ ] **Step 5: Replace `docs/DECISIONS.md`**

Write this full file:

```markdown
# Decisions

## 2026-05-10

- Replace the Astro portfolio/blog with a simple static one-page Editorial Profile site.
- Remove blog, project pages, content collections, the contact form, and the Cloudflare Pages contact API rather than archiving them in the repo.
- Keep a tiny npm workflow for local preview and Playwright smoke checks.
- Keep repo-level project memory in `AGENTS.md` plus `docs/PROJECT_CONTEXT.md`, `docs/DECISIONS.md`, `docs/TASKS.md`, and `docs/CHANGELOG_WORK.md`.
```

- [ ] **Step 6: Replace `docs/TASKS.md`**

Write this full file:

```markdown
# Tasks

## Current

- [ ] Confirm Cloudflare Pages settings publish the static root and no longer expect an Astro `dist/` output.
- [ ] Preview the final static page on desktop and mobile widths before launch.

## Blockers

- None recorded.

## Done

- [x] Decided to replace the Astro site with a static one-page profile.
- [x] Removed the contact form/API direction in favor of outbound contact links.
- [x] Kept a tiny npm workflow for preview and smoke checks.
```

- [ ] **Step 7: Replace `docs/CHANGELOG_WORK.md`**

Write this full file:

```markdown
# Work Changelog

## 2026-05-10

- Added a committed design spec for replacing the Astro site with a static one-page profile.
- Migrated the live site surface to `index.html`, `styles.css`, root-level assets, and `robots.txt`.
- Replaced Astro/Tailwind tooling with a tiny Vite preview command and Playwright smoke checks.
- Removed Astro source, content collections, Cloudflare contact API, and old framework configuration.
- Updated README, AGENTS.md, and project memory for the static one-page architecture.
```

- [ ] **Step 8: Run documentation/source searches**

Run:

```bash
rg -n "Astro|Tailwind|Turnstile|Resend|content collections|/api/contact|src/content|functions/api|dist" README.md AGENTS.md docs/PROJECT_CONTEXT.md docs/DECISIONS.md docs/TASKS.md docs/CHANGELOG_WORK.md
```

Expected: no matches in current guidance files except historical design/plan docs under `docs/superpowers/`, which are intentionally not included in this command.

- [ ] **Step 9: Commit documentation and memory updates**

Run:

```bash
git add README.md AGENTS.md .gitignore docs/PROJECT_CONTEXT.md docs/DECISIONS.md docs/TASKS.md docs/CHANGELOG_WORK.md
git commit -m "docs: update static site guidance"
```

Expected: commit succeeds with only docs and `.gitignore`.

## Task 5: Final Verification And Cleanup Check

**Files:**
- Verify: full repository

- [ ] **Step 1: Install from the lockfile**

Run:

```bash
npm ci
```

Expected: install succeeds from `package-lock.json`.

- [ ] **Step 2: Run final smoke checks**

Run:

```bash
npm run check
```

Expected: Playwright smoke tests pass.

- [ ] **Step 3: Verify removed systems are not active**

Run:

```bash
test ! -e src
test ! -e functions
test ! -e astro.config.mjs
test ! -e tailwind.config.cjs
test ! -e public
npm ls --depth=0
```

Expected: removed paths do not exist. `npm ls --depth=0` lists only the root package plus `@playwright/test` and `vite`; it must not list `astro`, `tailwindcss`, `@astrojs/mdx`, `@astrojs/rss`, `@astrojs/sitemap`, `@tailwindcss/vite`, or `resend`.

- [ ] **Step 4: Inspect Git status**

Run:

```bash
git status --short
```

Expected: only intentionally uncommitted local artifacts remain, if any. `.superpowers/` should not appear after `.gitignore` is updated.

- [ ] **Step 5: Final manual preview**

Run:

```bash
npm run dev
```

Open `http://127.0.0.1:4321` and inspect desktop and mobile widths. Confirm:

- Hero text is visible and not overlapping.
- Image loads.
- Email, GitHub, and Facebook links are visible.
- What I build and proof-point sections are readable.
- Footer contact link is visible.

- [ ] **Step 6: Commit any final fixes**

If Step 5 revealed fixes, run:

```bash
git add index.html styles.css tests/e2e/navigation.spec.ts README.md AGENTS.md docs/PROJECT_CONTEXT.md docs/DECISIONS.md docs/TASKS.md docs/CHANGELOG_WORK.md
git commit -m "fix: polish static profile launch"
```

Expected: commit is created only if fixes were needed. If no fixes were needed, skip this step.

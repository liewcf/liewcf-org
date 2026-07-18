import { expect, test } from '@playwright/test';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

test('static profile page loads with key content and links', async ({ page }) => {
	await page.goto('/');

	await expect(page).toHaveTitle(/Liew CheonFong/);
	await expect(page.getByRole('heading', { name: "Hello, I'm Liew CheonFong" })).toBeVisible();
	const portrait = page.getByRole('img', { name: 'Portrait of Liew CheonFong' });
	await expect(portrait).toBeVisible();
	await expect(portrait).toHaveAttribute('fetchpriority', 'high');
	await expect(portrait).toHaveAttribute('decoding', 'async');
	await expect(page.locator('source[type="image/avif"]')).toHaveAttribute('srcset', '/assets/liewcf-profile.avif');
	await expect(page.locator('source[type="image/webp"]')).toHaveAttribute('srcset', '/assets/liewcf-profile.webp');

	const profileLinks = page.getByRole('navigation', { name: 'Profile links' });
	await expect(profileLinks.getByRole('link', { name: 'Email' })).toHaveAttribute('href', 'mailto:liewcf@gmail.com');
	await expect(profileLinks.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/liewcf');
	await expect(profileLinks.getByRole('link', { name: 'GitHub' })).toHaveAttribute('target', '_blank');
	await expect(profileLinks.getByRole('link', { name: 'GitHub' })).toHaveAttribute('rel', /noopener/);
	await expect(profileLinks.getByRole('link', { name: 'Facebook' })).toHaveAttribute(
		'href',
		'https://www.facebook.com/LiewCheonFong',
	);
	await expect(profileLinks.getByRole('link', { name: 'Facebook' })).toHaveAttribute('target', '_blank');
	await expect(profileLinks.getByRole('link', { name: 'Facebook' })).toHaveAttribute('rel', /noopener/);

	await expect(page.getByRole('heading', { name: 'A few shipped tools from my workbench.' })).toBeVisible();
	const featuredProjects = [
		['youtube-watchlist-manager', 'https://github.com/liewcf/youtube-watchlist-manager'],
		['enjinmel-smtp', 'https://github.com/liewcf/enjinmel-smtp'],
		['verified-person-research', 'https://github.com/liewcf/verified-person-research'],
		['imagezoom', 'https://github.com/liewcf/imagezoom'],
	] as const;
	const projectCards = page.getByRole('article').filter({ has: page.locator('.project-repo') });
	await expect(projectCards).toHaveCount(4);
	await expect(projectCards.locator('.project-repo')).toHaveText(featuredProjects.map(([name]) => `liewcf/${name}`));
	for (const [project, url] of featuredProjects) {
		await expect(page.getByRole('article').filter({ hasText: project })).toBeVisible();
		await expect(page.getByRole('link', { name: `View ${project} on GitHub` })).toHaveAttribute('href', url);
	}

	const jsonldScript = page.locator('script[type="application/ld+json"]');
	await expect(jsonldScript).toHaveCount(1);
	const jsonld = JSON.parse(await jsonldScript.innerText());
	expect(jsonld['@graph']).toBeDefined();
	const graph = jsonld['@graph'] as Array<Record<string, unknown>>;
	const types = graph.map((n) => n['@type']);
	expect(types).toContain('Person');
	expect(types).toContain('WebSite');

	const person = graph.find((node) => node['@type'] === 'Person');
	expect(person).toMatchObject({
		'@id': 'https://liewcf.org/#person',
		name: 'Liew CheonFong',
		url: 'https://liewcf.org/',
		image: 'https://liewcf.org/assets/liewcf-profile.jpg',
		email: 'mailto:liewcf@gmail.com',
	});
	expect(person?.sameAs).toEqual(['https://github.com/liewcf', 'https://www.facebook.com/LiewCheonFong']);

	const website = graph.find((node) => node['@type'] === 'WebSite');
	expect(website).toMatchObject({
		'@id': 'https://liewcf.org/#website',
		name: 'Liew CheonFong',
		url: 'https://liewcf.org/',
		publisher: { '@id': 'https://liewcf.org/#person' },
		inLanguage: 'en',
	});
});

test('static project filters narrow the curated project list', async ({ page }) => {
	await page.goto('/');

	const filters = page.getByRole('group', { name: 'Filter projects by category' });
	const allButton = filters.getByRole('button', { name: 'All' });
	const wordpressButton = filters.getByRole('button', { name: 'WordPress' });
	const chromeExtensionButton = filters.getByRole('button', { name: 'Chrome Extension' });
	const developerToolButton = filters.getByRole('button', { name: 'Developer Tool' });
	const status = page.getByRole('status');

	await expect(allButton).toHaveAttribute('aria-pressed', 'true');

	await wordpressButton.click();
	await expect(wordpressButton).toHaveAttribute('aria-pressed', 'true');
	await expect(status).toHaveText('1 project in WordPress');
	await expect(page.getByRole('article').filter({ hasText: 'enjinmel-smtp' })).toBeVisible();
	await expect(page.getByRole('article').filter({ hasText: 'imagezoom' })).toBeHidden();

	await chromeExtensionButton.click();
	await expect(chromeExtensionButton).toHaveAttribute('aria-pressed', 'true');
	await expect(status).toHaveText('2 projects in Chrome Extension');
	await expect(page.getByRole('article').filter({ hasText: 'youtube-watchlist-manager' })).toBeVisible();
	await expect(page.getByRole('article').filter({ hasText: 'imagezoom' })).toBeVisible();
	await expect(page.getByRole('article').filter({ hasText: 'enjinmel-smtp' })).toBeHidden();

	await developerToolButton.click();
	await expect(developerToolButton).toHaveAttribute('aria-pressed', 'true');
	await expect(status).toHaveText('1 project in Developer Tool');
	await expect(page.getByRole('article').filter({ hasText: 'verified-person-research' })).toBeVisible();
	await expect(page.getByRole('article').filter({ hasText: 'youtube-watchlist-manager' })).toBeHidden();

	await allButton.click();
	await expect(allButton).toHaveAttribute('aria-pressed', 'true');
	await expect(status).toHaveText('');
	for (const project of ['youtube-watchlist-manager', 'enjinmel-smtp', 'verified-person-research', 'imagezoom']) {
		await expect(page.getByRole('article').filter({ hasText: project })).toBeVisible();
	}
});

test('styled lists keep explicit list semantics', async ({ page }) => {
	await page.goto('/');

	await expect(page.locator('.project-tags')).toHaveCount(4);
	await expect(page.locator('.project-tags[role="list"]')).toHaveCount(4);
	await expect(page.locator('.proof-list[role="list"]')).toHaveCount(1);
});

test('base type sizes use relative units', async () => {
	const styles = await readFile('styles.css', 'utf8');

	expect(styles).toContain('font-size: 1.125rem;');
	expect(styles).toContain('font-size: 1rem;');
	expect(styles).not.toContain('font-size: 18px;');
	expect(styles).not.toContain('font-size: 16px;');
});

test('contact remains outbound mailto only', async ({ page }) => {
	await page.goto('/');

	await expect(page.locator('form')).toHaveCount(0);
	await expect(page.locator('footer').getByRole('link', { name: 'liewcf@gmail.com' })).toHaveAttribute(
		'href',
		'mailto:liewcf@gmail.com',
	);
});

test('favicon is available from the conventional root path', async ({ page, request }) => {
	await page.goto('/');

	await expect(page.locator('link[rel="icon"][sizes="any"]')).toHaveAttribute('href', '/favicon.ico');

	const response = await request.get('/favicon.ico');
	expect(response.status()).toBe(200);
	expect(response.headers()['content-type']).toContain('image/x-icon');
});

test('removed routes do not behave like live site pages', async ({ page }) => {
	for (const path of ['/about/', '/blog/', '/projects/', '/contact/']) {
		const response = await page.goto(path);
		expect(response?.status(), `${path} should not be a successful page`).not.toBe(200);
	}
});

test('cloudflare redirects old routes to homepage', async () => {
	const redirects = await readFile('_redirects', 'utf8');
	for (const path of ['/about/', '/blog/', '/projects/', '/contact/']) {
		expect(redirects).toContain(`${path} / 301`);
	}
	expect(redirects).toContain('/.well-known/api-catalog /.well-known/api-catalog.json 200');
});

test('cloudflare pages has a real 404 page instead of SPA fallback', async () => {
	const notFoundPage = await readFile('404.html', 'utf8');

	expect(notFoundPage).toContain('<meta name="robots" content="noindex">');
	expect(notFoundPage).toContain('Page not found');
	expect(notFoundPage).toContain('href="/"');
});

test('cloudflare headers include security policy protections', async () => {
	const headers = await readFile('_headers', 'utf8');

	expect(headers).toContain('Strict-Transport-Security: max-age=31536000; includeSubDomains');
	expect(headers).toContain("Content-Security-Policy: default-src 'self';");
	expect(headers).toContain("frame-ancestors 'none'");
	expect(headers).toContain('X-Frame-Options: DENY');
	expect(headers).toContain('X-Content-Type-Options: nosniff');
	expect(headers).toContain('Referrer-Policy: strict-origin-when-cross-origin');
	expect(headers).toContain('Permissions-Policy:');
	expect(headers).toContain('/.well-known/security.txt');
	expect(headers).toContain('/llms.txt');
	expect(headers).toContain('/index.md');
	expect(headers).toContain('Content-Type: text/plain; charset=utf-8');
});

test('security.txt is a real well-known security contact file', async () => {
	const securityTxt = await readFile('.well-known/security.txt', 'utf8');

	expect(securityTxt).toContain('Contact: mailto:liewcf@gmail.com');
	expect(securityTxt).toContain('Expires: 2027-05-31T00:00:00Z');
	expect(securityTxt).toContain('Canonical: https://liewcf.org/.well-known/security.txt');
});

test('llms.txt and markdown profile give agents a static text entry point', async () => {
	const llmsTxt = await readFile('llms.txt', 'utf8');
	const markdownProfile = await readFile('index.md', 'utf8');

	expect(llmsTxt).toContain('# Liew CheonFong');
	expect(llmsTxt).toContain('- [Markdown profile](https://liewcf.org/index.md)');
	expect(llmsTxt).toContain('- [Agent Skills discovery](https://liewcf.org/.well-known/agent-skills/index.json)');
	expect(markdownProfile).toContain('# Liew CheonFong');
	expect(markdownProfile).toContain('mailto:liewcf@gmail.com');
	for (const project of ['youtube-watchlist-manager', 'enjinmel-smtp', 'verified-person-research', 'imagezoom']) {
		expect(markdownProfile).toContain(`https://github.com/liewcf/${project}`);
	}
	expect(markdownProfile).not.toContain('https://github.com/liewcf/public-draft-share');
});

test('robots.txt includes sitemap URL', async ({ page }) => {
	const response = await page.goto('/robots.txt');
	expect(response?.status()).toBe(200);
	const body = await response?.text() ?? '';
	expect(body).toContain('Sitemap: https://liewcf.org/sitemap.xml');
	expect(body).toContain('User-agent: *');
	expect(body).toContain('Allow: /');
	expect(body).toContain('Content-Signal: ai-train=yes, search=yes, ai-input=yes');
});

test('sitemap.xml exists and contains only canonical URLs', async ({ page }) => {
	const response = await page.goto('/sitemap.xml');
	expect(response?.status()).toBe(200);
	const body = await response?.text() ?? '';
	expect(body).toContain('https://liewcf.org/');
	const locMatches = body.match(/<loc>.*?<\/loc>/g) ?? [];
	expect(locMatches).toEqual(['<loc>https://liewcf.org/</loc>']);
	expect(body).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
	expect(body).not.toContain('/about/');
	expect(body).not.toContain('/blog/');
	expect(body).not.toContain('/projects/');
	expect(body).not.toContain('/contact/');
});

test('cloudflare headers advertise agent discovery resources', async () => {
	const headers = await readFile('_headers', 'utf8');

	expect(headers).toContain('/');
	expect(headers).toContain('Link: </.well-known/api-catalog>; rel="api-catalog"');
	expect(headers).toContain('Link: </.well-known/agent-skills/index.json>; rel="service-desc"; type="application/json"; title="Agent Skills Discovery Index"');
	expect(headers).toContain('/.well-known/api-catalog');
	expect(headers).toContain('Content-Type: application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"');
	expect(headers).toContain('/.well-known/api-catalog.json');
	expect(headers).toContain('/.well-known/agent-skills/index.json');
	expect(headers).toContain('Content-Type: application/json; charset=utf-8');
	expect(headers).toContain('/.well-known/agent-skills/liewcf-profile/SKILL.md');
	expect(headers).toContain('Content-Type: text/markdown; charset=utf-8');
});

test('api catalog publishes a truthful empty linkset for this static site', async () => {
	const apiCatalog = JSON.parse(await readFile('.well-known/api-catalog.json', 'utf8'));

	expect(apiCatalog).toEqual({
		linkset: [],
	});
});

test('agent skills index advertises a verifiable static profile skill', async () => {
	const index = JSON.parse(await readFile('.well-known/agent-skills/index.json', 'utf8'));
	const skill = await readFile('.well-known/agent-skills/liewcf-profile/SKILL.md');
	const digest = `sha256:${createHash('sha256').update(skill).digest('hex')}`;

	expect(index).toEqual({
		$schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
		skills: [
			{
				name: 'liewcf-profile',
				type: 'skill-md',
				description: 'Use liewcf.org as a static profile source for Liew CheonFong, featured projects, and contact links.',
				url: '/.well-known/agent-skills/liewcf-profile/SKILL.md',
				digest,
			},
		],
	});
});

test('homepage registers read-only WebMCP tools when supported', async () => {
	const html = await readFile('index.html', 'utf8');

	expect(html).toContain('navigator.modelContext');
	expect(html).toContain('provideContext');
	expect(html).toContain('get_profile_summary');
	expect(html).toContain('list_featured_projects');
	expect(html).toContain('get_contact_links');
	for (const project of ['youtube-watchlist-manager', 'enjinmel-smtp', 'verified-person-research', 'imagezoom']) {
		expect(html).toContain(`https://github.com/liewcf/${project}`);
	}
	expect(html).not.toContain('https://github.com/liewcf/public-draft-share');
});

import { expect, test } from '@playwright/test';

test('static profile page loads with key content and links', async ({ page }) => {
	await page.goto('/');

	await expect(page).toHaveTitle(/Liew CheonFong/);
	await expect(page.getByRole('heading', { name: "Hello, I'm Liew CheonFong" })).toBeVisible();
	await expect(page.getByRole('img', { name: 'Portrait of Liew CheonFong' })).toBeVisible();

	const profileLinks = page.getByRole('navigation', { name: 'Profile links' });
	await expect(profileLinks.getByRole('link', { name: 'Email' })).toHaveAttribute('href', 'mailto:liewcf@gmail.com');
	await expect(profileLinks.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/liewcf');
	await expect(profileLinks.getByRole('link', { name: 'Facebook' })).toHaveAttribute(
		'href',
		'https://www.facebook.com/LiewCheonFong',
	);

	await expect(page.getByRole('heading', { name: 'A few shipped tools from my workbench.' })).toBeVisible();
	for (const project of ['project-memory', 'QuickRes', 'enjinmel-smtp', 'public-draft-share']) {
		await expect(page.getByRole('article').filter({ hasText: project })).toBeVisible();
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

test('removed routes do not behave like live site pages', async ({ page }) => {
	for (const path of ['/about/', '/blog/', '/projects/', '/contact/']) {
		const response = await page.goto(path);
		expect(response?.status(), `${path} should not be a successful page`).not.toBe(200);
	}
});

test('robots.txt includes sitemap URL', async ({ page }) => {
	const response = await page.goto('/robots.txt');
	expect(response?.status()).toBe(200);
	const body = await response?.text() ?? '';
	expect(body).toContain('Sitemap: https://liewcf.org/sitemap.xml');
	expect(body).toContain('User-agent: *');
	expect(body).toContain('Allow: /');
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

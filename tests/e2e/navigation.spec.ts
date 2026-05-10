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

	await expect(page.getByRole('heading', { name: 'Selected projects worth a closer look.' })).toBeVisible();
	await expect(page.getByRole('article').filter({ hasText: 'WordPress Utility Project' })).toBeVisible();
});

test('removed routes do not behave like live site pages', async ({ page }) => {
	for (const path of ['/about/', '/blog/', '/projects/', '/contact/']) {
		const response = await page.goto(path);
		expect(response?.status(), `${path} should not be a successful page`).not.toBe(200);
	}
});

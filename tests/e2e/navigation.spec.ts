import { expect, test } from '@playwright/test';

test('static profile page loads with key content and links', async ({ page }) => {
	await page.goto('/');

	await expect(page).toHaveTitle(/Liew CheonFong/);
	await expect(page.getByRole('heading', { name: "Hello, I'm Liew CheonFong" })).toBeVisible();
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

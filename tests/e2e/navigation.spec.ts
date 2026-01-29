import { expect, test } from '@playwright/test';

test('home page loads and shows hero heading', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Hello, I’m Liew CheonFong' })).toBeVisible();
});

test('navigate to about page', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('contentinfo').getByRole('link', { name: 'About' }).click();
	await expect(page).toHaveURL(/\/about\/?$/);
	await expect(page.getByRole('heading', { name: 'About' })).toBeVisible();
});

test('navigate to projects page', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('navigation').getByRole('link', { name: 'Projects' }).click();
	await expect(page).toHaveURL(/\/projects\/?$/);
	await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible();
});

test('navigate to contact page', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Contact' }).click();
	await expect(page).toHaveURL(/\/contact\/?$/);
	await expect(page.getByRole('heading', { name: 'Contact' })).toBeVisible();
});

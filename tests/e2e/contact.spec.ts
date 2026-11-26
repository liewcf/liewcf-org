import { expect, test } from '@playwright/test';

test('contact offers direct email when the Worker is unavailable', async ({ page }) => {
	await page.route('**/api/contact', (route) => route.fulfill({ status: 503, json: {} }));
	await page.goto('/contact/');
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('Get in touch');
	await expect(page.getByRole('link', { name: 'liewcf@gmail.com' })).toHaveAttribute('href', 'mailto:liewcf@gmail.com');
	await expect(page.getByRole('status')).toContainText('form is unavailable');
	await expect(page.getByRole('button', { name: 'Send message' })).toBeDisabled();
});

test('preserves a failed message, gets a new token, and clears an accepted message', async ({ page }) => {
	let submissions = 0;
	await page.route('https://challenges.cloudflare.com/**', (route) => route.fulfill({
		contentType: 'application/javascript',
		body: `let options;
			window.turnstile = {
				render(selector, settings) { options = settings; options.callback('first'); return 'local'; },
				reset() { options.callback('second'); }
			};`,
	}));
	await page.route('**/api/contact', async (route) => {
		if (route.request().method() === 'GET') return route.fulfill({ json: { siteKey: 'fixture' } });
		submissions++;
		expect(route.request().postDataJSON()).toEqual({
			email: 'visitor@example.org', message: 'Hello', token: submissions === 1 ? 'first' : 'second',
		});
		await route.fulfill(submissions === 1
			? { status: 503, json: { error: 'Please try again.' } }
			: { json: { accepted: true } });
	});
	await page.goto('/contact/');
	await page.getByLabel('Your email').fill('visitor@example.org');
	await page.getByLabel('Message', { exact: true }).fill('Hello');
	const send = page.getByRole('button', { name: 'Send message' });
	await send.click();
	await expect(page.getByRole('status')).toHaveText('Please try again.');
	await expect(page.getByLabel('Message', { exact: true })).toHaveValue('Hello');
	await send.click();
	await expect(page.getByRole('heading', { name: 'Thanks for getting in touch!' })).toBeFocused();
	await expect(page.getByText('Your message is on its way to me.')).toBeVisible();
	await expect(send).toBeHidden();
	await page.getByRole('link', { name: 'Write another message' }).click();
	await expect(page.getByLabel('Your email')).toBeEmpty();
	await expect(page.getByLabel('Message', { exact: true })).toBeEmpty();
	await expect(send).toBeEnabled();
	expect(submissions).toBe(2);
});

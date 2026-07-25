import { defineConfig } from '@playwright/test';

export default defineConfig({
	testDir: './tests/e2e',
	use: {
		baseURL: 'http://127.0.0.1:4332',
		browserName: 'chromium',
		trace: 'on-first-retry',
	},
	webServer: {
		command: './node_modules/.bin/astro preview --host 0.0.0.0 --port 4332',
		url: 'http://127.0.0.1:4332',
		reuseExistingServer: false,
		stdout: 'pipe',
		stderr: 'pipe',
	},
});

import { defineConfig } from 'astro/config';

export default defineConfig({
	site: 'https://liewcf.org',
	output: 'static',
	server: {
		host: true,
		port: 4321,
	},
});

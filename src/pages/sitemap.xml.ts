import type { APIRoute } from 'astro';
import { getProjectSlug, getVisibleProjects } from '../lib/projects';
import { getUpdateSlug, getVisibleUpdates } from '../lib/updates';

const siteUrl = 'https://liewcf.org';

export const GET: APIRoute = async () => {
	const projects = await getVisibleProjects();
	const updates = await getVisibleUpdates();
	const paths = [
		'/',
		'/about/',
		'/projects/',
		...projects.map((project) => `/projects/${getProjectSlug(project)}/`),
		'/updates/',
		...updates.map((update) => `/updates/${getUpdateSlug(update)}/`),
	];
	const urls = paths.map((path) => `  <url>
    <loc>${siteUrl}${path}</loc>
  </url>`).join('\n');
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
		},
	});
};

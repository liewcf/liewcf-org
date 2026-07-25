import type { APIRoute } from 'astro';
import { getProjectSlug } from '../../lib/projects';
import { getUpdateProject, getUpdateSlug, getVisibleUpdates } from '../../lib/updates';

const siteUrl = 'https://liewcf.org';

function escapeXml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}

export const GET: APIRoute = async () => {
	const updates = await getVisibleUpdates();
	const items = await Promise.all(updates.map(async (update) => {
		const project = await getUpdateProject(update);
		const updateUrl = `${siteUrl}/updates/${getUpdateSlug(update)}/`;
		const projectUrl = `${siteUrl}/projects/${getProjectSlug(project)}/`;

		return `    <item>
      <title>${escapeXml(update.data.title)}</title>
      <description>${escapeXml(update.data.summary)}</description>
      <link>${updateUrl}</link>
      <guid isPermaLink="true">${updateUrl}</guid>
      <pubDate>${update.data.publishedAt.toUTCString()}</pubDate>
      <category domain="${projectUrl}">${escapeXml(project.data.title)}</category>
    </item>`;
	}));
	const itemXml = items.length > 0 ? `\n${items.join('\n')}\n  ` : '\n  ';
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Updates from Liew CheonFong</title>
    <link>${siteUrl}/updates/</link>
    <description>Project progress and publication notes from Liew CheonFong.</description>
    <language>en</language>${itemXml}</channel>
</rss>
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8',
		},
	});
};

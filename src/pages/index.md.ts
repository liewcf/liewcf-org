import type { APIRoute } from 'astro';
import { getProjectSlug, getPublishedProjects } from '../lib/projects';
import {
	formatUpdateDate,
	getPublishedUpdates,
	getUpdateProject,
	getUpdateSlug,
} from '../lib/updates';

const siteUrl = 'https://liewcf.org';

export const GET: APIRoute = async () => {
	const projects = await getPublishedProjects();
	const updates = await getPublishedUpdates();
	const projectEntries = projects.map((project) => {
		const slug = getProjectSlug(project);
		const categories = project.data.categories.join(', ');

		return `### [${project.data.title}](${siteUrl}/projects/${slug}/)

${project.data.summary}

- Categories: ${categories}
- Repository: ${project.data.repositoryUrl}`;
	});
	const updateEntries = await Promise.all(updates.map(async (update) => {
		const project = await getUpdateProject(update);

		return `- [${update.data.title}](${siteUrl}/updates/${getUpdateSlug(update)}/) — ${formatUpdateDate(update.data.publishedAt)}, [${project.data.title}](${siteUrl}/projects/${getProjectSlug(project)}/)`;
	}));
	const updatesSection = updateEntries.length > 0
		? updateEntries.join('\n')
		: 'No Updates have been published yet. The [Updates index](https://liewcf.org/updates/) will list them when available.';
	const body = `# Liew CheonFong

I build practical WordPress tools, macOS utilities, developer utilities, and focused websites.

## Site

- [Home](${siteUrl}/)
- [About](${siteUrl}/about/)
- [Projects](${siteUrl}/projects/)
- [Updates](${siteUrl}/updates/)

## Contact

- Email: mailto:liewcf@gmail.com
- GitHub: https://github.com/liewcf
- Facebook: https://www.facebook.com/LiewCheonFong

## Published Projects

${projectEntries.join('\n\n')}

## Published Updates

${updatesSection}
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8',
		},
	});
};

import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

const launchProjectOrder = [
	'youtube-watchlist-manager',
	'enjinmel-smtp',
	'verified-person-research',
	'imagezoom',
];

export function getRepositoryName(repositoryUrl: string): string {
	const pathname = new URL(repositoryUrl).pathname.replace(/\/$/, '');
	return pathname.slice(pathname.lastIndexOf('/') + 1);
}

export function getProjectSlug(project: Project): string {
	const repositoryName = getRepositoryName(project.data.repositoryUrl);

	if (project.id !== repositoryName) {
		throw new Error(
			`Project content file "${project.id}" must match its GitHub repository name "${repositoryName}".`,
		);
	}

	return repositoryName;
}

export function sortProjects(projects: Project[]): Project[] {
	return [...projects].sort((left, right) => {
		const leftOrder = launchProjectOrder.indexOf(getProjectSlug(left));
		const rightOrder = launchProjectOrder.indexOf(getProjectSlug(right));
		const normalizedLeft = leftOrder === -1 ? Number.MAX_SAFE_INTEGER : leftOrder;
		const normalizedRight = rightOrder === -1 ? Number.MAX_SAFE_INTEGER : rightOrder;

		return normalizedLeft - normalizedRight || left.data.title.localeCompare(right.data.title);
	});
}

export async function getVisibleProjects(): Promise<Project[]> {
	const projects = await getCollection('projects');
	const visibleProjects = import.meta.env.PROD
		? projects.filter((project) => !project.data.draft)
		: projects;

	return sortProjects(visibleProjects);
}

import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

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
		const leftOrder = left.data.featuredOrder ?? Number.MAX_SAFE_INTEGER;
		const rightOrder = right.data.featuredOrder ?? Number.MAX_SAFE_INTEGER;

		return leftOrder - rightOrder || left.data.title.localeCompare(right.data.title);
	});
}

function validateFeaturedOrder(projects: Project[]): void {
	const usedOrders = new Set<number>();

	for (const project of projects) {
		const order = project.data.featuredOrder;

		if (order === undefined || usedOrders.has(order)) {
			throw new Error('Published featured Projects require unique featuredOrder values.');
		}

		usedOrders.add(order);
	}
}

export async function getVisibleProjects(): Promise<Project[]> {
	const projects = await getCollection('projects');
	const visibleProjects = import.meta.env.PROD
		? projects.filter((project) => !project.data.draft)
		: projects;

	return sortProjects(visibleProjects);
}

export async function getPublishedProjects(): Promise<Project[]> {
	const projects = await getCollection('projects');
	return sortProjects(projects.filter((project) => !project.data.draft));
}

export async function getPublishedFeaturedProjects(): Promise<Project[]> {
	const projects = await getPublishedProjects();
	const featuredProjects = projects.filter((project) => project.data.featured);

	validateFeaturedOrder(featuredProjects);
	return sortProjects(featuredProjects);
}

export function getProjectCategories(projects: Project[]): string[] {
	return [...new Set(projects.flatMap((project) => project.data.categories))];
}

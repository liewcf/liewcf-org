import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import type { Project } from './projects';

export type Update = CollectionEntry<'updates'>;

export function getUpdateSlug(update: Update): string {
	return update.id;
}

export function sortUpdates(updates: Update[]): Update[] {
	return [...updates].sort((left, right) => (
		right.data.publishedAt.getTime() - left.data.publishedAt.getTime()
		|| left.data.title.localeCompare(right.data.title)
	));
}

export async function getVisibleUpdates(): Promise<Update[]> {
	const updates = await getCollection('updates');
	const visibleUpdates = import.meta.env.PROD
		? updates.filter((update) => !update.data.draft)
		: updates;

	return sortUpdates(visibleUpdates);
}

export async function getVisibleUpdatesForProject(project: Project): Promise<Update[]> {
	const updates = await getVisibleUpdates();
	return updates.filter((update) => update.data.project.id === project.id);
}

export async function getUpdateProject(update: Update): Promise<Project> {
	const project = await getEntry(update.data.project);

	if (!project) {
		throw new Error(`Update "${update.id}" references a Project that does not exist.`);
	}

	return project;
}

export function formatUpdateDate(date: Date): string {
	return new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'long',
		timeZone: 'UTC',
		year: 'numeric',
	}).format(date);
}

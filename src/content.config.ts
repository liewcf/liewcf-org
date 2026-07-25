import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { projectLiveUrl } from './lib/project-schema';

const githubRepositoryUrl = z
	.url()
	.refine((value) => {
		const url = new URL(value);
		const pathParts = url.pathname.split('/').filter(Boolean);

		return (
			url.protocol === 'https:'
			&& url.hostname === 'github.com'
			&& url.port === ''
			&& url.search === ''
			&& url.hash === ''
			&& !url.pathname.endsWith('/')
			&& pathParts.length === 2
			&& pathParts.every((part) => /^[A-Za-z0-9_.-]+$/.test(part))
		);
	}, 'Use a canonical HTTPS GitHub repository URL.');

const publicUploadUrl = z
	.string()
	.refine((value) => value.startsWith('/uploads/') && !value.includes('..'), 'Use a stable public /uploads/ URL.');

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
	schema: z
		.object({
			title: z.string().min(1),
			summary: z.string().min(1),
			repositoryUrl: githubRepositoryUrl,
			categories: z.array(z.string().min(1)).min(1),
			featured: z.boolean(),
			featuredOrder: z.number().int().positive().optional(),
			draft: z.boolean(),
			status: z.string().min(1).optional(),
			liveUrl: projectLiveUrl.optional(),
			coverImage: publicUploadUrl.optional(),
		})
		.superRefine((project, context) => {
			if (project.featured && project.featuredOrder === undefined) {
				context.addIssue({
					code: 'custom',
					message: 'Featured Projects require an explicit featuredOrder.',
					path: ['featuredOrder'],
				});
			}

			if (!project.featured && project.featuredOrder !== undefined) {
				context.addIssue({
					code: 'custom',
					message: 'Non-featured Projects must not define featuredOrder.',
					path: ['featuredOrder'],
				});
			}
		}),
});

const updates = defineCollection({
	loader: glob({ base: './src/content/updates', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string().min(1),
		summary: z.string().min(1),
		publishedAt: z.coerce.date(),
		draft: z.boolean(),
		project: reference('projects'),
	}),
});

export const collections = { projects, updates };

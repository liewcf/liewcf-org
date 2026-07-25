import { z } from 'astro/zod';

export const projectLiveUrl = z
	.url()
	.refine((value) => {
		const url = new URL(value);

		return (
			(url.protocol === 'http:' || url.protocol === 'https:')
			&& url.username === ''
			&& url.password === ''
		);
	}, 'Use an HTTP or HTTPS URL without embedded credentials.');

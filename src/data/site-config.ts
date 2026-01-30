import type { SiteConfig } from '../types';

const siteConfig: SiteConfig = {
	website: 'https://liewcf.org',
	avatar: {
		src: '/assets/liewcf-profile.jpg',
		alt: 'Portrait of Liew CheonFong',
	},
	title: 'Liew CheonFong',
	subtitle: 'Builder • WordPress • Developer Tools',
	description: 'WordPress tools, browser extensions, and practical web experiences.',
	image: {
		src: '/assets/liewcf-profile.jpg',
		alt: 'Liew CheonFong',
	},
	ogImage: '/og-image.jpg',
	headerNavLinks: [
		{ text: 'Home', href: '/' },
		{ text: 'Projects', href: '/projects' },
		{ text: 'Blog', href: '/blog' },
		{ text: 'Contact', href: '/contact' },
	],
	footerNavLinks: [
		{ text: 'About', href: '/about' },
		{ text: 'Contact', href: '/contact' },
		{ text: 'Terms', href: '/terms' },
	],
	socialLinks: [
		{ text: 'GitHub', href: 'https://github.com/liewcf' },
		{ text: 'Facebook', href: 'https://www.facebook.com/LiewCheonFong' },
	],
	hero: {
		title: 'Hello, I’m Liew CheonFong',
		text: 'I build **WordPress tools**, **developer utilities**, and practical web experiences.\n\nIf you want to collaborate or have a project in mind, feel free to reach out.',
		image: {
			src: '/assets/liewcf-wordcamp.jpg',
			alt: 'Liew CheonFong at WordCamp Malaysia 2025',
		},
		actions: [{ text: 'Get in Touch', href: '/contact' }],
	},
	subscribe: {
		enabled: false,
	},
	postsPerPage: 8,
	projectsPerPage: 8,
};

export default siteConfig;

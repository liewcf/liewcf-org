import { spawnSync } from 'node:child_process';
import { copyFile, mkdir, readFile, unlink } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const contentDirectory = resolve(root, 'src/content/updates');
const contentPath = resolve(contentDirectory, 'acceptance-fixture.md');
const astroBinary = resolve(root, 'node_modules/.bin/astro');

if (existsSync(contentPath)) {
	throw new Error(`Refusing to overwrite existing fixture path: ${contentPath}`);
}

async function buildWithFixture(name, shouldPass) {
	await copyFile(resolve(root, `tests/fixtures/updates/${name}.md`), contentPath);
	const result = spawnSync(astroBinary, ['build'], {
		cwd: root,
		encoding: 'utf8',
		env: process.env,
	});
	await unlink(contentPath);

	if (shouldPass && result.status !== 0) {
		throw new Error(`Valid Update fixture failed to build:\n${result.stdout}\n${result.stderr}`);
	}

	if (!shouldPass && result.status === 0) {
		throw new Error(`Invalid Update fixture "${name}" unexpectedly built successfully.`);
	}
}

await mkdir(contentDirectory, { recursive: true });

try {
	await buildWithFixture('published-valid', true);

	const updatePage = await readFile(resolve(root, 'dist/updates/acceptance-fixture/index.html'), 'utf8');
	const projectPage = await readFile(resolve(root, 'dist/projects/imagezoom/index.html'), 'utf8');
	const rss = await readFile(resolve(root, 'dist/updates/rss.xml'), 'utf8');
	const sitemap = await readFile(resolve(root, 'dist/sitemap.xml'), 'utf8');

	for (const expected of [
		'Published Update fixture',
		'This fixture exercises the published Update body.',
		'href="/projects/imagezoom/"',
	]) {
		if (!updatePage.includes(expected)) {
			throw new Error(`Published Update page is missing expected content: ${expected}`);
		}
	}

	if (!projectPage.includes('Published Update fixture')) {
		throw new Error('Published Update fixture did not appear in its Project timeline.');
	}

	for (const output of [rss, sitemap]) {
		if (!output.includes('https://liewcf.org/updates/acceptance-fixture/')) {
			throw new Error('Published Update fixture did not appear in a production discovery output.');
		}
	}

	await buildWithFixture('missing-project', false);
	await buildWithFixture('multiple-projects', false);
	await buildWithFixture('nonexistent-project', false);
	await buildWithFixture('empty-draft-body', false);
} finally {
	if (existsSync(contentPath)) {
		await unlink(contentPath);
	}
}

console.log('Update fixture checks passed: published rendering plus 3 invalid relationships and 1 empty draft body.');

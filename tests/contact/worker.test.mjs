import assert from 'node:assert/strict';
import test from 'node:test';
import worker from '../../workers/contact/index.js';

const endpoint = 'https://liewcf.org/api/contact';
const draft = { email: 'visitor@example.org', message: 'A question about a project.', token: 'test-token' };
const verified = { success: true, hostname: 'liewcf.org', action: 'contact' };
const post = (data, origin = 'https://liewcf.org') => new Request(endpoint, {
	method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: JSON.stringify(data),
});

function setup(t, verification = verified) {
	const verify = t.mock.method(globalThis, 'fetch', async () => Response.json(verification));
	const send = t.mock.fn(async () => ({ messageId: 'local-test-id' }));
	const env = { TURNSTILE_SITE_KEY: 'public-test', TURNSTILE_SECRET_KEY: 'test-only', EMAIL: { send } };
	return { env, verify, send };
}

test('publishes only the site key and disables the form when configuration is missing', async (t) => {
	const { env } = setup(t);
	const get = new Request(endpoint);
	assert.deepEqual(await (await worker.fetch(get, env)).json(), { siteKey: 'public-test' });
	assert.equal((await worker.fetch(get, {})).status, 503);
});

test('verifies the token before sending one plain-text message to the owner', async (t) => {
	const { env, verify, send } = setup(t);
	const response = await worker.fetch(post({ ...draft, to: 'other@example.org' }), env);
	assert.deepEqual(await response.json(), { accepted: true });
	const [url, options] = verify.mock.calls[0].arguments;
	assert.equal(url, 'https://challenges.cloudflare.com/turnstile/v0/siteverify');
	assert.equal(options.body.get('response'), draft.token);
	assert.equal(send.mock.callCount(), 1);
	assert.deepEqual(send.mock.calls[0].arguments[0], {
		from: 'contact@liewcf.org', to: 'liewcf@gmail.com', replyTo: draft.email,
		subject: 'Message from liewcf.org', text: draft.message,
	});
});

test('rejects invalid submissions before contacting either service', async (t) => {
	const { env, verify, send } = setup(t);
	for (const request of [
		post(draft, 'https://example.org'), post({ ...draft, email: 'invalid' }),
		post({ ...draft, message: '   ' }), post({ ...draft, message: 'x'.repeat(5001) }),
		post({ ...draft, token: '' }), post({ ...draft, extra: 'x'.repeat(32768) }),
		new Request(endpoint, { method: 'PUT' }),
	]) assert.ok((await worker.fetch(request, env)).status >= 400);
	assert.equal(verify.mock.callCount(), 0);
	assert.equal(send.mock.callCount(), 0);
});

test('sends nothing after a failed, misplaced, or unavailable spam check', async (t) => {
	const { env, verify, send } = setup(t);
	for (const check of [{ success: false }, { ...verified, action: 'other' }, { ...verified, hostname: 'example.org' }]) {
		verify.mock.mockImplementation(async () => Response.json(check));
		assert.equal((await worker.fetch(post(draft), env)).status, 403);
	}
	verify.mock.mockImplementation(async () => { throw new Error('offline'); });
	assert.equal((await worker.fetch(post(draft), env)).status, 503);
	assert.equal(send.mock.callCount(), 0);
});

test('reports failure when the mail binding rejects or returns no message ID', async (t) => {
	const { env, send } = setup(t);
	for (const result of [async () => { throw new Error('recipient rejected'); }, async () => ({})]) {
		send.mock.mockImplementation(result);
		const response = await worker.fetch(post(draft), env);
		assert.equal(response.status, 503);
		assert.equal((await response.json()).accepted, undefined);
	}
});

const origin = 'https://liewcf.org';
const unavailable = 'The form is unavailable. Please try again later or email directly.';

const emailPattern = /^[^\s@<>,;:"\\]+@[^\s@<>,;:"\\]+\.[^\s@<>,;:"\\]+$/u;
const controlCharacters = /[\u0000-\u001f\u007f]/u;

function json(data, status = 200, headers = {}) {
	return Response.json(data, { status, headers: { 'Cache-Control': 'no-store', ...headers } });
}

// Bound actual bytes even when the client streams the body without a length.
async function readSubmission(request) {
	const decoder = new TextDecoder('utf-8', { fatal: true });
	let bytes = 0;
	let body = '';
	for await (const chunk of request.body) {
		bytes += chunk.byteLength;
		if (bytes > 32768) return null;
		body += decoder.decode(chunk, { stream: true });
	}
	return JSON.parse(body + decoder.decode());
}

export default {
	async fetch(request, env) {
		if (new URL(request.url).pathname !== '/api/contact') return json({}, 404);
		if (!['GET', 'POST'].includes(request.method)) return json({}, 405, { Allow: 'GET, POST' });
		if (!env.TURNSTILE_SITE_KEY || !env.TURNSTILE_SECRET_KEY || !env.EMAIL) {
			return json({ error: unavailable }, 503);
		}
		if (request.method === 'GET') return json({ siteKey: env.TURNSTILE_SITE_KEY });
		if (request.headers.get('Origin') !== origin) return json({}, 403);
		if (request.headers.get('Content-Type')?.split(';')[0].trim() !== 'application/json') return json({}, 415);

		let data;
		try {
			data = await readSubmission(request);
		} catch {
			return json({ error: 'Please check the form and try again.' }, 400);
		}
		if (data === null) return json({ error: 'Please shorten your message.' }, 413);
		const { email, message, token } = data ?? {};
		if (typeof email !== 'string' || email.length > 254 || !emailPattern.test(email) || controlCharacters.test(email)) {
			return json({ error: 'Enter a valid email address.' }, 400);
		}
		if (typeof message !== 'string' || !message.trim() || message.length > 5000) {
			return json({ error: 'Enter a message of up to 5,000 characters.' }, 400);
		}
		if (typeof token !== 'string' || !token || token.length > 2048) {
			return json({ error: 'Complete the spam check and try again.' }, 400);
		}
		try {
			const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
				method: 'POST',
				body: new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: token }),
				signal: AbortSignal.timeout(10000),
			});
			if (!response.ok) return json({ error: unavailable }, 503);
			const check = await response.json();
			if (check.success !== true || check.hostname !== 'liewcf.org' || check.action !== 'contact') {
				return json({ error: 'Complete a new spam check and try again.' }, 403);
			}
			const sent = await env.EMAIL.send({
				from: 'contact@liewcf.org',
				to: 'liewcf@gmail.com',
				replyTo: email,
				subject: 'Message from liewcf.org',
				text: message.trim(),
			});
			if (!sent?.messageId) return json({ error: unavailable }, 503);
			return json({ accepted: true });
		} catch {
			return json({ error: unavailable }, 503);
		}
	},
};

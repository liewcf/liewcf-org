interface Env {
	RESEND_API_KEY?: string;
	TURNSTILE_SECRET_KEY?: string;
	RESEND_FROM_EMAIL?: string;
	CONTACT_TO_EMAIL?: string;
}

const MAX_NAME_LENGTH = 100;
const MAX_SUBJECT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;

const EMAIL_SUBJECT_PREFIX = '[LiewCF.ORG] ';

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

type TurnstileVerifyResult = {
	success?: boolean;
	'error-codes'?: string[];
	hostname?: string;
	action?: string;
	cdata?: string;
};

const formatTurnstileError = (errorCodes: string[]): { status: number; message: string } => {
	if (errorCodes.includes('missing-input-response')) {
		return { status: 400, message: 'Please complete the Turnstile challenge and try again.' };
	}

	if (errorCodes.includes('timeout-or-duplicate')) {
		return { status: 400, message: 'Turnstile token expired. Please try again.' };
	}

	if (errorCodes.includes('bad-hostname')) {
		return {
			status: 400,
			message:
				'Turnstile hostname mismatch. If you are testing a preview URL, add it to the widget’s allowed hostnames.',
		};
	}

	if (errorCodes.includes('invalid-input-secret') || errorCodes.includes('missing-input-secret')) {
		return { status: 500, message: 'Turnstile configuration error.' };
	}

	return { status: 400, message: 'Turnstile verification failed.' };
};

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
	const formData = await request.formData();
	const name = String(formData.get('name') || '').trim();
	const email = String(formData.get('email') || '').trim();
	const subject = String(formData.get('subject') || '').trim();
	const message = String(formData.get('message') || '').trim();
	const honeypot = String(formData.get('company') || '').trim();
	const turnstileToken = String(formData.get('cf-turnstile-response') || '').trim();

	if (honeypot) {
		return Response.json({ ok: true });
	}

	if (!name || !email || !subject || !message) {
		return Response.json(
			{ ok: false, error: 'Please complete all required fields.' },
			{ status: 400 }
		);
	}

	if (!isValidEmail(email)) {
		return Response.json(
			{ ok: false, error: 'Please provide a valid email address.' },
			{ status: 400 }
		);
	}

	if (name.length > MAX_NAME_LENGTH || subject.length > MAX_SUBJECT_LENGTH || message.length > MAX_MESSAGE_LENGTH) {
		return Response.json(
			{ ok: false, error: 'Input exceeds maximum allowed length.' },
			{ status: 400 }
		);
	}

	if (!env.TURNSTILE_SECRET_KEY) {
		return Response.json({ ok: false, error: 'Missing Turnstile configuration.' }, { status: 500 });
	}

	if (!turnstileToken) {
		return Response.json(
			{ ok: false, error: 'Please complete the Turnstile challenge and try again.' },
			{ status: 400 }
		);
	}

	const remoteIp =
		request.headers.get('cf-connecting-ip') || request.headers.get('CF-Connecting-IP') || '';

	const turnstileResponse = await fetch(
		'https://challenges.cloudflare.com/turnstile/v0/siteverify',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			},
			body: new URLSearchParams({
				secret: env.TURNSTILE_SECRET_KEY,
				response: turnstileToken,
				...(remoteIp ? { remoteip: remoteIp } : {}),
			}),
		}
	);

	if (!turnstileResponse.ok) {
		return Response.json({ ok: false, error: 'Turnstile verification failed.' }, { status: 502 });
	}

	const turnstileResult = (await turnstileResponse.json()) as TurnstileVerifyResult;

	if (!turnstileResult.success) {
		const errorCodes = (turnstileResult['error-codes'] || []).filter((code) => Boolean(code));

		const { status, message } = formatTurnstileError(errorCodes);
		return Response.json({ ok: false, error: message }, { status });
	}

	if (!env.RESEND_API_KEY) {
		return Response.json({ ok: false, error: 'Missing email configuration.' }, { status: 500 });
	}

	const fromEmail = env.RESEND_FROM_EMAIL || 'hello@liewcf.org';
	const toEmail = env.CONTACT_TO_EMAIL || 'liewcf@gmail.com';
	const safeSubject = `${EMAIL_SUBJECT_PREFIX}${subject}`;

	const emailBody = [`Name: ${name}`, `Email: ${email}`, `Subject: ${subject}`, '', message].join(
		'\n'
	);

	const resendResponse = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${env.RESEND_API_KEY}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			from: fromEmail,
			to: [toEmail],
			reply_to: email,
			subject: safeSubject,
			text: emailBody,
		}),
	});

	if (!resendResponse.ok) {
		return Response.json({ ok: false, error: 'Email delivery failed.' }, { status: 500 });
	}

	return Response.json({ ok: true });
};

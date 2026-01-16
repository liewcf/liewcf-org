interface Env {
	RESEND_API_KEY?: string;
	TURNSTILE_SECRET_KEY?: string;
	RESEND_FROM_EMAIL?: string;
	CONTACT_TO_EMAIL?: string;
}

const EMAIL_SUBJECT_PREFIX = '[LiewCF.ORG] ';

const isValidEmail = (value: string) =>
	/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export const onRequestPost = async ({
	request,
	env,
}: {
	request: Request;
	env: Env;
}) => {
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
		return Response.json({ ok: false, error: 'Please complete all required fields.' }, { status: 400 });
	}

	if (!isValidEmail(email)) {
		return Response.json({ ok: false, error: 'Please provide a valid email address.' }, { status: 400 });
	}

	if (!env.TURNSTILE_SECRET_KEY) {
		return Response.json({ ok: false, error: 'Missing Turnstile configuration.' }, { status: 500 });
	}

	const turnstileResponse = await fetch(
		'https://challenges.cloudflare.com/turnstile/v0/siteverify',
		{
			method: 'POST',
			body: new URLSearchParams({
				secret: env.TURNSTILE_SECRET_KEY,
				response: turnstileToken,
			}),
		},
	);

	if (!turnstileResponse.ok) {
		return Response.json({ ok: false, error: 'Turnstile verification failed.' }, { status: 400 });
	}

	const turnstileResult = (await turnstileResponse.json()) as { success?: boolean };

	if (!turnstileResult.success) {
		return Response.json({ ok: false, error: 'Turnstile verification failed.' }, { status: 400 });
	}

	if (!env.RESEND_API_KEY) {
		return Response.json({ ok: false, error: 'Missing email configuration.' }, { status: 500 });
	}

	const fromEmail = env.RESEND_FROM_EMAIL || 'hello@liewcf.org';
	const toEmail = env.CONTACT_TO_EMAIL || 'liewcf@gmail.com';
	const safeSubject = `${EMAIL_SUBJECT_PREFIX}${subject}`;

	const emailBody = [
		`Name: ${name}`,
		`Email: ${email}`,
		`Subject: ${subject}`,
		'',
		message,
	].join('\n');

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

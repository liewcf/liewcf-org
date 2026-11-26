const form = document.querySelector('#contact-form');
const button = form.querySelector('button');
const statusLine = form.querySelector('[role="status"]');
const email = form.elements.email;
const message = form.elements.message;
const unavailable = 'The form is unavailable. You can still use the email link above.';
let token = '';
let widgetId;
let sending = false;

function clearCheck() {
	token = '';
	button.disabled = true;
}

async function loadCheck() {
	try {
		const config = await fetch(form.action, { signal: AbortSignal.timeout(10000) });
		if (!config.ok) throw new Error();
		const { siteKey } = await config.json();
		if (!siteKey) throw new Error();
		const script = document.createElement('script');
		script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
		script.onerror = () => { statusLine.textContent = unavailable; };
		script.onload = () => {
			widgetId = window.turnstile.render('#contact-check', {
				sitekey: siteKey,
				action: 'contact',
				size: 'flexible',
				callback(value) {
					token = value;
					button.disabled = sending;
				},
				'expired-callback': clearCheck,
				'error-callback'() {
					clearCheck();
					statusLine.textContent = 'The spam check could not finish. You can also use the email link above.';
				},
			});
		};
		document.head.append(script);
	} catch {
		statusLine.textContent = unavailable;
	}
}

form.addEventListener('submit', async (event) => {
	event.preventDefault();
	if (sending || !token) return;
	sending = true;
	button.disabled = true;
	email.readOnly = message.readOnly = true;
	statusLine.textContent = 'Sending…';
	try {
		const response = await fetch(form.action, {
			method: 'POST',
			signal: AbortSignal.timeout(30000),
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: email.value.trim(), message: message.value, token }),
		});
		const result = await response.json();
		if (response.ok && result.accepted === true) {
			form.reset();
			statusLine.textContent = 'Thanks. Your message was accepted for sending.';
		} else {
			statusLine.textContent = result.error || unavailable;
		}
	} catch {
		statusLine.textContent = 'Could not confirm sending. Your message is still here.';
	} finally {
		sending = false;
		email.readOnly = message.readOnly = false;
		clearCheck();
		window.turnstile.reset(widgetId);
	}
});

loadCheck();

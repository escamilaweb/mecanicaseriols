const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** @param {string} value */
function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

/** @param {Record<string, unknown>} body */
function parseForm(body) {
  return {
    name: String(body.name ?? '').trim(),
    phone: String(body.phone ?? '').trim(),
    email: String(body.email ?? '').trim(),
    carBrand: String(body.carBrand ?? '').trim(),
    message: String(body.message ?? '').trim(),
  };
}

/** @type {import('@cloudflare/workers-types').PagesFunction} */
export const onRequestPost = async (context) => {
  const contentType = context.request.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    return Response.json({ error: 'Solicitud inválida.' }, { status: 415 });
  }

  let body;
  try {
    body = await context.request.json();
  } catch {
    return Response.json({ error: 'No se pudo leer el formulario.' }, { status: 400 });
  }

  const { name, phone, email, carBrand, message } = parseForm(body);

  if (!name || !phone || !email || !carBrand || !message) {
    return Response.json({ error: 'Completa todos los campos obligatorios.' }, { status: 400 });
  }

  if (!emailPattern.test(email)) {
    return Response.json({ error: 'El email no es válido.' }, { status: 400 });
  }

  const apiKey = context.env.RESEND_API_KEY;
  const from = context.env.RESEND_FROM_EMAIL;
  const to = context.env.RESEND_TO_EMAIL;

  if (!apiKey || !from || !to) {
    return Response.json(
      { error: 'El envío de correo no está configurado. Contacta al administrador del sitio.' },
      { status: 503 },
    );
  }

  const subject = `Nuevo contacto web — ${name}`;
  const html = `
    <h2>Nuevo mensaje desde mecanicaseriols.com</h2>
    <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
    <p><strong>Teléfono:</strong> ${escapeHtml(phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Marca del auto:</strong> ${escapeHtml(carBrand)}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
  `;

  const text = [
    'Nuevo mensaje desde mecanicaseriols.com',
    '',
    `Nombre: ${name}`,
    `Teléfono: ${phone}`,
    `Email: ${email}`,
    `Marca del auto: ${carBrand}`,
    '',
    'Mensaje:',
    message,
  ].join('\n');

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: email,
      subject,
      html,
      text,
    }),
  });

  if (!resendResponse.ok) {
    console.error('Resend error:', await resendResponse.text());
    return Response.json({ error: 'No se pudo enviar el mensaje. Intenta más tarde.' }, { status: 502 });
  }

  return Response.json({ ok: true });
};

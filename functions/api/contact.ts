import { escapeHtml, parseContactForm, validateContactForm } from '../lib/contact-validation.ts';

/** @param {Record<string, string>} data */
function buildContactEmailHtml(data) {
  const { name, phone, email, carBrand, message } = data;
  const messageHtml = escapeHtml(message).replace(/\n/g, '<br>');

  const row = (label, value) => `
    <tr>
      <td style="padding:0 0 16px 0;font-family:Inter,Arial,sans-serif;">
        <p style="margin:0 0 4px;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#929497;">${label}</p>
        <p style="margin:0;font-size:16px;line-height:1.5;color:#333333;">${value}</p>
      </td>
    </tr>`;

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nuevo contacto web</title>
</head>
<body style="margin:0;padding:0;background-color:#f2f2f2;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f2f2f2;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;border-collapse:collapse;">
          <tr>
            <td style="padding:0;background-color:#0d0e10;border-radius:16px 16px 0 0;overflow:hidden;">
              <div style="height:4px;background-color:#e20707;font-size:0;line-height:0;">&#8203;</div>
              <div style="padding:28px 32px 24px;font-family:Inter,Arial,sans-serif;">
                <p style="margin:0;font-size:22px;font-weight:800;letter-spacing:0.04em;text-transform:uppercase;color:#ffffff;line-height:1.2;">
                  Mecánica <span style="color:#e20707;">Seriols</span>
                </p>
                <p style="margin:14px 0 0;font-size:12px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:#d0d2d3;">Nuevo contacto web</p>
                <h1 style="margin:8px 0 0;font-size:24px;line-height:1.3;font-weight:700;color:#ffffff;">${escapeHtml(name)}</h1>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background-color:#ffffff;padding:32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                ${row('Teléfono', escapeHtml(phone))}
                ${row('Email', `<a href="mailto:${escapeHtml(email)}" style="color:#e20707;text-decoration:none;">${escapeHtml(email)}</a>`)}
                ${row('Marca del auto', escapeHtml(carBrand))}
                <tr>
                  <td style="padding:0;font-family:Inter,Arial,sans-serif;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#929497;">Mensaje</p>
                    <p style="margin:0;font-size:16px;line-height:1.6;color:#333333;background-color:#fafafa;border-left:4px solid #e20707;padding:16px 18px;border-radius:0 8px 8px 0;">${messageHtml}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background-color:#fafafa;border-radius:0 0 16px 16px;padding:20px 32px;font-family:Inter,Arial,sans-serif;text-align:center;border-top:1px solid #f2f2f2;">
              <p style="margin:0;font-size:13px;line-height:1.5;color:#808184;">
                Enviado desde el formulario de contacto en
                <a href="https://mecanicaseriols.com" style="color:#e20707;text-decoration:none;font-weight:600;">mecanicaseriols.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** @type {import('@cloudflare/workers-types').PagesFunction} */
export const onRequestPost = async (context) => {
  if (context.request.method !== 'POST') {
    return Response.json({ error: 'Método no permitido.' }, { status: 405 });
  }

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

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return Response.json({ error: 'Solicitud inválida.' }, { status: 400 });
  }

  const payload = parseContactForm(body);
  const validation = validateContactForm(payload);

  if (!validation.ok) {
    return Response.json({ error: validation.error }, { status: 400 });
  }

  const { name, phone, email, carBrand, message } = payload;
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
  const html = buildContactEmailHtml({ name, phone, email, carBrand, message });
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
    console.error('Resend error status:', resendResponse.status);
    return Response.json({ error: 'No se pudo enviar el mensaje. Intenta más tarde.' }, { status: 502 });
  }

  return Response.json({ ok: true });
};

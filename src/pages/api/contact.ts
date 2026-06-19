import { Resend } from 'resend';
import type { APIRoute } from 'astro';

export const prerender = false;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get('content-type')?.includes('application/json') !== true) {
    return Response.json({ error: 'Solicitud inválida.' }, { status: 415 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'No se pudo leer el formulario.' }, { status: 400 });
  }

  const name = String(body.name ?? '').trim();
  const phone = String(body.phone ?? '').trim();
  const email = String(body.email ?? '').trim();
  const carBrand = String(body.carBrand ?? '').trim();
  const message = String(body.message ?? '').trim();

  if (!name || !phone || !email || !carBrand || !message) {
    return Response.json({ error: 'Completa todos los campos obligatorios.' }, { status: 400 });
  }

  if (!emailPattern.test(email)) {
    return Response.json({ error: 'El email no es válido.' }, { status: 400 });
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  const from = import.meta.env.RESEND_FROM_EMAIL;
  const to = import.meta.env.RESEND_TO_EMAIL;

  if (!apiKey || !from || !to) {
    return Response.json(
      { error: 'El envío de correo no está configurado. Contacta al administrador del sitio.' },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
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

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject,
    html,
    text,
  });

  if (error) {
    console.error('Resend error:', error);
    return Response.json({ error: 'No se pudo enviar el mensaje. Intenta más tarde.' }, { status: 502 });
  }

  return Response.json({ ok: true });
};

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

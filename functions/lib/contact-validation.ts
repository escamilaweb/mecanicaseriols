export const CONTACT_LIMITS = {
  name: 120,
  phone: 30,
  email: 254,
  carBrand: 80,
  message: 4000,
} as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[\d\s+().-]{7,30}$/;
const controlChars = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

/** @param {string} value */
export function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

/** @param {unknown} value @param {number} max */
function cleanField(value, max) {
  return String(value ?? '')
    .replace(controlChars, '')
    .trim()
    .slice(0, max);
}

/** @param {Record<string, unknown>} body */
export function parseContactForm(body) {
  return {
    name: cleanField(body.name, CONTACT_LIMITS.name),
    phone: cleanField(body.phone, CONTACT_LIMITS.phone),
    email: cleanField(body.email, CONTACT_LIMITS.email),
    carBrand: cleanField(body.carBrand, CONTACT_LIMITS.carBrand),
    message: cleanField(body.message, CONTACT_LIMITS.message),
  };
}

/** @param {ReturnType<typeof parseContactForm>} data */
export function validateContactForm(data) {
  if (!data.name || !data.phone || !data.email || !data.carBrand || !data.message) {
    return { ok: false, error: 'Completa todos los campos obligatorios.' };
  }

  if (!emailPattern.test(data.email)) {
    return { ok: false, error: 'El email no es válido.' };
  }

  if (!phonePattern.test(data.phone)) {
    return { ok: false, error: 'El teléfono no es válido.' };
  }

  return { ok: true };
}

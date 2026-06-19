# Despliegue — Cloudflare Pages

Repositorio: [github.com/escamilaweb/mecanicaseriols](https://github.com/escamilaweb/mecanicaseriols)

Sitio estático Astro en **`dist/`** + **Pages Function** para el formulario (`functions/api/contact.ts`).

## Cloudflare Pages (GitHub)

1. **Workers & Pages** → tu proyecto → **Settings** → **Build**
2. Configuración:

| Campo | Valor |
| --- | --- |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Node.js** | `22` |

3. **No** uses `wrangler deploy` en Pages Git — el deploy es automático tras el build.
4. **Functions:** la carpeta `functions/` se detecta sola (no moverla).
5. **Variables** en Settings → Environment variables:

| Variable | Tipo | Ejemplo |
| --- | --- | --- |
| `RESEND_API_KEY` | Secret | `re_xxxxxxxx` |
| `RESEND_FROM_EMAIL` | Text | `hola@mecanicaseriols.com` (remitente verificado en Resend) |
| `RESEND_TO_EMAIL` | Text | `agenda@mecanicaseriols.com` (donde llegan los mensajes del formulario) |

6. Tras un push a `main`, haz **Retry deployment** si hace falta.

## Comandos locales

```bash
npm install
npm run dev
npm run build
npm run preview
# Probar build + function de contacto:
npm run build && npm run pages:dev
```

## Estructura del build

```
dist/                  ← HTML, CSS, imágenes (_headers incluido)
functions/api/contact.ts  ← POST /api/contact/ (Resend)
```

## PageSpeed / Lighthouse

- `_headers` en `public/` → cache largo para `/_astro/*` e `/images/*`
- Hero responsive (`hero-800.webp`, `hero-1280.webp`) + preload con `imagesrcset`
- Imágenes WebP: `npm run images:optimize:py`
- **Cloudflare → Scrape Shield:** desactiva *Email Address Obfuscation* si PageSpeed marca `email-decode.min.js` (el sitio ya usa `mailto:` explícitos)
- **Web Analytics / Browser Insights:** el beacon de Cloudflare tiene TTL corto; es normal en el informe de caché

## Seguridad (formulario de contacto)

- `RESEND_API_KEY` solo en Cloudflare Secrets — nunca en el cliente ni en el repo
- Validación y límites de longitud en `functions/lib/contact-validation.ts`
- Escape HTML en el correo saliente; errores genéricos al usuario (sin filtrar respuestas de Resend)

## Nota sobre el 404

Si el build apuntaba a `dist/` pero Astro generaba en `dist/client/` (adaptador Workers), Cloudflare devolvía **404 text/plain**.  
Este proyecto usa **build estático puro** → `dist/index.html` en la raíz.

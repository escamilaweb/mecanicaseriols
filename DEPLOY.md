# Despliegue — Cloudflare Workers & Pages

Repositorio: [github.com/escamilaweb/mecanicaseriols](https://github.com/escamilaweb/mecanicaseriols)

Producción: **Cloudflare Workers** (con assets estáticos en `dist/`).  
El adaptador `@astrojs/cloudflare` genera assets en `dist/client/` y el Worker en `dist/server/` (configurado en `wrangler.toml`).

## Cloudflare (GitHub → Workers)

1. En [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Connect to Git**.
2. Repositorio: `escamilaweb/mecanicaseriols`, rama `main`.
3. Configuración de build:

| Campo | Valor |
| --- | --- |
| **Build command** | `npm run build` |
| **Deploy command** | `npx wrangler deploy` |
| **Node.js** | `22` (`.node-version` incluido) |

> Si Cloudflare detecta Astro automáticamente, verifica que el output sea **`dist/`** y que use **Workers** (no el preset antiguo de Pages sin Worker).

4. **Dominio custom:** Workers & Pages → tu proyecto → **Custom domains** → `mecanicaseriols.com`.

## Variables de entorno (formulario de contacto)

Configura en **Settings → Variables and secrets** del Worker:

| Variable | Tipo | Descripción |
| --- | --- | --- |
| `RESEND_API_KEY` | Secret | API key de [Resend](https://resend.com/api-keys) |
| `RESEND_FROM_EMAIL` | Text | Remitente verificado (ej. `agenda@mecanicaseriols.com`) |
| `RESEND_TO_EMAIL` | Text | Bandeja destino (`agenda@mecanicaseriols.com`) |

Localmente, copia `.dev.vars.example` → `.dev.vars` (no se sube a Git).

## Comandos locales

```bash
npm install
npm run dev      # desarrollo con runtime Cloudflare (workerd)
npm run build    # genera dist/ + Worker
npm run preview  # preview local post-build
npm run deploy   # build + wrangler deploy (requiere wrangler login)
```

## Estructura del build

```
dist/client/    ← HTML, CSS, JS e imágenes
dist/server/    ← código del Worker
wrangler.toml   ← main + assets (directory = ./dist/client)
```

La ruta `/api/contact/` corre en el **Worker** (no es estática); el resto de páginas se prerenderizan.

## Migración desde Vercel

- Eliminado `@astrojs/vercel` y `scripts/prepare-static.mjs`.
- Eliminado workflow de GitHub Pages (`.github/workflows/deploy.yml`).
- Ya no existe carpeta `.vercel/` en el proyecto.

# Despliegue en producción — Mecánica Seriols

Repositorio: [github.com/escamilaweb/mecanicaseriols](https://github.com/escamilaweb/mecanicaseriols)

## Producción

| Item | Valor |
| --- | --- |
| Dominio | `https://mecanicaseriols.com` |
| Rama | `main` |
| Node.js | `>= 22.12.0` |

### Cloudflare Pages

| Campo | Valor |
| --- | --- |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js | `22` (`.node-version` incluido) |

El archivo `wrangler.toml` también define `pages_build_output_dir = "dist"`.

## CloudRay

1. Conecta tu servidor en [CloudRay](https://cloudray.io) (Agent o SSH).
2. Crea un script basado en [`deploy/cloudray-build.sh`](deploy/cloudray-build.sh).
3. Define variables Liquid en CloudRay:
   - `website_dir` → ruta del clone, ej. `/var/www/mecanicaseriols`
   - `your_domain` → `mecanicaseriols.com`
   - `caddyfile` → `/etc/caddy/Caddyfile`
4. Clona el repo una vez en el servidor:

```bash
git clone https://github.com/escamilaweb/mecanicaseriols.git /var/www/mecanicaseriols
```

5. Ejecuta el script desde **Runlog** en CloudRay tras cada actualización en `main`.

### Formulario de contacto (importante)

El build estático sirve HTML/CSS/JS. La ruta `/api/contact/` requiere **Node serverless** (Vercel).

Opciones:

- **Vercel (recomendado para el formulario):** conecta el repo en Vercel, añade las variables de `.env.example` y despliega. El adaptador `@astrojs/vercel` ya está configurado.
- **Solo CloudRay + Caddy:** el sitio funciona, pero el formulario de contacto no enviará correos hasta configurar un backend aparte.

## Variables de entorno (formulario)

Copia `.env.example` y configura en tu plataforma:

```
RESEND_API_KEY=re_xxxxxxxx
RESEND_FROM_EMAIL=agenda@mecanicaseriols.com
RESEND_TO_EMAIL=agenda@mecanicaseriols.com
```

## Build manual en el servidor

```bash
cd /var/www/mecanicaseriols
git pull origin main
npm ci
npm run build
# Servir el contenido de dist/ con Caddy, Nginx, Cloudflare Pages, etc.
```

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:4321/](http://localhost:4321/) (sin subcarpeta; `base` es `/`).

Para simular GitHub Pages con subcarpeta:

```bash
ASTRO_BASE=/mecanicaseriols/ npm run dev
```

## GitHub Pages (opcional)

El workflow en `.github/workflows/deploy.yml` quedó en **manual** (`workflow_dispatch`).  
La producción oficial es `mecanicaseriols.com` vía CloudRay o Vercel.

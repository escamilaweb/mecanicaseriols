# Mecánica Seriols

Sitio web para el taller **Mecánica Seriols**, desarrollado con [Astro](https://astro.build) y desplegado en **Cloudflare Workers**.

Repositorio: [github.com/escamilaweb/mecanicaseriols](https://github.com/escamilaweb/mecanicaseriols)

Producción: [https://mecanicaseriols.com](https://mecanicaseriols.com)

## Comandos

| Comando | Acción |
| --- | --- |
| `npm install` | Instala dependencias |
| `npm run dev` | Servidor local (`http://localhost:4321/`) |
| `npm run build` | Build de producción → `dist/` + Worker |
| `npm run preview` | Preview local post-build |
| `npm run deploy` | Build + `wrangler deploy` |

## Despliegue

Ver **[DEPLOY.md](./DEPLOY.md)** para conectar GitHub con Cloudflare Workers/Pages y configurar Resend.

## Estructura

```text
src/
├── components/   # UI (Header, Footer, home, formulario)
├── data/         # Contenido (site, home, faq, gallery)
├── layouts/      # BaseLayout
├── pages/        # Rutas (/, /contacto/, /api/contact/)
└── styles/       # Tailwind global
wrangler.toml     # Cloudflare Worker + assets
```

## Personalización

Edita `src/data/site.ts` y `src/data/home.ts` para contacto, servicios y textos del home.

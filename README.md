# Mecánica Seriols

Sitio web para el taller **Mecánica Seriols**, desarrollado con [Astro](https://astro.build).

Repositorio: [github.com/escamilaweb/mecanicaseriols](https://github.com/escamilaweb/mecanicaseriols)

Producción: [https://mecanicaseriols.com](https://mecanicaseriols.com)

## Comandos

| Comando | Acción |
| --- | --- |
| `npm install` | Instala dependencias |
| `npm run dev` | Servidor local en `http://localhost:4321/` |
| `npm run build` | Build de producción → carpeta `dist/` |
| `npm run build:static` | Alias de `npm run build` |
| `npm run preview` | Previsualiza la build |

## Desarrollo local

```bash
npm install
npm run dev
```

## Despliegue

Ver **[DEPLOY.md](./DEPLOY.md)** para configurar CloudRay, Vercel y variables de entorno del formulario de contacto.

## Estructura

```text
src/
├── components/   # UI (Header, Footer, home, formulario)
├── data/         # Contenido (site, home, faq, gallery)
├── layouts/      # BaseLayout
├── pages/        # Rutas (/, /contacto/, /api/contact/)
└── styles/       # Tailwind global
deploy/           # Script de referencia para CloudRay
scripts/          # Utilidades (webp, prepare-static)
```

## Personalización

Edita `src/data/site.ts` y `src/data/home.ts` para contacto, servicios y textos del home.

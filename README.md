# Mecánica Seriols

Sitio web estático para el taller **Mecánica Seriols**, desarrollado con [Astro](https://astro.build).

Repositorio: [github.com/escamilaweb/mecanicaseriols](https://github.com/escamilaweb/mecanicaseriols)

## Estructura del proyecto

```text
/
├── public/              # Archivos estáticos (favicon, robots.txt, imágenes)
├── src/
│   ├── components/      # Componentes reutilizables (Header, Footer, etc.)
│   ├── data/            # Datos del sitio (contacto, servicios, navegación)
│   ├── layouts/         # Plantillas base de página
│   ├── pages/           # Rutas del sitio (una archivo = una ruta)
│   └── styles/          # Estilos globales
├── astro.config.mjs     # Configuración de Astro
└── package.json
```

## Comandos

| Comando           | Acción                                      |
| ----------------- | ------------------------------------------- |
| `npm install`     | Instala dependencias                        |
| `npm run dev`     | Servidor de desarrollo en `localhost:4321`  |
| `npm run build`   | Genera el sitio estático en `./dist/`       |
| `npm run preview` | Previsualiza la build de producción         |

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:4321/mecanicaseriols/](http://localhost:4321/mecanicaseriols/) en el navegador.

## Personalización

Edita `src/data/site.ts` para actualizar:

- Nombre, descripción y URL del sitio
- Teléfono, email, dirección y horario
- Enlaces de navegación
- Listado de servicios

## Despliegue en GitHub Pages

El workflow en `.github/workflows/deploy.yml` despliega automáticamente al hacer push a `main`.

1. Ve a **Settings → Pages** del repositorio
2. En **Source**, selecciona **GitHub Actions**
3. Tras el primer despliegue, el sitio estará en:  
   [https://escamilaweb.github.io/mecanicaseriols/](https://escamilaweb.github.io/mecanicaseriols/)

## Licencia

Proyecto privado — escamilaweb.

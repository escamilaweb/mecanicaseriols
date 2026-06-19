// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const site = process.env.PUBLIC_SITE_URL ?? 'https://mecanicaseriols.com';
const base = process.env.ASTRO_BASE ?? '/';

// https://astro.build/config
export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  output: 'static',

  integrations: [
    sitemap({
      filter: (page) => !page.includes('/api/'),
    }),
  ],

  build: {
    inlineStylesheets: 'always',
  },

  vite: {
    plugins: [tailwindcss()],
  },
});

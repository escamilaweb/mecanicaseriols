// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

const site = process.env.PUBLIC_SITE_URL ?? 'https://mecanicaseriols.com';
const base = process.env.ASTRO_BASE ?? '/';

// https://astro.build/config
export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  output: 'static',
  adapter: cloudflare({
    prerenderEnvironment: 'node',
    imageService: 'compile',
  }),

  vite: {
    plugins: [tailwindcss()],
  },
});

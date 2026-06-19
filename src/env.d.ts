/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly ASTRO_BASE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

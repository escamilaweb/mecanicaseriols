/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_GOOGLE_SITE_VERIFICATION?: string;
  readonly ASTRO_BASE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

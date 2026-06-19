/// <reference types="@cloudflare/workers-types" />

const PRODUCTION_HOST = 'mecanicaseriols.com';

export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);

  if (url.hostname.endsWith('.pages.dev') && url.hostname !== PRODUCTION_HOST) {
    url.protocol = 'https:';
    url.hostname = PRODUCTION_HOST;
    return Response.redirect(url.toString(), 301);
  }

  return context.next();
};

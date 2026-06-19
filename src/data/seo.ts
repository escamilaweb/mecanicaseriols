import { site } from './site';

export const seo = {
  defaultTitle: 'Mecánica Seriols | Taller mecánico en Cuautitlán Izcalli',
  ogImagePath: '/images/hero-og.jpg',
  ogImageWidth: 1200,
  ogImageHeight: 704,
  ogImageAlt: 'Taller Mecánica Seriols, mecánica automotriz en Cuautitlán Izcalli',
  locale: 'es_MX',
  keywords:
    'mecánica automotriz, taller mecánico, Cuautitlán Izcalli, diagnóstico automotriz, reparación de autos, vehículos híbridos, mantenimiento automotriz, Estado de México',
  geo: {
    region: 'MX-MEX',
    placename: 'Cuautitlán Izcalli, Estado de México',
    latitude: 19.6542,
    longitude: -99.2103,
  },
} as const;

export function absoluteUrl(path: string, baseUrl: string = site.url) {
  const normalizedBase = baseUrl.replace(/\/$/, '');
  if (path.startsWith('http')) return path;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

export function pageCanonical(pathname: string, baseUrl: string = site.url) {
  const normalizedBase = baseUrl.replace(/\/$/, '');
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return `${normalizedBase}${path === '//' ? '/' : path}`;
}

function phoneE164(phone: string) {
  const digits = phone.replace(/\D/g, '');
  return digits.startsWith('52') ? `+${digits}` : `+52${digits}`;
}

export function localBusinessJsonLd(baseUrl: string = site.url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    '@id': `${absoluteUrl('/', baseUrl)}#business`,
    name: site.name,
    description: site.description,
    url: absoluteUrl('/', baseUrl),
    image: absoluteUrl(seo.ogImagePath, baseUrl),
    logo: absoluteUrl('/images/Seriols-logo.webp', baseUrl),
    telephone: phoneE164(site.phone),
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Tlatlaya 13A Centro Urbano',
      addressLocality: 'Cuautitlán Izcalli',
      addressRegion: 'Estado de México',
      postalCode: '54700',
      addressCountry: 'MX',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: seo.geo.latitude,
      longitude: seo.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    areaServed: [
      {
        '@type': 'City',
        name: 'Cuautitlán Izcalli',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Estado de México',
      },
    ],
    sameAs: [site.social.facebook.url, site.social.instagram.url],
    priceRange: '$$',
  };
}

export function websiteJsonLd(baseUrl: string = site.url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${absoluteUrl('/', baseUrl)}#website`,
    url: absoluteUrl('/', baseUrl),
    name: site.name,
    description: site.description,
    inLanguage: site.lang,
    publisher: {
      '@id': `${absoluteUrl('/', baseUrl)}#business`,
    },
  };
}

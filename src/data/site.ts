export const siteLocation = {
  streetAddress: 'Tlatlaya 9, Centro Urbano',
  postalCode: '54750',
  addressLocality: 'Cuautitlán Izcalli',
  addressRegion: 'Estado de México',
  addressCountry: 'MX',
  latitude: 19.6610448,
  longitude: -99.2091401,
} as const;

export function formatSiteAddress(location: typeof siteLocation = siteLocation) {
  return `${location.streetAddress}, ${location.postalCode} ${location.addressLocality}, Méx.`;
}

export const mapsProfileUrl = 'https://maps.app.goo.gl/XFer48GDxphWEQxWA';

export const site = {
  name: 'Mecánica Seriols',
  description:
    'Ingenieros mecánicos especializados en diagnóstico, mantenimiento y reparación de vehículos de combustión e híbridos.',
  url: 'https://mecanicaseriols.com',
  lang: 'es',
  phone: '55 1654 6463',
  phoneOffice: '55 5868 6652',
  whatsapp: '55 7837 3063',
  email: 'agenda@mecanicaseriols.com',
  location: siteLocation,
  address: formatSiteAddress(siteLocation),
  schedule: 'Lunes a Viernes: 8:00 – 18:00',
  social: {
    facebook: {
      handle: '@mecanicaseriols',
      url: 'https://www.facebook.com/mecanicaseriols',
    },
    instagram: {
      handle: '@mecanicaseriols',
      url: 'https://www.instagram.com/mecanicaseriols/',
    },
  },
} as const;

export function mapsDirectionsUrl(_address: string = site.address) {
  return mapsProfileUrl;
}

export function mapsPlaceUrl(_address: string = site.address) {
  return mapsProfileUrl;
}

export function mapsEmbedUrl(_address: string = site.address) {
  const { latitude, longitude } = site.location;
  return `https://maps.google.com/maps?q=${latitude},${longitude}&z=17&output=embed`;
}

export const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/#servicios', label: 'Servicios' },
  { href: '/#empresas', label: 'Empresas' },
  { href: '/contacto', label: 'Contacto' },
] as const;

export function navHref(href: string, base: string) {
  const hashIndex = href.indexOf('#');
  if (hashIndex !== -1) {
    const path = href.slice(0, hashIndex);
    const hash = href.slice(hashIndex);
    if (path === '' || path === '/') return `${base}${hash}`;
    return `${base}${path.slice(1)}/${hash}`;
  }
  if (href === '/') return base;
  return `${base}${href.slice(1)}/`;
}

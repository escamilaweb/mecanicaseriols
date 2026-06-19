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
  address: 'Tlatlaya 13A Centro Urbano, 54700 Cuautitlán Izcalli, Estado de México',
  schedule: 'Lunes a Viernes: 8:00 – 18:00',
  social: {
    facebook: {
      handle: '@mecanicosseriols',
      url: 'https://www.facebook.com/mecanicosseriols',
    },
    instagram: {
      handle: '@mecanicosseriols',
      url: 'https://www.instagram.com/mecanicosseriols',
    },
  },
} as const;

export function mapsDirectionsUrl(address: string = site.address) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
}

export function mapsEmbedUrl(address: string = site.address) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
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

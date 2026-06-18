export const site = {
  name: 'Mecánica Seriols',
  description: 'Taller mecánico de confianza. Reparación, mantenimiento y diagnóstico de vehículos.',
  url: 'https://escamilaweb.github.io/mecanicaseriols',
  lang: 'es',
  phone: '+34 000 000 000',
  email: 'info@mecanicaseriols.com',
  address: 'Dirección del taller, Ciudad',
  schedule: 'Lunes a Viernes: 8:00 – 18:00',
} as const;

export const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/contacto', label: 'Contacto' },
] as const;

export const services = [
  {
    title: 'Mantenimiento',
    description: 'Revisiones periódicas, cambio de aceite, filtros y puesta a punto general.',
    icon: '🔧',
  },
  {
    title: 'Reparación mecánica',
    description: 'Motor, transmisión, frenos, suspensión y sistemas auxiliares.',
    icon: '⚙️',
  },
  {
    title: 'Diagnóstico electrónico',
    description: 'Lectura de averías, centralitas y sistemas de gestión del motor.',
    icon: '💻',
  },
  {
    title: 'Pre-ITV',
    description: 'Revisión previa para asegurar que tu vehículo pasa la inspección.',
    icon: '✅',
  },
] as const;

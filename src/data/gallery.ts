const base = 'images/gallery';

export const gallerySections = {
  catalog: {
    alt: 'Diagnóstico y reparación automotriz en Mecánica Seriols',
    images: [
      `${base}/gallery-seriols (12).webp`,
      `${base}/gallery-seriols (36).webp`,
      `${base}/gallery-seriols (55).webp`,
    ],
  },
  special: {
    alt: 'Atención personalizada en Mecánica Seriols',
    images: [
      `${base}/gallery-seriols (62).webp`,
      `${base}/gallery-seriols (40).webp`,
      `${base}/gallery-seriols (30).webp`,
    ],
  },
} as const;

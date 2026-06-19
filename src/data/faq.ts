import { site } from './site';

export const faq = {
  title: 'Preguntas frecuentes',
  subtitle:
    'Resolvemos las dudas más comunes sobre diagnóstico, reparación y mantenimiento automotriz en Mecánica Seriols, Cuautitlán Izcalli.',
  items: [
    {
      question: '¿Qué marcas y tipos de vehículos reparan en Mecánica Seriols?',
      answer: `En Mecánica Seriols atendemos vehículos de combustión e híbridos de múltiples marcas — entre ellas Toyota, Nissan, Honda, Volkswagen, Ford, Chevrolet, BMW, Mercedes-Benz y muchas más. Somos ingenieros mecánicos egresados del IPN y realizamos diagnóstico, mantenimiento y reparación de motor, frenos, suspensión, transmisión, sistemas eléctricos y electrónicos. Si no encuentras tu marca, contáctanos al ${site.phone} o escribe a ${site.email} y confirmamos la atención para tu unidad.`,
    },
    {
      question: '¿Dónde está el taller y cómo puedo agendar una cita?',
      answer: `Nuestro taller está en ${site.address}. Horario de atención: ${site.schedule}. Puedes agendar por teléfono al ${site.phone}, oficina ${site.phoneOffice}, WhatsApp ${site.whatsapp} o correo ${site.email}. Contamos con citas programadas para optimizar tiempos de atención y, según el tipo de falla, procuramos entregar tu vehículo el mismo día.`,
    },
    {
      question: '¿Ofrecen garantía en las reparaciones y mantenimientos?',
      answer:
        'Sí. Todos nuestros trabajos están respaldados con garantía por escrito de 15 a 30 días, según el tipo de servicio. Antes de cualquier reparación entregamos un presupuesto claro desde la etapa de diagnóstico, sin cargos ocultos. Nuestro compromiso es que tu vehículo regrese a la carretera con seguridad, rendimiento y total transparencia en el proceso.',
    },
    {
      question: '¿Atienden flotillas empresariales o con servicio a domicilio?',
      answer:
        'Sí. Ofrecemos atención a flotillas comerciales con reportes claros, tiempos pactados y un solo punto de contacto, además de servicio a domicilio para particulares y empresas en Cuautitlán Izcalli y zona metropolitana. Hemos trabajado con clientes corporativos como Alpura, Gatorade, Vulcafrio y dependencias gubernamentales. Solicita cotización para tu empresa desde nuestra sección de contacto.',
    },
  ],
} as const;

export function faqJsonLd(baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.items.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
    url: `${baseUrl.replace(/\/$/, '')}/`,
  };
}

import { site } from './site';

export const privacy = {
  legalName: 'IVAN JOSÉ SERIOL LINARES',
  tradeName: 'MECÁNICA SERIOLS',
  fiscalAddress: 'calle Tlatlaya 13A 54700 Centro Urbano, 54700 Cuautitlán Izcalli',
  commercialAddress: 'Tlatlaya 9, Centro Urbano, Cuautitlán Izcalli 54700 Estado de México',
  region: 'Estado de México',
  country: 'México',
  lastUpdated: '20/06/2026',
  arcoDepartment: 'Información a clientes',
  path: '/aviso-de-privacidad',
  sections: [
    { id: 'fines', label: 'Finalidades' },
    { id: 'datos', label: 'Datos que recabamos' },
    { id: 'arco', label: 'Derechos ARCO' },
    { id: 'revocacion', label: 'Revocación' },
    { id: 'limitacion', label: 'Limitación' },
    { id: 'cambios', label: 'Actualizaciones' },
  ],
  secondaryPurposes: [
    'Los fines por los que se requiere la información personal es para indicar que en este acto usted, de manera voluntaria consiente a MECÁNICA SERIOLS el trato de su información personal.',
    'De celebrar algún servicio de mecánica automotriz con MECÁNICA SERIOLS y para efecto de cumplir con todas las obligaciones que de ahí se desprenden.',
    'Persona física o persona moral que recaba y conserva los datos personales como titular, para procesar su alta como cliente, proveedor, o cualquier tipo de relación comercial.',
    'Para celebrar algún convenio de confidencialidad o contrato por prestación de servicios con MECÁNICA SERIOLS.',
    'Para realizar y recibir o revisar cotizaciones, propuestas económicas, licitaciones, ampliar, modificar, anexar o realizar cambios a la información de cotizaciones, contratos o convenios.',
    'Los datos personales que obtengamos serán tratados de manera confidencial por MECÁNICA SERIOLS, para efecto de cumplir con todos los servicios que se desprenden en relación de los servicios publicitarios que desarrolla, administra y ofrece MECÁNICA SERIOLS.',
  ],
  personalData:
    'Nombre, Registro Federal de Contribuyentes (RFC), domicilio, teléfono particular, teléfono celular, correo electrónico, información fiscal, y toda información que sea necesaria para que MECÁNICA SERIOLS pueda realizar la prestación de los servicios, bajo consentimiento del Titular.',
} as const;

export const privacyMailto = `mailto:${site.email}`;
export const privacyPageUrl = `${site.url}${privacy.path}/`;

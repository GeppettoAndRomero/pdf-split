import type { ToolContent } from './types';

// Español.

export const es: ToolContent = {
  htmlLang: 'es',

  meta: {
    title: 'Dividir un PDF — Extrae páginas en tu navegador, sin subir nada | runlocally',
    description:
      'Divide un PDF o extrae rangos de páginas en un PDF nuevo, dentro de tu navegador. El archivo se lee en tu dispositivo y nunca se sube. Código abierto (MIT), funciona sin conexión.',
    ogTitle: 'Dividir un PDF — Extrae páginas en tu navegador, sin subir nada',
    ogDescription:
      'Extrae rangos de páginas de un PDF en un archivo nuevo, dentro de tu navegador. No se sube nada. Código abierto, funciona sin conexión.',
  },

  hero: {
    h1: 'Dividir un PDF',
    tagline:
      'Extrae rangos de páginas de un PDF en un archivo nuevo, dentro de tu navegador. No se sube nada.',
  },

  intro: {
    h2: 'Divide un PDF, dentro de tu navegador',
    paras: [
      'Suelta un PDF y esta herramienta te muestra cuántas páginas tiene. Escribe las páginas que quieres —por ejemplo 1-3, 5, 8-10— y copia exactamente esas páginas en un PDF nuevo que puedes descargar. El archivo original queda intacto.',
      'Todo se ejecuta en el navegador con pdf-lib. Las páginas se copian tal cual: nada se comprime, se vuelve a generar, se pasa por OCR ni se convierte, así que el resultado se abre en cualquier lector de PDF normal y se ve igual que el original.',
    ],
  },

  privacy: {
    h2: 'Por qué tu archivo se queda en tu dispositivo',
    lead: 'Aquí la privacidad es estructural, no una promesa. No hay paso de subida porque no hay ningún servidor al que subir nada:',
    points: [
      'La división se ejecuta por completo en tu navegador.',
      'La página se sirve como archivos estáticos y no hace ninguna petición con tu PDF.',
      'El código es abierto y cualquiera puede leerlo (MIT).',
      'Funciona sin conexión, algo que solo es posible porque nada sale del dispositivo.',
    ],
    note: 'Si quieres comprobarlo por tu cuenta, abre el panel de Red de tu navegador mientras extraes páginas: ninguna petición lleva tu archivo.',
    sourceLinkText: 'Lee el código fuente.',
  },

  howto: {
    h2: 'Cómo se usa',
    steps: [
      {
        h3: 'Elige un PDF',
        p: 'Haz clic para seleccionar un PDF, o suéltalo en cualquier punto de la página. El número de páginas aparece en cuanto se carga.',
      },
      {
        h3: 'Escribe las páginas',
        p: 'Indica un rango con base 1, como 1-3, 5, 8-10. La página 1 es la primera; el campo viene ya rellenado con el documento completo.',
      },
      {
        h3: 'Extrae y descarga',
        p: 'Las páginas elegidas se copian en un PDF nuevo que se descarga de forma automática. Tu archivo original no cambia.',
      },
    ],
  },

  faqHeading: 'Preguntas frecuentes',
  faq: [
    {
      q: '¿Se sube mi PDF a algún sitio?',
      a: 'No. La división se ejecuta por completo en tu navegador. No hay componente de servidor, así que tu archivo no tiene por dónde salir del dispositivo. El código es abierto y puedes confirmarlo en el panel de Red de tu navegador.',
    },
    {
      q: '¿Cómo indico qué páginas extraer?',
      a: 'Escribe un rango con base 1 como 1-3, 5, 8-10. La página 1 es la primera. Puedes combinar páginas sueltas y rangos separados por comas; los duplicados y el orden se resuelven por ti: el PDF nuevo mantiene las páginas en orden ascendente.',
    },
    {
      q: '¿Modifica el archivo original?',
      a: 'No. Las páginas elegidas se copian en un PDF totalmente nuevo que descargas. El PDF que soltaste nunca se modifica.',
    },
    {
      q: '¿Dividir reduce la calidad o altera las páginas?',
      a: 'No. Copia las páginas seleccionadas tal cual: sin compresión, sin OCR, sin conversión. El texto, las imágenes y la maquetación son iguales que en el original, y el resultado se abre en cualquier lector de PDF normal.',
    },
    {
      q: '¿Puede abrir un PDF protegido con contraseña?',
      a: 'No. Los PDF cifrados (protegidos con contraseña) no se pueden abrir, y verás un mensaje claro que lo indica. Quita primero la contraseña en un lector de confianza y luego divide el archivo aquí.',
    },
    {
      q: '¿Funciona sin conexión?',
      a: 'Sí. Es una PWA. Tras la primera visita queda en caché, así que la división funciona sin conexión a la red. También puedes instalarla en tu pantalla de inicio.',
    },
  ],

  footer: {
    openSourceLabel: 'Código abierto (MIT)',
    partOf: 'parte de',
    brandTail: '— herramientas pequeñas que se ejecutan localmente en tu dispositivo.',
    colophon:
      'Creado y mantenido por Geppetto. Parte del código se escribe con ayuda de IA; toda la revisión y las decisiones son del responsable del proyecto.',
    securityText: 'Seguridad',
  },
};

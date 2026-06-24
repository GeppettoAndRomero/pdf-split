import type { ToolContent } from './types';

// pdf-split. English source content.

export const en: ToolContent = {
  htmlLang: 'en',

  meta: {
    title: 'Split a PDF — Extract Pages in Your Browser, No Upload | runlocally',
    description:
      'Split a PDF or extract page ranges into a new PDF, right in your browser. The file is read on your device and never uploaded. Open source (MIT), works offline.',
    ogTitle: 'Split a PDF — Extract Pages in Your Browser, No Upload',
    ogDescription:
      'Extract page ranges from a PDF into a new file, in your browser. Nothing is uploaded. Open source, works offline.',
  },

  hero: {
    h1: 'Split a PDF',
    tagline:
      'Extract page ranges from a PDF into a new file — in your browser. Nothing is uploaded.',
  },

  intro: {
    h2: 'Split a PDF, in your browser',
    paras: [
      'Drop one PDF and this tool shows how many pages it has. Type the pages you want — for example 1-3, 5, 8-10 — and it copies exactly those pages into a new PDF you can download. The original file is left untouched.',
      'Everything runs in the browser with pdf-lib. The pages are copied as-is: nothing is compressed, re-rendered, OCR\'d, or converted, so the output opens in any normal PDF reader and looks just like the source.',
    ],
  },

  privacy: {
    h2: 'Why your file stays on your device',
    lead: 'Privacy here is structural, not a promise. There is no upload step because there is no server to upload to:',
    points: [
      'The split runs entirely in your browser.',
      'The page is served as static files and makes no request with your PDF.',
      'The source is open and anyone can read it (MIT).',
      'It works offline, which is only possible because nothing leaves the device.',
    ],
    note: 'If you want to check for yourself, open your browser\'s Network panel while extracting — no request carries your file.',
    sourceLinkText: 'Read the source.',
  },

  howto: {
    h2: 'How to use it',
    steps: [
      {
        h3: 'Choose a PDF',
        p: 'Click to select a PDF, or drop it anywhere on the page. The page count appears once it loads.',
      },
      {
        h3: 'Type the pages',
        p: 'Enter a 1-based range like 1-3, 5, 8-10. Page 1 is the first page; the box starts filled with the whole document.',
      },
      {
        h3: 'Extract and download',
        p: 'The chosen pages are copied into a new PDF that downloads automatically. Your original file is unchanged.',
      },
    ],
  },

  faqHeading: 'FAQ',
  faq: [
    {
      q: 'Is my PDF uploaded anywhere?',
      a: 'No. The split runs entirely in your browser. There is no server component, so your file has no path off your device. The source is open and you can confirm this in your browser\'s Network panel.',
    },
    {
      q: 'How do I specify which pages to extract?',
      a: 'Type a 1-based range such as 1-3, 5, 8-10. Page 1 is the first page. Single pages and ranges can be mixed, separated by commas, and duplicates and order are handled for you — the new PDF keeps the pages in ascending order.',
    },
    {
      q: 'Does it change the original file?',
      a: 'No. The chosen pages are copied into a brand-new PDF that you download. The PDF you dropped in is never modified.',
    },
    {
      q: 'Does splitting reduce quality or change the pages?',
      a: 'No. It copies the selected pages exactly — no compression, no OCR, no conversion. Text, images and layout are the same as the source, and the output opens in any normal PDF reader.',
    },
    {
      q: 'Can it open a password-protected PDF?',
      a: 'No. Encrypted (password-protected) PDFs can\'t be opened, and you\'ll get a clear message saying so. Remove the password in a reader you trust first, then split the file here.',
    },
    {
      q: 'Does it work offline?',
      a: 'Yes. It is a PWA. After the first visit it is cached, so splitting works without a network connection. You can also install it to your home screen.',
    },
  ],

  footer: {
    openSourceLabel: 'Open source (MIT)',
    partOf: 'part of',
    brandTail: '— small tools that run locally on your device.',
    colophon:
      'Built and maintained by Geppetto. Some code is written with AI assistance; all review and decisions are the maintainer\'s.',
    securityText: 'Security',
  },
};

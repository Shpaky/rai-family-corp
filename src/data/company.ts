/*
  Facts about the pavilion that still need confirmation from the Russian Export
  Center ("подтвердить у РЭЦ"). The visible strings in src/i18n/ui.ts are
  literals for now; if any value here changes, update the strings listed in the
  pull request that introduced them (meta.description, trust.*, pavilion.*,
  about.paragraphs, footer.operator).
*/
export const company = {
  /** Registered name; the site name "Rai Family Corp" stays in ui.ts. */
  legalName: 'Rai Family Corp LLP',
  /** LLP identification number per the MCA register. */
  llpin: 'ACJ-0911',
  /** Date of incorporation per the register; also foundingDate in JSON-LD. */
  registeredOn: '2024-08-23',
  registrar: 'RoC Mumbai',
  /** GST registration number (Form GST REG-06, Maharashtra); taxID in JSON-LD. */
  gstin: '27ABJFR7716C1Z3',
  /** Importer-Exporter Code (DGFT certificate of 21.12.2024, address amended 08.01.2026). */
  iec: 'ABJFR7716C',
  /** Published company documents under public/docs/company/ (base-aware via documentHref). */
  documents: {
    /** Form GST REG-06 with annexures A and B, amended 20.01.2026; published in full by the company's decision (2026-09-26). */
    gst: '/docs/company/GST-Registration-Certificate-en.pdf',
    /** DGFT Importer-Exporter Code certificate, address amended 08.01.2026; published as is by the company's decision (2026-09-26). */
    iec: '/docs/company/IEC-Certificate-en.pdf',
  },
  /** Jurisdiction, shown as a value on /about/ (readable, so per locale). */
  jurisdiction: { en: 'India, Maharashtra', ru: 'Индия, Махараштра' },
  /** Registered office per the register; the operator's contact address is in contacts.ts. */
  registeredOffice: {
    street: 'Office No 1307/1308, 13th Floor, NMS Titanium, Plot No 74, Sector-15, CBD Belapur',
    locality: 'Navi Mumbai',
    region: 'Maharashtra',
    postalCode: '400614',
    country: 'IN',
  },
  /** Public pages that confirm the status; shown on /about/ (programme) and listed as relatedLink in its JSON-LD. */
  proofLinks: {
    recProgramme:
      'https://www.exportcenter.ru/services/prodvizhenie-na-vneshnie-rynki/exhibitions-business-missions/rossiyskie_natsionalnye_pavilony_za_rubezhom/',
    recMumbai: 'https://www.exportcenter.ru/contacts/world/mumbai/',
    openingAnnouncement: 'https://t.me/rusexportnews/15233',
    openingPost: 'https://t.me/rusexportnews/15340',
  },
  /** Opening date of the Made in Russia National Pavilion in Navi Mumbai. Подтвердить у РЭЦ. */
  pavilionOpened: '2026-08-21',
  /** Whether it is the first pavilion of the programme in India. Подтвердить у РЭЦ. */
  firstInIndia: true,
  /** Official English name of the pavilion. Подтвердить у РЭЦ. */
  officialPavilionName: '«Made in Russia» National Pavilion',
  /** Russian companies present in the pavilion. Open sources, checked 2026-09-14; update the date when the number changes. */
  pavilionResidents: 52,
  pavilionResidentsCheckedOn: '2026-09-14',
  /** B2C online store run by the company; English only, so the link does not take a locale. */
  store: { name: 'The Rus Store', url: 'https://therusstore.com/' },
} as const;

/** "Office No …, CBD Belapur, Navi Mumbai 400614" for the details list. */
export const registeredOfficeLine = () => {
  const o = company.registeredOffice;
  return `${o.street}, ${o.locality} ${o.postalCode}`;
};

/** schema.org PostalAddress of the registered office. */
export const postalAddress = () => {
  const o = company.registeredOffice;
  return {
    '@type': 'PostalAddress',
    streetAddress: o.street,
    addressLocality: o.locality,
    addressRegion: o.region,
    postalCode: o.postalCode,
    addressCountry: o.country,
  };
};

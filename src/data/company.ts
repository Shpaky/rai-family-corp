/*
  Company and pavilion data. Opening date and first-in-programme status in
  India were verified on 2026-10-14; see proofLinks and
  PayloadForCodex/Pavilion/pavilion-facts-verification.md.
  The English name was approved by the client on 2026-10-14 using REC terminology;
  see proofLinks.recPavilionsPresentation (pages 1, 3 and 7).
  Visible pavilion strings are separate literals in src/i18n/ui.ts and
  src/content/directions/matkevich-lavage.json; changing fields here does
  not update them automatically. Opening does not date operator authority.
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
    /** Form GST REG-06 amended 20.01.2026: certificate and annexure A (places of business); annexure B with designated partners is not published (company's decision, 2026-09-26). */
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
  /** Public sources about the programme, pavilion, operator and opening; listed as relatedLink on /about/. Publication dates and scope differ by source. */
  proofLinks: {
    recProgramme:
      'https://www.exportcenter.ru/services/prodvizhenie-na-vneshnie-rynki/exhibitions-business-missions/rossiyskie_natsionalnye_pavilony_za_rubezhom/',
    /** REC English presentation: plural on page 1, brand on page 3, singular on page 7. Checked 2026-10-14. */
    recPavilionsPresentation:
      'https://www.exportcenter.ru/upload/rossiyskie-natsionalnye-pavilony/%D0%A0%D0%9D%D0%9F_%D0%BE%D0%BF%D0%B5%D1%80%D0%B0%D1%82%D0%BE%D1%80%D1%8B_new(en).pdf',
    recMumbai: 'https://www.exportcenter.ru/contacts/world/mumbai/',
    openingAnnouncement: 'https://t.me/rusexportnews/15233',
    /** Opening report, post 15340: 2026-08-21T14:02:29Z; read in the public feed. Checked 2026-10-14. */
    openingPost: 'https://t.me/rusexportnews/15340',
    /** REC announcement published 2026-08-12; scheduled opening 2026-08-21. Checked 2026-10-14. */
    openingAnnouncementRec:
      'https://www.exportcenter.ru/press_center/rets-otkroet-v-indii-pervyy-natsionalnyy-pavilon-sdelano-v-rossii/',
    /** REC pavilion page; publication date unavailable. Checked 2026-10-14. */
    pavilionIndia: 'https://www.exportcenter.ru/pavilions/india/pavilions/',
  },
  /** Opening date, supported jointly by proofLinks.openingAnnouncementRec and proofLinks.openingPost; checked 2026-10-14. Not the start date of operator authority. */
  pavilionOpened: '2026-08-21',
  /** First permanent national pavilion of REC's Made in Russia programme in India; supported by the announcement and opening report, checked 2026-10-14. */
  firstInIndia: true,
  /** Client-approved English name, 2026-10-14, based on REC terminology in recPavilionsPresentation. Made in Russia is the programme brand. */
  officialPavilionName: 'Russian National Pavilion',
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

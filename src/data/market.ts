/*
  Market figures of the /manufacturers/ page intro ("India is closer than it
  looks"). The only place where market numbers live: every figure carries its
  source, the year (or financial year) it refers to and the URL it was checked
  against. The URL is not rendered; it is kept for the yearly refresh (April,
  see TODO.md). The numbers age: do not copy them into ui.ts, components or
  other data modules.
*/
import type { Locale } from '../i18n/config';

export interface MarketSource {
  /** Short name of the publisher as shown under the figure. */
  source: string;
  /** Year or financial year the figure refers to, as a string. */
  asOf: string;
  /** Where the figure was checked; not rendered. */
  url: string;
}

export interface MarketTile extends MarketSource {
  /** The figure itself, as text (no counters, no formatting in markup). */
  value: string;
  /** What the figure counts; continues the value in one phrase. */
  label: string;
}

export interface Market {
  /** Four tiles under the page lead, in this order. */
  tiles: MarketTile[];
  /** One sentence under the tiles; its figures name the source and year inline. */
  after: { text: string; sources: MarketSource[] };
}

const UN_WPP = 'https://population.un.org/wpp/';
const IMF_WEO = 'https://www.imf.org/en/Publications/WEO';
const MOC_TRADE = 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2252272';
const IAMAI = 'https://www.iamai.in/';
const PRICE_MIDDLE_CLASS = 'https://price360.in/Executive_Summary_Middle_Class.pdf';

export const market: Record<Locale, Market> = {
  en: {
    tiles: [
      {
        value: '1.46 bn',
        label: 'people: the most populous country in the world',
        source: 'UN',
        asOf: '2025',
        url: UN_WPP,
      },
      {
        value: '4th',
        label: 'largest economy by GDP, ahead of Japan since 2025',
        source: 'IMF',
        asOf: '2025',
        url: IMF_WEO,
      },
      {
        value: '$775 bn',
        label: 'of merchandise imports a year',
        source: 'Ministry of Commerce',
        asOf: 'FY 2025-26',
        url: MOC_TRADE,
      },
      {
        value: '958 m',
        label: 'internet users, 230 m of them shop online',
        source: 'IAMAI and Kantar',
        asOf: '2025',
        url: IAMAI,
      },
    ],
    after: {
      text: 'A young country with a growing middle class: median age 29 (UN, 2024); 715 million people in the middle class by 2031, as projected by PRICE.',
      sources: [
        { source: 'UN', asOf: '2024', url: UN_WPP },
        { source: 'PRICE', asOf: '2021', url: PRICE_MIDDLE_CLASS },
      ],
    },
  },
  ru: {
    tiles: [
      {
        value: '1,46 млрд',
        label: 'человек: самая населённая страна мира',
        source: 'ООН',
        asOf: '2025',
        url: UN_WPP,
      },
      {
        value: '4-я',
        label: 'экономика мира по ВВП, обогнала Японию в 2025',
        source: 'МВФ',
        asOf: '2025',
        url: IMF_WEO,
      },
      {
        value: '775 млрд $',
        label: 'товарного импорта за год',
        source: 'Минкоммерции Индии',
        asOf: '2025/26',
        url: MOC_TRADE,
      },
      {
        value: '958 млн',
        label: 'интернет-пользователей, 230 млн из них покупают онлайн',
        source: 'IAMAI и Kantar',
        asOf: '2025',
        url: IAMAI,
      },
    ],
    after: {
      text: 'Молодая страна с растущим средним классом: медианный возраст 29 лет (ООН, 2024); к 2031 году в среднем классе будет 715 млн человек по прогнозу PRICE.',
      sources: [
        { source: 'ООН', asOf: '2024', url: UN_WPP },
        { source: 'PRICE', asOf: '2021', url: PRICE_MIDDLE_CLASS },
      ],
    },
  },
};

// Build-time validation: a figure without a source, a year or a URL fails `npm run build`.
for (const [locale, data] of Object.entries(market)) {
  if (data.tiles.length !== 4)
    throw new Error(`market.${locale}: expected 4 tiles, got ${data.tiles.length}`);
  const all: MarketSource[] = [...data.tiles, ...data.after.sources];
  for (const item of all) {
    if (!item.source || !item.asOf || !/^https:\/\//.test(item.url))
      throw new Error(`market.${locale}: every figure needs source, asOf and an https URL`);
  }
}

import type { Locale } from '../i18n/config';
import type { AudienceKey } from '../i18n/ui';

/** Show the row of category tiles in the home Directions block. Включить при пяти и более категориях. */
export const SHOW_CATEGORY_TILES = false;

/*
  Home page composition. The only place where the order of sections and of
  audience cards is defined; index.astro, the menus and Audiences.astro read it.
  Hero is always first and is not listed. The order differs per locale: the
  Audiences section works as a table of contents for the three sections below
  it, so its cards follow the same order, and the locale's primary reader comes
  first (EN: Indian buyers, RU: Russian manufacturers).
*/
export type HomeSectionKey =
  'audiences' | 'directions' | 'services' | 'pavilion' | 'about' | 'contacts';

/** Section background; alternation is decided here, not inside the sections. */
export type SectionTone = 'white' | 'surface';

export interface HomeSection {
  key: HomeSectionKey;
  tone: SectionTone;
}

export const HOME_SECTIONS: Record<Locale, HomeSection[]> = {
  en: [
    { key: 'audiences', tone: 'white' },
    { key: 'directions', tone: 'surface' },
    { key: 'services', tone: 'white' },
    { key: 'pavilion', tone: 'surface' },
    { key: 'about', tone: 'white' },
    { key: 'contacts', tone: 'white' }, // Contacts is dark and ignores tone
  ],
  ru: [
    { key: 'audiences', tone: 'white' },
    { key: 'services', tone: 'surface' },
    { key: 'directions', tone: 'white' },
    { key: 'pavilion', tone: 'surface' },
    { key: 'about', tone: 'white' },
    { key: 'contacts', tone: 'white' },
  ],
};

export const AUDIENCE_ORDER: Record<Locale, AudienceKey[]> = {
  en: ['distributors', 'manufacturers', 'institutions', 'consumers'],
  ru: ['manufacturers', 'distributors', 'institutions', 'consumers'],
};

// Build-time validation: a broken config fails `npm run build`, not the eye.
const SECTION_KEYS: HomeSectionKey[] = [
  'audiences',
  'directions',
  'services',
  'pavilion',
  'about',
  'contacts',
];
const AUDIENCE_KEYS: AudienceKey[] = ['manufacturers', 'distributors', 'institutions', 'consumers'];
const sameSet = (a: string[], b: string[]) =>
  a.length === b.length && [...a].sort().join() === [...b].sort().join();

for (const [locale, sections] of Object.entries(HOME_SECTIONS)) {
  const keys = sections.map((s) => s.key);
  if (!sameSet(keys, SECTION_KEYS)) {
    throw new Error(
      `HOME_SECTIONS.${locale}: expected each of ${SECTION_KEYS.join(', ')} exactly once, got ${keys.join(', ')}`,
    );
  }
  if (keys.at(-1) !== 'contacts') throw new Error(`HOME_SECTIONS.${locale}: contacts must be last`);
}
for (const [locale, order] of Object.entries(AUDIENCE_ORDER)) {
  if (!sameSet(order, AUDIENCE_KEYS)) {
    throw new Error(
      `AUDIENCE_ORDER.${locale}: expected each of ${AUDIENCE_KEYS.join(', ')} exactly once, got ${order.join(', ')}`,
    );
  }
}

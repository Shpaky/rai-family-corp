import type { Locale } from '../i18n/config';
import type { AudienceKey } from '../i18n/ui';

/** Row of category tiles in the home Directions block. Включён с пятой категорией (electronics, 2026-09-24). */
export const SHOW_CATEGORY_TILES = true;

/*
  Home page composition. The only place where the order of sections and of
  audience cards is defined; index.astro, the menus and Audiences.astro read it.
  Backgrounds are not configured here: index.astro derives them from position.
  Hero is always first and is not listed. The order differs per locale: the
  Audiences section works as a table of contents for the three sections below
  it, so its cards follow the same order, and the locale's primary reader comes
  first (EN: Indian buyers, RU: Russian manufacturers).
*/
export type HomeSectionKey =
  'audiences' | 'directions' | 'services' | 'pavilion' | 'about' | 'contacts';

export const HOME_SECTIONS: Record<Locale, HomeSectionKey[]> = {
  en: ['audiences', 'directions', 'services', 'pavilion', 'about', 'contacts'],
  ru: ['audiences', 'services', 'directions', 'pavilion', 'about', 'contacts'],
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

for (const [locale, keys] of Object.entries(HOME_SECTIONS)) {
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

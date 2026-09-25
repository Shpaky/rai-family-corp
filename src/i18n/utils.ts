import { getRelativeLocaleUrl } from 'astro:i18n';
import { DEFAULT_LOCALE, LOCALES, isLocale, type Locale } from './config';
import { ui } from './ui';
import { HOME_SECTIONS, SECTION_PAGES } from '../data/site';

/** Locale from a `[...locale]` rest param (undefined → default). */
export function localeFromParam(param: string | undefined): Locale {
  if (!param) return DEFAULT_LOCALE;
  if (isLocale(param)) return param;
  throw new Error(`Unknown locale "${param}"`);
}

/** Static path entries for `[...locale]` routes. */
export function localePaths<T extends Record<string, unknown>>(extra: T = {} as T) {
  return LOCALES.map((locale) => ({
    params: { locale: locale === DEFAULT_LOCALE ? undefined : locale, ...extra },
    props: { locale },
  }));
}

/** Base-aware, locale-aware URL for a site path such as "directions/vodka/". */
export function href(locale: Locale, path = ''): string {
  return getRelativeLocaleUrl(locale, path);
}

export function t(locale: Locale) {
  return ui[locale];
}

/**
 * Fills `{count}` and plural placeholders `{count:one|few|many}` in a template.
 * Forms follow Intl.PluralRules for the locale: EN needs `one|other`, RU `one|few|many`.
 */
export function withCount(template: string, count: number, locale: Locale): string {
  const category = new Intl.PluralRules(locale).select(count);
  return template
    .replace(/\{count:([^}]+)\}/g, (_, forms: string) => {
      const list = forms.split('|');
      const index = { one: 0, few: 1, many: 2, other: list.length - 1 }[
        category as 'one' | 'few' | 'many' | 'other'
      ];
      return list[Math.min(index ?? list.length - 1, list.length - 1)] ?? '';
    })
    .replace(/\{count\}/g, String(count));
}

export interface NavItem {
  key: 'directions' | 'services' | 'pavilion' | 'about' | 'contacts';
  label: string;
  href: string;
  /** Site path of the item's own page (directions/, about/), for the active state in the menus. */
  page?: string;
}

/**
 * Menu items in the order of the home sections of the locale (src/data/site.ts).
 * Sections without a `nav.*` label (audiences) are skipped; sections listed in
 * SECTION_PAGES (directions, about) link to their page, the rest to home anchors.
 */
export function navItems(locale: Locale): NavItem[] {
  const nav = ui[locale].nav;
  const home = href(locale);
  return HOME_SECTIONS[locale].flatMap((key) => {
    if (key === 'audiences') return [];
    return [
      {
        key,
        label: nav[key],
        href: SECTION_PAGES[key] ? href(locale, SECTION_PAGES[key]) : `${home}#${key}`,
        page: SECTION_PAGES[key],
      },
    ];
  });
}

import { getRelativeLocaleUrl } from 'astro:i18n';
import { DEFAULT_LOCALE, isLocale, type Locale } from './config';
import { ui } from './ui';

/** Locale from a `[...locale]` rest param (undefined → default). */
export function localeFromParam(param: string | undefined): Locale {
  if (!param) return DEFAULT_LOCALE;
  if (isLocale(param)) return param;
  throw new Error(`Unknown locale "${param}"`);
}

/** Static path entries for `[...locale]` routes. */
export function localePaths<T extends Record<string, unknown>>(extra: T = {} as T) {
  return (['en', 'ru', 'hi'] as const).map((locale) => ({
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
 * Locale-aware URL of a direction's product site. Product sites follow the hub's
 * convention: default locale at the root, other locales under `/<locale>/`.
 */
export function siteHref(site: string, locale: Locale): string {
  const base = site.endsWith('/') ? site : `${site}/`;
  return locale === DEFAULT_LOCALE ? base : `${base}${locale}/`;
}

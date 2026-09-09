export const LOCALES = ['en', 'ru', 'hi'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  ru: 'Русский',
  hi: 'हिन्दी',
};

export const OG_LOCALES: Record<Locale, string> = {
  en: 'en_IN',
  ru: 'ru_RU',
  hi: 'hi_IN',
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

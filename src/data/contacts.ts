/*
  Operator contacts. Phone-like values are stored in display form; links are
  derived from them. `null` renders a visible "to be provided" placeholder.
*/
import type { Locale } from '../i18n/config';

export const contacts = {
  email: 'raigroupholding@gmail.com' as string | null,
  /** Russian number; also used for WhatsApp and Telegram. */
  phone: '+7 965 157 73 00' as string | null,
  /** Indian office number. */
  phoneIndia: '+91 90820 99228' as string | null,
  whatsapp: '+7 965 157 73 00' as string | null,
  /** Telegram username (without "@") or a phone number in international format. */
  telegram: '+7 965 157 73 00' as string | null,
  /** Office of the operator (the pavilion is at the same address), first line is the legal name. */
  address: [
    'RAI FAMILY CORP LLP',
    'Office No 1307/1308, 13th Floor, NMS Titanium',
    'Plot No 74, Sector-15, CBD Belapur',
    'Navi Mumbai, Thane, Maharashtra, 400614',
  ],
  /** Official profiles for schema.org sameAs. Ссылка на страницу павильона на сайте РЭЦ / madeinrussia будет добавлена после подтверждения. */
  sameAs: [] as string[],
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=NMS+Titanium%2C+Plot+No.+74%2C+Sector-15%2C+CBD+Belapur%2C+Navi+Mumbai%2C+Maharashtra+400614',
};

/** Phone numbers in display order: the locale's home country first. */
export const phonesFor = (locale: Locale): string[] => {
  const ru = contacts.phone;
  const india = contacts.phoneIndia;
  const ordered = locale === 'ru' ? [ru, india] : [india, ru];
  return ordered.filter((p): p is string => Boolean(p));
};

/** "+7 965 157 73 00" → "+79651577300" */
export const telUri = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;
/** "+7 965 157 73 00" → "https://wa.me/79651577300", optionally with a prefilled message. */
export const whatsappUrl = (phone: string, text?: string) =>
  `https://wa.me/${phone.replace(/\D/g, '')}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
/** username → "https://t.me/username"; phone → "https://t.me/+79651577300" */
export const telegramUrl = (value: string) =>
  value.startsWith('+') ? `https://t.me/${value.replace(/[^\d+]/g, '')}` : `https://t.me/${value}`;
export const telegramLabel = (value: string) => (value.startsWith('+') ? value : `@${value}`);

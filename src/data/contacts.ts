/*
  Operator contacts. Phone-like values are stored in display form; links are
  derived from them. `null` renders a visible "to be provided" placeholder.
*/
export const contacts = {
  email: 'raigroupholding@gmail.com' as string | null,
  phone: '+7 965 157 73 00' as string | null,
  whatsapp: '+7 965 157 73 00' as string | null,
  /** Telegram username (without "@") or a phone number in international format. */
  telegram: '+7 965 157 73 00' as string | null,
  address: [
    'Office No. 1307 and 1308, NMS Titanium, 13th Floor',
    'Plot No. 74, Sector-15, CBD Belapur',
    'Navi Mumbai, Thane, Maharashtra 400614, India',
  ],
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=NMS+Titanium%2C+Plot+No.+74%2C+Sector-15%2C+CBD+Belapur%2C+Navi+Mumbai%2C+Maharashtra+400614',
};

/** "+7 965 157 73 00" → "+79651577300" */
export const telUri = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;
/** "+7 965 157 73 00" → "https://wa.me/79651577300" */
export const whatsappUrl = (phone: string) => `https://wa.me/${phone.replace(/\D/g, '')}`;
/** username → "https://t.me/username"; phone → "https://t.me/+79651577300" */
export const telegramUrl = (value: string) =>
  value.startsWith('+') ? `https://t.me/${value.replace(/[^\d+]/g, '')}` : `https://t.me/${value}`;
export const telegramLabel = (value: string) => (value.startsWith('+') ? value : `@${value}`);

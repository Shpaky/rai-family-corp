/*
  Operator contacts. `null` renders a visible "to be provided" placeholder;
  fill in the values once the company confirms them.
*/
export const contacts = {
  email: null as string | null,
  phone: null as string | null,
  whatsapp: null as string | null, // international number without "+", e.g. "9198xxxxxxx"
  telegram: null as string | null, // username without "@"
  address: [
    'Office No. 1307 and 1308, NMS Titanium, 13th Floor',
    'Plot No. 74, Sector-15, CBD Belapur',
    'Navi Mumbai, Thane, Maharashtra 400614, India',
  ],
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=NMS+Titanium%2C+Plot+No.+74%2C+Sector-15%2C+CBD+Belapur%2C+Navi+Mumbai%2C+Maharashtra+400614',
};

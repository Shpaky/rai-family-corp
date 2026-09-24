// Prices are never published on the site: fails when a direction JSON or the
// UI dictionary mentions a currency or an amount of money. No exceptions.
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const ROOT = resolve(new URL('..', import.meta.url).pathname);
const DIR = join(ROOT, 'src/content/directions');
const FILES = [
  ...readdirSync(DIR)
    .filter((n) => n.endsWith('.json'))
    .map((n) => join(DIR, n)),
  join(ROOT, 'src/i18n/ui.ts'),
];

const RULES = [
  [/\b(?:USD|EUR|INR|RUB|GBP)\b/, 'currency code'],
  [/[$€₹£]/, 'currency symbol'],
  [/(?<![a-zа-яё])(?:руб(?:л[а-я]*|\.)?|rupees?|dollars?)(?![a-zа-яё])/iu, 'currency word'],
  [/\d{1,3}(?:[  ,.]\d{3})+\s*(?:USD|EUR|INR|RUB|GBP|руб|[$€₹£])/iu, 'amount with currency'],
];

const problems = [];
for (const file of FILES) {
  readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      for (const [re, label] of RULES) {
        const m = line.match(re);
        if (m) problems.push(`${relative(ROOT, file)}:${i + 1}: ${label} "${m[0]}"`);
      }
    });
}

if (problems.length) {
  console.error(
    `check:content — prices and currencies are not published:\n  ${problems.join('\n  ')}`,
  );
  process.exit(1);
}
console.log(`check:content — ${FILES.length} files, no prices or currencies.`);

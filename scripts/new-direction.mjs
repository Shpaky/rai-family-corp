// Scaffolds a direction: src/content/directions/<slug>.json with every schema field
// and public/docs/<slug>/.gitkeep. The JSON starts with `published: false`, so it
// stays out of the build until it is filled in and switched on by hand.
// Usage: npm run new:direction -- "<folder name in ./directions>" <slug>
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(new URL('..', import.meta.url).pathname);
const [source, slug] = process.argv.slice(2);
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

if (!source || !slug || !SLUG.test(slug)) {
  console.error(
    'Usage: npm run new:direction -- "<folder name in ./directions>" <slug>\n' +
      'slug: lowercase latin letters, digits and hyphens, e.g. proton-spray-equipment',
  );
  process.exit(2);
}

const jsonPath = join(ROOT, 'src/content/directions', `${slug}.json`);
const docsDir = join(ROOT, 'public/docs', slug);

if (existsSync(jsonPath)) {
  console.error(`new:direction — ${jsonPath} already exists, nothing written.`);
  process.exit(1);
}

const localized = () => ({
  title: slug,
  summary: '',
  body: [],
  products: [],
  forWhom: ['TODO'],
  facts: [],
  keyFigures: [],
  logistics: null,
  manufacturerNote: null,
  howToBuy: { dispatch: null, moq: null, packaging: null, priceNote: null, incoterms: null },
  references: [],
  faq: [],
});

const entry = {
  order: 100,
  brand: '',
  category: '',
  status: 'coming',
  published: false,
  audiences: [],
  source,
  tags: [],
  featured: false,
  manufacturer: null,
  howToBuy: null,
  documents: [],
  i18n: { en: localized(), ru: localized() },
};

writeFileSync(jsonPath, `${JSON.stringify(entry, null, 2)}\n`);
mkdirSync(docsDir, { recursive: true });
writeFileSync(join(docsDir, '.gitkeep'), '');

try {
  execFileSync('npx', ['prettier', '--write', jsonPath], { cwd: ROOT, stdio: 'ignore' });
} catch {
  // Formatting is a convenience; the file is valid JSON either way.
}

console.log(`Created ${jsonPath} (published: false)\nCreated ${docsDir}/.gitkeep`);
console.log('Next: fill category, brand, status and both locales, then set published: true.');

// Checks the built home pages against src/data/site.ts: order of the sections
// in <main>, order of the header menu, and the first audience card's link.
// Run after `npm run build`.
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { HOME_SECTIONS } from '../src/data/site.ts';

const ROOT = resolve(new URL('..', import.meta.url).pathname);
const PAGES = { en: 'dist/index.html', ru: 'dist/ru/index.html' };
let failed = false;
const fail = (msg) => {
  failed = true;
  console.error(`FAIL ${msg}`);
};

for (const [locale, file] of Object.entries(PAGES)) {
  const html = readFileSync(join(ROOT, file), 'utf8');
  const expected = HOME_SECTIONS[locale].map((s) => s.key);

  // Sections: every <section id="…"> inside <main>, in document order (hero has no id).
  const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
  const sections = [...main.matchAll(/<section\b[^>]*\bid="([^"]+)"/g)].map((m) => m[1]);
  if (sections.join() !== expected.join())
    fail(`${locale}: sections ${sections.join(' → ')} ≠ config ${expected.join(' → ')}`);
  else console.log(`ok   ${locale}: sections ${sections.join(' → ')}`);

  // Header menu: first <nav> inside <header>, link targets in order (contacts is a separate button).
  const header = html.slice(html.indexOf('<header'), html.indexOf('</header>'));
  const nav = header.slice(header.indexOf('<nav'), header.indexOf('</nav>'));
  const menu = [...nav.matchAll(/href="([^"]+)"/g)].map((m) =>
    m[1].endsWith('/directions/') ? 'directions' : m[1].split('#')[1],
  );
  const expectedMenu = expected.filter((k) => k !== 'audiences' && k !== 'contacts');
  if (menu.join() !== expectedMenu.join())
    fail(`${locale}: menu ${menu.join(' · ')} ≠ ${expectedMenu.join(' · ')}`);
  else console.log(`ok   ${locale}: menu ${menu.join(' · ')}`);

  // First audience card links to the first section after audiences.
  const aud = main.slice(main.indexOf('id="audiences"'));
  const firstLi = aud.slice(aud.indexOf('<li'), aud.indexOf('</li>'));
  const target = firstLi.match(/href="[^"]*#([a-z]+)"/)?.[1];
  const want = expected[expected.indexOf('audiences') + 1];
  if (target !== want)
    fail(`${locale}: first audience card links to #${target}, expected #${want}`);
  else console.log(`ok   ${locale}: first audience card → #${target}`);
}
process.exit(failed ? 1 : 0);

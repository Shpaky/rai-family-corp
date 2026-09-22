// Checks the built home pages against src/data/site.ts: order of the sections
// in <main>, order of the header menu, and the first audience card's link.
// Run after `npm run build`.
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { HOME_SECTIONS } from '../src/data/site.ts';

const bgOf = (tag) => {
  const cls = tag.match(/class="([^"]*)"/)?.[1] ?? '';
  return ['bg-white', 'bg-surface', 'bg-dark'].filter((b) => cls.split(/\s+/).includes(b));
};

const ROOT = resolve(new URL('..', import.meta.url).pathname);
const PAGES = { en: 'dist/index.html', ru: 'dist/ru/index.html' };
let failed = false;
const fail = (msg) => {
  failed = true;
  console.error(`FAIL ${msg}`);
};

for (const [locale, file] of Object.entries(PAGES)) {
  const html = readFileSync(join(ROOT, file), 'utf8');
  const expected = HOME_SECTIONS[locale];

  // Sections: every <section id="…"> inside <main>, in document order (hero has no id).
  const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
  const sections = [...main.matchAll(/<section\b[^>]*\bid="([^"]+)"/g)].map((m) => m[1]);
  if (sections.join() !== expected.join())
    fail(`${locale}: sections ${sections.join(' → ')} ≠ config ${expected.join(' → ')}`);
  else console.log(`ok   ${locale}: sections ${sections.join(' → ')}`);

  // Backgrounds by position: hero white, then paper / white alternating, contacts dark and alone.
  const tags = [...main.matchAll(/<section\b[^>]*>/g)].map((m) => m[0]);
  const bgs = tags.map(bgOf);
  const ids = tags.map((t) => t.match(/\bid="([^"]+)"/)?.[1] ?? 'hero');
  const failedBefore = failed;
  bgs.forEach((bg, i) => {
    if (bg.length > 1)
      fail(`${locale}: section #${ids[i]} carries several backgrounds: ${bg.join(' ')}`);
  });
  if (bgs[0]?.[0] !== 'bg-white') fail(`${locale}: hero must be bg-white, got ${bgs[0]}`);
  if (bgs.at(-1)?.[0] !== 'bg-dark' || ids.at(-1) !== 'contacts')
    fail(`${locale}: last section must be #contacts on bg-dark`);
  if (bgs.filter((b) => b[0] === 'bg-dark').length !== 1)
    fail(`${locale}: exactly one bg-dark section expected`);
  for (let i = 1; i < bgs.length - 1; i++) {
    const want = i % 2 === 1 ? 'bg-surface' : 'bg-white';
    if (bgs[i][0] !== want)
      fail(`${locale}: section #${ids[i]} expected ${want}, got ${bgs[i][0] ?? 'none'}`);
  }
  if (failed === failedBefore)
    console.log(
      `ok   ${locale}: backgrounds ${ids.map((id, i) => `${id}:${(bgs[i][0] ?? '').replace('bg-', '')}`).join(' → ')}`,
    );

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

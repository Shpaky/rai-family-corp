// Fails when markup uses arbitrary Tailwind values or raw hex colours.
// Tokens live only in src/styles/global.css (@theme). SVG assets under
// src/assets and public are images and are not scanned.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const SRC = join(ROOT, 'src');
const SKIP = [join(SRC, 'assets'), join(SRC, 'styles', 'global.css')];
const EXT = /\.(astro|ts|tsx|mjs|js|css|svg)$/;

const ARBITRARY = /(?:^|[\s"'`])(?:[a-z-]+:)*-?[a-z]+(?:-[a-z]+)*-\[[^\]\s]+\]/g;
const HEX = /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (SKIP.some((s) => p.startsWith(s))) continue;
    if (statSync(p).isDirectory()) walk(p, out);
    else if (EXT.test(name)) out.push(p);
  }
  return out;
}

const problems = [];
for (const file of walk(SRC)) {
  const text = readFileSync(file, 'utf8');
  text.split('\n').forEach((line, i) => {
    if (line.includes('token-lint-ignore')) return;
    for (const m of line.matchAll(ARBITRARY))
      problems.push([file, i + 1, `arbitrary value ${m[0].trim()}`]);
    for (const m of line.matchAll(HEX)) {
      // Allow fragment links like href="#contact" — a hex match must look like a colour.
      if (/^#[0-9a-fA-F]+$/.test(m[0]) && !/href=["']#|url\(#|id=["']#/.test(line)) {
        problems.push([file, i + 1, `raw colour ${m[0]}`]);
      }
    }
  });
}

if (problems.length) {
  for (const [f, l, msg] of problems) console.error(`${relative(ROOT, f)}:${l}: ${msg}`);
  console.error(`\nlint:tokens — ${problems.length} problem(s).`);
  process.exit(1);
}
console.log('lint:tokens — ok');

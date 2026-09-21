// Compares the source folder of directions (one sub-folder = one direction)
// with src/content/directions/*.json by the `source` field.
// Folders without JSON: warning (not published yet). JSON without folder: error.
// The folder lives outside the repository, so this is not part of lint or CI.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(new URL('..', import.meta.url).pathname);
const DIR = resolve(ROOT, process.env.DIRECTIONS_DIR ?? '../directions');
const CONTENT = join(ROOT, 'src/content/directions');

if (!existsSync(DIR)) {
  console.error(
    `check:directions — source folder not found: ${DIR}\nSet DIRECTIONS_DIR to the folder with one sub-directory per direction.`,
  );
  process.exit(2);
}

const folders = readdirSync(DIR).filter(
  (n) => !n.startsWith('.') && statSync(join(DIR, n)).isDirectory(),
);
const entries = readdirSync(CONTENT)
  .filter((n) => n.endsWith('.json'))
  .map((n) => ({ file: n, source: JSON.parse(readFileSync(join(CONTENT, n), 'utf8')).source }));

const withoutJson = folders.filter((f) => !entries.some((e) => e.source === f));
const withoutFolder = entries.filter((e) => !folders.includes(e.source));

console.log(`Source folder: ${DIR} (${folders.length} directions), JSON: ${entries.length}`);
if (withoutJson.length)
  console.log(`\nWARN folders without JSON (not published yet):\n  ${withoutJson.join('\n  ')}`);
if (withoutFolder.length)
  console.error(
    `\nERROR JSON without a source folder:\n  ${withoutFolder.map((e) => `${e.file} (source: ${e.source})`).join('\n  ')}`,
  );
if (!withoutJson.length && !withoutFolder.length) console.log('All directions match.');
process.exit(withoutFolder.length ? 1 : 0);

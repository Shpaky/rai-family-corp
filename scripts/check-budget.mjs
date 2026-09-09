// JS budget: every built HTML page may reference at most BUDGET bytes of
// JavaScript (external module scripts + inline scripts, uncompressed).
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const BUDGET = 50 * 1024;
const DIST = resolve(new URL('..', import.meta.url).pathname, 'dist');

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

function findAsset(src) {
  const path = src.replace(/^https?:\/\/[^/]+/, '').split('?')[0];
  const idx = path.indexOf('/_astro/');
  const rel = idx >= 0 ? path.slice(idx + 1) : path.replace(/^\//, '');
  const candidate = join(DIST, rel);
  try {
    return statSync(candidate).size;
  } catch {
    return null;
  }
}

let failed = false;
const rows = [];
for (const file of walk(DIST)) {
  const html = readFileSync(file, 'utf8');
  let bytes = 0;
  const missing = [];
  for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const attrs = m[1];
    const src = attrs.match(/\bsrc=["']([^"']+)["']/)?.[1];
    if (src) {
      const size = findAsset(src);
      if (size == null) missing.push(src);
      else bytes += size;
    } else {
      bytes += Buffer.byteLength(m[2], 'utf8');
    }
  }
  const page = relative(DIST, file);
  const over = bytes > BUDGET;
  if (over || missing.length) failed = true;
  rows.push(
    `${over ? 'FAIL' : ' ok '}  ${String(bytes).padStart(7)} B  ${page}${missing.length ? `  (unresolved: ${missing.join(', ')})` : ''}`,
  );
}
console.log(`JS budget ${BUDGET} B per page\n` + rows.join('\n'));
process.exit(failed ? 1 : 0);

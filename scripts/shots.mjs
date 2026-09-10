// Screenshots of every page at 360/768/1280 into ./shots (gitignored).
// Serves ./dist with `astro preview`, so run `npm run build` first.
import { spawn } from 'node:child_process';
import { mkdirSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { chromium } from '@playwright/test';

const ROOT = resolve(new URL('..', import.meta.url).pathname);
const DIST = join(ROOT, 'dist');
const BASE = (process.env.BASE_PATH ?? '/rai-family-corp').replace(/\/$/, '');
const PORT = 4323;
const ORIGIN = `http://localhost:${PORT}`;
const WIDTHS = [360, 768, 1280];
const ONLY = process.argv[2]; // optional path filter, e.g. "ru"

function pages(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) pages(p, out);
    else if (name === 'index.html') out.push('/' + relative(DIST, dir).replace(/\\/g, '/'));
  }
  return out;
}

async function waitFor(url, tries = 60) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url);
      if (r.ok) return;
    } catch {
      /* not yet */
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`preview did not start at ${url}`);
}

const server = spawn('npx', ['astro', 'preview', '--ignore-lock', '--port', String(PORT)], {
  cwd: ROOT,
  stdio: 'ignore',
  env: { ...process.env, BASE_PATH: BASE, ASTRO_PREVIEW_BACKGROUND: '1' },
});
try {
  await waitFor(`${ORIGIN}${BASE}/`);
  const browser = await chromium.launch();
  const list = pages(DIST)
    .map((p) => (p === '/.' || p === '/' ? '/' : p.replace(/^\/\.?/, '/') + '/'))
    .filter((p) => !ONLY || p.includes(ONLY) || (p === '/' && ONLY === 'home'))
    .sort();
  mkdirSync(join(ROOT, 'shots'), { recursive: true });
  for (const path of list) {
    const name = path === '/' ? 'home' : path.replace(/^\/|\/$/g, '').replace(/\//g, '_');
    for (const width of WIDTHS) {
      const page = await browser.newPage({
        viewport: { width, height: 800 },
        deviceScaleFactor: 1,
      });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(`${ORIGIN}${BASE}${path}`, { waitUntil: 'networkidle' });
      const file = join(ROOT, 'shots', `${name}-${width}.png`);
      await page.screenshot({ path: file, fullPage: true });
      console.log(relative(ROOT, file));
      await page.close();
    }
  }
  await browser.close();
} finally {
  server.kill();
}

// Measures the compact direction cards in the home carousel (#directions) in
// EN and RU at 360 and 1280 px and fails when one exceeds the threshold.
// Thresholds are tied to the compact variant: up to three title lines at the
// 70-character limit, two key-figure lines, up to two lines of the category
// strip on a narrow card. Serves dist/ like scripts/shots.mjs, so build first.
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { chromium } from '@playwright/test';

const MAX_HEIGHT = { 360: 360, 1280: 320 };
const ROOT = resolve(new URL('..', import.meta.url).pathname);
const BASE = (process.env.BASE_PATH ?? '/rai-family-corp').replace(/\/$/, '');
const PORT = 4328;
const ORIGIN = `http://localhost:${PORT}`;
const PAGES = { en: '/', ru: '/ru/' };

async function waitFor(url, tries = 60) {
  for (let i = 0; i < tries; i++) {
    try {
      if ((await fetch(url)).ok) return;
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
let failed = false;
try {
  await waitFor(`${ORIGIN}${BASE}/`);
  const browser = await chromium.launch();
  console.log('locale  width  cards  card min/max  section');
  for (const [locale, path] of Object.entries(PAGES)) {
    for (const [width, max] of Object.entries(MAX_HEIGHT)) {
      const page = await browser.newPage({
        viewport: { width: Number(width), height: width === '360' ? 780 : 900 },
      });
      await page.goto(`${ORIGIN}${BASE}${path}`, { waitUntil: 'networkidle' });
      const r = await page.evaluate(() => {
        const hs = [...document.querySelectorAll('#directions ul article')].map((a) =>
          Math.round(a.getBoundingClientRect().height),
        );
        const section = Math.round(
          document.querySelector('#directions')?.getBoundingClientRect().height ?? 0,
        );
        return { hs, section };
      });
      const lo = Math.min(...r.hs),
        hi = Math.max(...r.hs);
      const over = hi > max;
      if (over) failed = true;
      console.log(
        `${locale.padEnd(7)} ${width.padEnd(6)} ${String(r.hs.length).padEnd(6)} ${String(lo).padStart(4)} / ${String(hi).padEnd(5)} ${String(r.section).padStart(5)}${over ? `  FAIL > ${max}` : ''}`,
      );
      await page.close();
    }
  }
  await browser.close();
} finally {
  server.kill();
}
process.exit(failed ? 1 : 0);

// One-off generator for raster brand files: apple-touch-icon.png (180×180)
// and og.png (1200×630). Renders HTML with Playwright so the real Montserrat
// is used. Re-run after changing the mark: `node scripts/icons.mjs`.
import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { chromium } from '@playwright/test';

const ROOT = resolve(new URL('..', import.meta.url).pathname);
const favicon = readFileSync(join(ROOT, 'public/favicon.svg'), 'utf8');
const favData = `data:image/svg+xml;base64,${Buffer.from(favicon).toString('base64')}`;

const mark = `
<svg width="176" height="176" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="32" cy="32" r="26" stroke="#ffffff" stroke-width="6"/>
  <path d="M23 46V18h10a8 8 0 0 1 0 16H23" stroke="#ffffff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M34 34l9 12" stroke="#ffffff" stroke-width="7" stroke-linecap="round"/>
  <circle cx="50" cy="50" r="7" fill="#fb0731"/>
</svg>`;

const og = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;800&display=swap">
<style>
  body{margin:0;width:1200px;height:630px;background:#0634da;color:#fff;font-family:Montserrat,Arial,sans-serif;display:flex;align-items:center;padding:0 88px;box-sizing:border-box;gap:64px}
  .t{display:flex;flex-direction:column;gap:20px}
  .e{font-size:20px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#8bf6fe}
  h1{margin:0;font-size:64px;font-weight:800;letter-spacing:-.02em;line-height:1.05}
  p{margin:0;font-size:26px;font-weight:600;color:#febda5}
</style></head><body>
${mark}
<div class="t"><div class="e">Made in Russia pavilion operator, India</div>
<h1>Rai Family Corp</h1>
<p>Russian products in India. One operator, the whole route.</p></div>
</body></html>`;

const touch = `<!doctype html><html><head><meta charset="utf-8"><style>body{margin:0;width:180px;height:180px}img{width:180px;height:180px;display:block}</style></head><body><img src="${favData}"></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});
await page.setContent(og, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
writeFileSync(join(ROOT, 'public/og.png'), await page.screenshot({ type: 'png' }));
await page.setViewportSize({ width: 180, height: 180 });
await page.setContent(touch, { waitUntil: 'networkidle' });
writeFileSync(join(ROOT, 'public/apple-touch-icon.png'), await page.screenshot({ type: 'png' }));
await browser.close();
console.log('public/og.png, public/apple-touch-icon.png');

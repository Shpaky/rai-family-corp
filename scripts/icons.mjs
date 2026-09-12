// One-off generator for raster brand files: apple-touch-icon.png (180×180),
// og.png (1200×630) and public/brand/status-lockup-{en,ru,hi}.png (1200 px wide,
// for e-mail signatures, WhatsApp Business and presentations). Renders HTML with
// Playwright so the real Montserrat is used. Not part of CI; re-run after
// changing the mark or the status strings: `node scripts/icons.mjs`.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { chromium } from '@playwright/test';
import sharp from 'sharp';
import { ui } from '../src/i18n/ui.ts';

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

// Status lockup (footer variant, light tone) at 3× for a 1200 px wide export.
const mirPath = join(ROOT, 'src/assets/brand/made-in-russia.svg');
const mirData = existsSync(mirPath)
  ? `data:image/svg+xml;base64,${Buffer.from(readFileSync(mirPath, 'utf8')).toString('base64')}`
  : null;
const markSmall = `
<svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="32" cy="32" r="26" stroke="#0634da" stroke-width="6"/>
  <path d="M23 46V18h10a8 8 0 0 1 0 16H23" stroke="#0634da" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M34 34l9 12" stroke="#0634da" stroke-width="7" stroke-linecap="round"/>
  <circle cx="50" cy="50" r="7" fill="#fb0731"/>
</svg>`;
const lockup = (locale) => `<!doctype html><html lang="${locale}"><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&family=Noto+Sans+Devanagari:wght@700;800&display=swap">
<style>
  body{margin:0;background:#ffffff;font-family:Montserrat,'Noto Sans Devanagari',Arial,sans-serif;color:#0b1240}
  .l{display:inline-flex;align-items:center;gap:12px;padding:16px 20px}
  .t p{margin:0}
  .e{font-size:13px;line-height:1;letter-spacing:.12em;text-transform:uppercase;font-weight:700;color:#5a6084}
  .s{margin-top:2px;font-size:14px;line-height:1.25;font-weight:700;white-space:nowrap}
  .d{width:1px;align-self:stretch;background:#dfe3f0}
  img{height:40px;width:auto;display:block}
  .f{font-weight:800;letter-spacing:-.02em}
</style></head><body><div class="l" id="l">${markSmall}
<div class="t"><p class="e">${ui[locale].status.company}</p><p class="s">${ui[locale].status.lineShort}</p></div>
<span class="d"></span>${mirData ? `<img src="${mirData}" alt="${ui[locale].status.markAlt}">` : '<span class="f">Made in Russia</span>'}
</div></body></html>`;

mkdirSync(join(ROOT, 'public/brand'), { recursive: true });
const out = [];
for (const locale of ['en', 'ru', 'hi']) {
  const p = await browser.newPage({ viewport: { width: 400, height: 100 }, deviceScaleFactor: 3 });
  await p.setContent(lockup(locale), { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  const el = p.locator('#l');
  const file = `public/brand/status-lockup-${locale}.png`;
  // Normalise every locale to exactly 1200 px wide.
  writeFileSync(
    join(ROOT, file),
    await sharp(await el.screenshot({ type: 'png' }))
      .resize({ width: 1200 })
      .png()
      .toBuffer(),
  );
  out.push(file);
  await p.close();
}
await browser.close();
console.log('public/og.png, public/apple-touch-icon.png,', out.join(', '));

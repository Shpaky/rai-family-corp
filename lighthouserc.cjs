const { existsSync, readdirSync } = require('node:fs');
const { join } = require('node:path');
const os = require('node:os');

// Use Playwright's Chromium when no system Chrome is present.
function playwrightChrome() {
  const dir = join(os.homedir(), '.cache', 'ms-playwright');
  if (!existsSync(dir)) return undefined;
  const rev = readdirSync(dir).find((d) => /^chromium-\d+$/.test(d));
  if (!rev) return undefined;
  for (const sub of ['chrome-linux64/chrome', 'chrome-linux/chrome']) {
    const p = join(dir, rev, sub);
    if (existsSync(p)) return p;
  }
  return undefined;
}

const BASE = (process.env.BASE_PATH ?? '/rai-family-corp').replace(/\/$/, '');
const PORT = 4325;
const ORIGIN = `http://localhost:${PORT}`;
const PAGES = ['/', '/ru/', '/hi/'];

module.exports = {
  ci: {
    collect: {
      startServerCommand: `ASTRO_PREVIEW_BACKGROUND=1 npx astro preview --ignore-lock --port ${PORT}`,
      startServerReadyPattern: 'Local',
      url: PAGES.map((p) => `${ORIGIN}${BASE}${p}`),
      numberOfRuns: 1,
      settings: {
        preset: 'desktop',
        chromeFlags: '--no-sandbox --headless=new',
      },
      chromePath: process.env.CHROME_PATH ?? playwrightChrome(),
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 1 }],
      },
    },
    upload: { target: 'filesystem', outputDir: '.lighthouseci' },
  },
};

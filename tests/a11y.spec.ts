import { readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const DIST = join(process.cwd(), 'dist');

function pages(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) pages(p, out);
    else if (name === 'index.html') {
      const rel = relative(DIST, dir).replace(/\\/g, '/');
      out.push(rel ? `${rel}/` : '');
    }
  }
  return out.sort();
}

for (const path of pages(DIST)) {
  test(`axe: /${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
      .analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });

  test(`keyboard: /${path} has a skip link and focusable nav`, async ({ page }) => {
    await page.goto(path);
    await page.keyboard.press('Tab');
    const first = page.locator(':focus');
    await expect(first).toHaveAttribute('href', /#main/);
  });
}

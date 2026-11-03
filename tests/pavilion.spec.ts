import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
for (const locale of ['', 'ru/']) {
  test(`pavilion interactions and responsive layout: ${locale || 'en'}`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`${locale}pavilion/`);
    await expect(page.locator('main > section')).toHaveCount(7);
    await expect(page.locator('[data-resident]')).toHaveCount(44);
    await expect(page.locator('[data-resident]:visible')).toHaveCount(12);
    const toggle = page.locator('#residents-toggle');
    await toggle.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-resident]:visible')).toHaveCount(44);
    await page.keyboard.press('Enter');
    await expect(toggle).toBeFocused();
    await expect(page.locator('[data-resident]:visible')).toHaveCount(12);
    const photo = page.locator('[data-photo]').first();
    await photo.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('dialog')).toBeVisible();
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await page.keyboard.press('Escape');
    await expect(photo).toBeFocused();
    await expect(page.locator('dialog')).not.toBeVisible();
    await page.locator('[data-photo]').nth(4).click();
    const fullFrame = await page.locator('dialog img').boundingBox();
    expect(fullFrame).not.toBeNull();
    expect(fullFrame!.y + fullFrame!.height).toBeLessThanOrEqual(page.viewportSize()!.height);
    await page.keyboard.press('Escape');
    await page.locator('#news details summary').last().click();
    await expect(page.locator('#news details').last().locator('li')).toHaveCount(6);
    for (const width of [320, 360, 768, 1280]) {
      await page.setViewportSize({ width, height: 800 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
    }
    expect(errors).toEqual([]);
    await page.locator('a[href$="#pavilion-residency"]').click();
    await expect(page.locator('#pavilion-residency')).toBeVisible();
  });
  test(`pavilion without JavaScript: ${locale || 'en'}`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
    const page = await context.newPage();
    await page.goto(`${locale}pavilion/`);
    await expect(page.locator('[data-resident]:visible')).toHaveCount(44);
    await page.locator('#news details summary').last().click();
    await expect(page.locator('#news details').last().locator('li')).toHaveCount(6);
    await expect(page.locator('[data-photo]').first()).toHaveAttribute('href', /\.webp$/);
    await context.close();
  });
}

for (const locale of ['', 'ru/']) {
  test(`pavilion links, metadata and assets: ${locale || 'en'}`, async ({ page, request }) => {
    await page.goto(`${locale}pavilion/`);
    await expect(page.locator('html')).toHaveAttribute('lang', locale ? 'ru' : 'en');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      new RegExp(`/${locale}pavilion/$`),
    );
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', /\/pavilion\/$/);
    await expect(page.locator('link[hreflang="ru"]')).toHaveAttribute('href', /\/ru\/pavilion\/$/);
    await page.locator('#residents-toggle').click();
    await page
      .locator('#news details')
      .evaluateAll((nodes) => nodes.forEach((node) => ((node as HTMLDetailsElement).open = true)));
    await page.evaluate(async () => {
      for (const img of document.images) {
        img.loading = 'eager';
        await img.decode();
      }
      await document.fonts.ready;
    });
    expect(
      await page.evaluate(() => [...document.images].every((img) => img.naturalWidth > 0)),
    ).toBe(true);
    const links = await page
      .locator('a[href]')
      .evaluateAll((nodes) => [...new Set(nodes.map((node) => (node as HTMLAnchorElement).href))]);
    for (const link of links) {
      const url = new URL(link);
      if (url.origin !== new URL(page.url()).origin) continue;
      expect((await request.get(url.href)).ok(), url.href).toBe(true);
    }
    for (const path of ['', 'about/', 'manufacturers/']) {
      await page.goto(locale + path);
      await expect(page.locator(`a[href$="/${locale}pavilion/"]`).first()).toBeVisible();
    }
  });
}

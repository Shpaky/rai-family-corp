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
    await page.locator('[data-photo="opening-group"]').click();
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
    await expect(page.locator('[data-photo]')).toHaveCount(7);
    for (const photo of await page.locator('[data-photo]').all()) {
      await expect(photo).toHaveAttribute('href', /\.webp$/);
    }
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

for (const locale of ['', 'ru/']) {
  test(`pavilion photo placement and per-photo dialog captions: ${locale || 'en'}`, async ({
    page,
  }) => {
    await page.goto(locale);
    await expect(page.locator('#pavilion picture')).toHaveCount(0);
    await expect(page.locator('#pavilion a[href$="pavilion/"]')).toHaveCount(1);
    await page.goto(`${locale}pavilion/`);
    const opening = ['opening-guests', 'opening-moment', 'opening-group', 'opening-hall'];
    const interior = ['showroom', 'shelves', 'stage'];
    const ids = await page
      .locator('[data-photo]')
      .evaluateAll((links) => links.map((a) => a.getAttribute('data-photo')));
    expect(ids).toEqual([...opening, ...interior]);
    await expect(page.locator('#about-pavilion [data-photo]')).toHaveCount(3);
    await expect(page.locator('main > section').first().locator('img')).toHaveAttribute(
      'src',
      /meeting-area\./,
    );
    await page.locator('#news details summary').last().click();
    await expect(page.locator('#news details').last().locator('img')).toHaveAttribute(
      'src',
      /opening-hall\./,
    );
    // Full-size resources must be fetched only when their links are opened.
    const requested = await page.evaluate(() =>
      performance.getEntriesByType('resource').map((r) => r.name),
    );
    for (const photo of await page.locator('[data-photo]').all()) {
      expect(requested).not.toContain(await photo.evaluate((a) => (a as HTMLAnchorElement).href));
    }
    for (const id of [...opening, ...interior, opening[0]]) {
      const link = page.locator(`[data-photo="${id}"]`);
      const alt = await link.locator('img').getAttribute('alt');
      const full = await link.evaluate((a) => (a as HTMLAnchorElement).href);
      await link.focus();
      await page.keyboard.press('Enter');
      await expect(page.locator('dialog')).toBeVisible();
      const image = page.locator('dialog img');
      await image.evaluate((img) => (img as HTMLImageElement).decode());
      await expect(image).toHaveAttribute('src', full);
      await expect(image).toHaveAttribute('alt', alt!);
      await expect(page.locator('#photo-title')).toHaveText(
        (await link.getAttribute('data-title'))!,
      );
      if (opening.includes(id)) {
        await expect(page.locator('#photo-caption')).toBeVisible();
        await expect(page.locator('#photo-caption')).toContainText('2026');
      } else {
        await expect(page.locator('#photo-caption')).toBeHidden();
        await expect(page.locator('#photo-caption')).toHaveText('');
      }
      await page.keyboard.press('Escape');
      await expect(link).toBeFocused();
    }
  });
}

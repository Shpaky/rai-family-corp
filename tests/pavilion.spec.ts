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
    await expect(toggle).toHaveAttribute('type', 'button');
    await expect(toggle).toHaveAttribute('aria-controls', 'resident-list');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toHaveText((await toggle.getAttribute('data-more'))!);
    await toggle.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-resident]:visible')).toHaveCount(44);
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(toggle).toHaveText((await toggle.getAttribute('data-less'))!);
    await page.keyboard.press('Enter');
    await expect(toggle).toBeFocused();
    await expect(page.locator('[data-resident]:visible')).toHaveCount(12);
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toHaveText((await toggle.getAttribute('data-more'))!);
    const photo = page.locator('[data-photo]').first();
    await photo.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('dialog')).toBeVisible();
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    const close = page.locator('dialog button');
    await expect(close).toBeFocused();
    await expect(close).toHaveAttribute('type', 'submit');
    await page.keyboard.press('Enter');
    await expect(page.locator('dialog')).not.toBeVisible();
    await expect(photo).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('dialog')).toBeVisible();
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
      const frames = await page.locator('[data-photo] img').evaluateAll(async (images) => {
        await document.fonts.ready;
        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
        return Promise.all(
          images.map(async (node) => {
            const img = node as HTMLImageElement;
            img.loading = 'eager';
            await img.decode();
            const { x, y, width, height } = img.getBoundingClientRect();
            return { x, y, width, height, fit: getComputedStyle(img).objectFit };
          }),
        );
      });
      const opening = frames.slice(0, 6);
      expect(opening).toHaveLength(6);
      for (const frame of frames) {
        expect(frame.width / frame.height).toBeCloseTo(4 / 3, 2);
        expect(frame.fit).toBe('contain');
      }
      if (width >= 768) {
        expect(new Set(opening.map((frame) => frame.y)).size).toBe(2);
        for (let i = 0; i < opening.length; i++) {
          const frame = opening[i];
          const interior = frames[6 + (i % 3)];
          expect(Math.abs(frame.x - interior.x)).toBeLessThan(1);
          expect(Math.abs(frame.width - interior.width)).toBeLessThan(1);
          expect(Math.abs(frame.height - interior.height)).toBeLessThan(1);
          expect(frame.y).toBe(opening[i < 3 ? 0 : 3].y);
        }
      } else {
        expect(new Set(opening.map((frame) => frame.x)).size).toBe(1);
        expect(new Set(opening.map((frame) => frame.y)).size).toBe(6);
      }
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
    await expect(page.locator('#residents-toggle')).toBeHidden();
    await expect(page.locator('[data-news]')).toHaveCount(5);
    await page.locator('#news details summary').last().click();
    await expect(page.locator('#news details').last().locator('li')).toHaveCount(6);
    await expect(page.locator('[data-photo]')).toHaveCount(9);
    for (const photo of await page.locator('[data-photo]').all()) {
      await expect(photo).toHaveAttribute('href', /\.webp$/);
    }
    await page.locator('#news details summary').last().focus();
    await page.keyboard.press('Space');
    for (const item of await page.locator('[data-news]').all()) {
      await item.locator('summary').focus();
      await page.keyboard.press('Enter');
      await expect(item).toHaveAttribute('open', '');
      await page.keyboard.press('Space');
      await expect(item).not.toHaveAttribute('open');
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
    const opening = [
      'opening-guests',
      'opening-moment',
      'opening-group',
      'opening-hall',
      'opening-conversations',
      'opening-hall-wide',
    ];
    const interior = ['showroom', 'shelves', 'stage'];
    const ids = await page
      .locator('[data-photo]')
      .evaluateAll((links) => links.map((a) => a.getAttribute('data-photo')));
    expect(ids).toEqual([...opening, ...interior]);
    await expect(page.locator('section[aria-labelledby="gallery-title"] [data-photo]')).toHaveCount(
      6,
    );
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
        await expect(link.locator('time')).toHaveAttribute('datetime', '2026-08-21');
        await expect(link.locator('time')).toHaveText('21.08.2026');
        await expect(page.locator('#photo-caption')).toBeVisible();
        await expect(page.locator('#photo-caption')).toHaveText(
          locale ? 'Нави-Мумбаи · 21 августа 2026' : 'Navi Mumbai · 21 August 2026',
        );
      } else {
        await expect(page.locator('#photo-caption')).toBeHidden();
        await expect(page.locator('#photo-caption')).toHaveText('');
      }
      await page.keyboard.press('Escape');
      await expect(link).toBeFocused();
    }
  });
}

for (const locale of ['', 'ru/']) {
  test(`pavilion visit contacts and locale order: ${locale || 'en'}`, async ({ page }) => {
    await page.goto(`${locale}pavilion/`);
    const ru = {
      phone: '+7 965 157 73 00',
      tel: 'tel:+79651577300',
      whatsapp: 'https://wa.me/79651577300',
    };
    const india = {
      phone: '+91 70457 43899',
      tel: 'tel:+917045743899',
      whatsapp: 'https://wa.me/917045743899',
    };
    const ordered = locale ? [ru, india] : [india, ru];
    const groups = page.locator('[data-visit-contact]');
    await expect(groups).toHaveCount(2);
    for (const [i, contact] of ordered.entries()) {
      const links = groups.nth(i).locator('a');
      await expect(links).toHaveCount(3);
      await expect(links.first()).toHaveText(contact.phone);
      expect(await links.evaluateAll((nodes) => nodes.map((a) => a.getAttribute('href')))).toEqual([
        contact.tel,
        contact.whatsapp,
        contact.tel,
      ]);
      for (const link of await links.all())
        await expect(link).toHaveAccessibleName(new RegExp(contact.phone.replace(/[+]/g, '\\+')));
      await expect(links.nth(1)).toHaveAttribute('target', '_blank');
      await expect(links.nth(1)).toHaveAttribute('rel', 'noopener');
    }
    const links = groups.locator('a');
    await links.first().focus();
    for (let i = 0; i < 6; i++) {
      await expect(links.nth(i)).toBeFocused();
      await page.keyboard.press('Tab');
    }
    await expect(page.locator('#visit a[href="tel:+918369393073"]')).toBeFocused();
    await expect(page.locator('#visit a[href="https://wa.me/918369393073"]')).toHaveCount(0);
    await expect(page.locator('#news article a[href="https://wa.me/917045743899"]')).toHaveCount(2);
    for (const route of ['', 'about/']) {
      await page.goto(locale + route);
      const company = page.locator('section[aria-labelledby="contacts-title"]');
      const numbers = locale
        ? ['+79651577300', '+919082099228']
        : ['+919082099228', '+79651577300'];
      expect(
        await company
          .locator('a[href^="tel:"]')
          .evaluateAll((nodes) => nodes.map((a) => a.getAttribute('href'))),
      ).toEqual(numbers.map((n) => `tel:${n}`));
      expect(
        await company
          .locator('a[href^="https://wa.me/"]')
          .evaluateAll((nodes) => nodes.map((a) => a.getAttribute('href'))),
      ).toEqual(numbers.map((n) => `https://wa.me/${n.slice(1)}`));
    }
  });
}

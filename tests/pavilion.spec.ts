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
    await page.locator('[data-news="pavilion-opening"] summary').click();
    await expect(page.locator('[data-news="pavilion-opening"]').locator('li')).toHaveCount(6);
    await page.locator('[data-news="world-of-concrete-2026"] summary').click();
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
    await expect(page.locator('[data-news]')).toHaveCount(6);
    await page.locator('[data-news="pavilion-opening"] summary').click();
    await expect(page.locator('[data-news="pavilion-opening"]').locator('li')).toHaveCount(6);
    await expect(page.locator('[data-photo]')).toHaveCount(11);
    for (const photo of await page.locator('[data-photo]').all()) {
      await expect(photo).toHaveAttribute('href', /\.webp$/);
    }
    await page.locator('[data-news="pavilion-opening"] summary').focus();
    await page.keyboard.press('Space');
    for (const item of await page.locator('[data-news]').all()) {
      await item.locator('summary').focus();
      await page.keyboard.press('Enter');
      await expect(item).toHaveAttribute('open', '');
      await page.keyboard.press('Space');
      await expect(item).not.toHaveAttribute('open');
    }
    await page.locator('[data-news="world-of-concrete-2026"] summary').click();
    const exhibitionPhoto = page.locator('[data-photo="world-of-concrete-2026-booth"]');
    const fullPhoto = await exhibitionPhoto.getAttribute('href');
    await exhibitionPhoto.click();
    await expect(page).toHaveURL(
      new RegExp(fullPhoto!.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$'),
    );
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
    const exhibition = ['world-of-concrete-2026-booth', 'world-of-concrete-2026-meeting'];
    const ids = await page
      .locator('[data-photo]')
      .evaluateAll((links) => links.map((a) => a.getAttribute('data-photo')));
    expect(ids).toEqual([...opening, ...interior, ...exhibition]);
    await expect(page.locator('section[aria-labelledby="gallery-title"] [data-photo]')).toHaveCount(
      6,
    );
    await expect(page.locator('#about-pavilion [data-photo]')).toHaveCount(3);
    await expect(page.locator('main > section').first().locator('img')).toHaveAttribute(
      'src',
      /meeting-area\./,
    );
    await page.locator('[data-news="pavilion-opening"] summary').click();
    await expect(page.locator('[data-news="pavilion-opening"]').locator('img')).toHaveAttribute(
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
    await page.locator('[data-news="world-of-concrete-2026"] summary').click();
    for (const id of [
      ...opening,
      ...interior,
      ...exhibition,
      opening[0],
      exhibition[0],
      interior[0],
    ]) {
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
      } else if (exhibition.includes(id)) {
        await expect(link.locator('time')).toHaveCount(0);
        await expect(page.locator('#photo-caption')).toBeVisible();
        await expect(page.locator('#photo-caption')).toHaveText(
          locale
            ? 'World of Concrete India 2026, Bombay Exhibition Centre, Мумбаи. 3-5 июня 2026.'
            : 'World of Concrete India 2026, Bombay Exhibition Centre, Mumbai. 3-5 June 2026.',
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
    const groups = page.locator('[data-visit-channel]');
    await expect(groups).toHaveCount(2);
    await expect(groups.nth(0)).toHaveAttribute('data-visit-channel', 'phone');
    await expect(groups.nth(1)).toHaveAttribute('data-visit-channel', 'whatsapp');
    await expect(groups.locator('dt')).toHaveText([locale ? 'Телефон' : 'Phone', 'WhatsApp']);
    await expect(
      page.locator('#visit button, #visit a.rounded-pill, [data-visit-contact]'),
    ).toHaveCount(0);
    for (const [i, channel] of ['tel', 'whatsapp'].entries()) {
      const links = groups.nth(i).locator('dd ul li a');
      await expect(links).toHaveCount(2);
      await expect(links).toHaveText(ordered.map((contact) => contact.phone));
      expect(await links.evaluateAll((nodes) => nodes.map((a) => a.getAttribute('href')))).toEqual(
        ordered.map((contact) => contact[channel as 'tel' | 'whatsapp']),
      );
      for (const [j, contact] of ordered.entries()) {
        await expect(links.nth(j)).toHaveAccessibleName(contact.phone);
        if (channel === 'whatsapp') {
          await expect(links.nth(j)).not.toHaveAttribute('target');
          await expect(links.nth(j)).toHaveAttribute('rel', 'noopener');
        }
      }
    }
    const links = groups.locator('a');
    await links.first().focus();
    for (let i = 0; i < 4; i++) {
      await expect(links.nth(i)).toBeFocused();
      await page.keyboard.press('Tab');
    }
    await expect(page.locator('#visit a[href="tel:+918369393073"]')).toBeFocused();
    await expect(page.locator('#visit a[href="https://wa.me/918369393073"]')).toHaveCount(0);
    const events = page.locator('#news article');
    await expect(events).toHaveCount(2);
    const primary = ordered[0];
    for (const event of await events.all()) {
      const summary = event.locator('summary');
      await summary.focus();
      await page.keyboard.press('Enter');
      await expect(event.locator('details')).toHaveAttribute('open', '');
      await expect(event.locator('details p').last()).toHaveText(
        locale
          ? 'Чтобы договориться о встрече, позвоните или напишите в WhatsApp: ' +
              primary.phone +
              '.'
          : 'To arrange a meeting, call or message us on WhatsApp: ' + primary.phone + '.',
      );
      await expect(event).not.toContainText(ordered[1].phone);
      const meeting = event.getByRole('link', {
        name: locale ? 'Договориться о встрече' : 'Arrange a meeting',
      });
      await expect(event.locator('a')).toHaveCount(1);
      await expect(meeting).toHaveAttribute('href', primary.whatsapp);
      await expect(meeting).toHaveAttribute('target', '_blank');
      await expect(meeting).toHaveAttribute('rel', 'noopener');
      await page.keyboard.press('Tab');
      await expect(meeting).toBeFocused();
    }
    for (const width of [360, 600, 768, 1024, 1280]) {
      await page.setViewportSize({ width, height: 800 });
      const boxes = await groups.evaluateAll((nodes) =>
        nodes.map((node) => {
          const { x, y, width, height } = node.getBoundingClientRect();
          return { x, y, width, height };
        }),
      );
      if (width === 600 || width === 1280) {
        expect(boxes[0].y).toBe(boxes[1].y);
        expect(boxes[1].x).toBeGreaterThan(boxes[0].x + boxes[0].width);
      } else {
        expect(boxes[0].x).toBe(boxes[1].x);
        expect(boxes[1].y).toBeGreaterThan(boxes[0].y + boxes[0].height);
      }
      for (const link of await links.all()) {
        expect(
          await link.evaluate((a) => {
            const range = document.createRange();
            range.selectNodeContents(a);
            const text = range.getBoundingClientRect();
            const block = a.closest('dd')!.getBoundingClientRect();
            return (
              text.left >= block.left &&
              text.right <= block.right &&
              text.height <= parseFloat(getComputedStyle(a).lineHeight)
            );
          }),
        ).toBe(true);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
    }
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

for (const locale of ['', 'ru/']) {
  test(`World of Concrete event and own coverage: ${locale || 'en'}`, async ({ page }) => {
    await page.goto(`${locale}pavilion/`);
    await expect(page.locator('#news article, [data-news]')).toHaveCount(8);
    const event = page.locator('[data-news="world-of-concrete-2026"]');
    await expect(event).toHaveAttribute('id', 'world-of-concrete-2026');
    const dates = await page
      .locator('[data-news] summary time')
      .evaluateAll((nodes) => nodes.map((n) => n.getAttribute('datetime')));
    expect(dates).toEqual([...dates].sort().reverse());
    expect(dates.slice(-2)).toEqual(['2026-08-21', '2026-06-03']);
    await expect(event.locator('summary')).toContainText(
      locale
        ? 'Rai Family Corp LLP на World of Concrete India 2026'
        : 'Rai Family Corp LLP at World of Concrete India 2026',
    );
    await expect(event.locator('summary time')).toHaveText(
      locale ? '3-5 июня 2026' : '3-5 June 2026',
    );
    await expect(event.locator('summary')).toContainText(
      locale ? 'Событие · Мумбаи' : 'Event · Mumbai',
    );
    await expect(event.locator('summary img, summary a')).toHaveCount(0);
    const summary = event.locator('summary');
    await summary.focus();
    await page.keyboard.press('Enter');
    await expect(event).toHaveAttribute('open', '');
    await expect(event).toContainText(
      locale ? 'TOKAR LTD, RUSSIA (4.C90)' : 'TOKAR LTD, RUSSIA stand (4.C90)',
    );
    await expect(
      event.getByRole('heading', {
        name: locale ? 'Публикации о выставке' : 'Exhibition coverage',
      }),
    ).toBeVisible();
    await expect(event).toContainText(
      locale
        ? 'Материалы об отраслевой выставке в целом.'
        : 'Coverage of the exhibition as a whole.',
    );
    await expect(event.locator('[data-photo]')).toHaveCount(2);
    const coverage = event.locator('li a');
    await expect(coverage).toHaveCount(2);
    const urls = [
      'https://www.nbmcw.com/news/reports-insights/world-of-concrete-india-2026-opens-amid-rs-12-2-lakh-cr-infra-push-growing-demand-for-advanced-construction-solutions.html',
      'https://tradefairtimes.com/event-gallery-july-2026/',
    ];
    for (const [i, link] of (await coverage.all()).entries()) {
      await expect(link).toHaveAttribute('href', urls[i]);
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', 'noopener');
      await expect(link.locator('.sr-only')).toContainText(
        locale ? 'откроется в новой вкладке' : 'opens in a new tab',
      );
    }
    await expect(event.locator('li small')).toHaveText(['EN · 04.06.2026', 'EN · 13.07.2026']);
    const opening = page.locator('[data-news="pavilion-opening"]');
    await expect(opening.locator('li a')).toHaveCount(6);
    await expect(opening.locator('img')).toHaveAttribute('src', /opening-hall\./);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await summary.focus();
    await page.keyboard.press('Space');
    await expect(event).not.toHaveAttribute('open');
  });
}

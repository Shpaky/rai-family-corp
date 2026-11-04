import { test, expect } from '@playwright/test';

for (const locale of ['', 'ru/']) {
  test(`manufacturer disclosures and service anchors: ${locale || 'en'}`, async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto(`${locale}manufacturers/`);
    const mobile = page.locator('details[data-collapse="mobile"]');
    for (const item of await mobile.all()) await expect(item).not.toHaveAttribute('open');
    const step = page.locator('section[aria-labelledby="route-title"] details').first();
    await step.locator('summary').focus();
    await page.keyboard.press('Enter');
    await expect(step).toHaveAttribute('open', '');
    const serviceLink = page.locator('a[href^="#services-"]').first();
    const anchor = (await serviceLink.getAttribute('href'))!;
    const service = page.locator(anchor);
    await expect(service).not.toHaveAttribute('open');
    await serviceLink.click();
    await expect(service).toHaveAttribute('open', '');
    await service.locator('summary').focus();
    await page.keyboard.press('Space');
    await expect(service).not.toHaveAttribute('open');
    await page.reload();
    await expect(service).toHaveAttribute('open', '');
    await page.setViewportSize({ width: 1280, height: 800 });
    for (const item of await mobile.all()) await expect(item).toHaveAttribute('open', '');
    await expect(step.locator('summary')).toBeHidden();
    const faq = page.locator('section[aria-labelledby="faq-title"] details').first();
    await expect(faq.locator('summary')).toBeVisible();
    await faq.locator('summary').focus();
    await page.keyboard.press('Enter');
    await expect(faq).not.toHaveAttribute('open');
  });

  test(`manufacturer disclosures without JavaScript: ${locale || 'en'}`, async ({
    browser,
    baseURL,
  }) => {
    const context = await browser.newContext({
      javaScriptEnabled: false,
      baseURL,
      viewport: { width: 360, height: 800 },
    });
    const page = await context.newPage();
    await page.goto(`${locale}manufacturers/`);
    for (const item of await page.locator('details[data-collapse="mobile"]').all()) {
      await expect(item).toHaveAttribute('open', '');
    }
    const service = page.locator('details[id^="services-"]').first();
    await service.locator('summary').focus();
    await page.keyboard.press('Enter');
    await expect(service).toHaveAttribute('open', '');
    await context.close();
  });
}

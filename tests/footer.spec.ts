import { test, expect } from '@playwright/test';

const profiles = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/144693983' },
  { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61593478033031' },
];

for (const locale of ['', 'ru/']) {
  for (const route of ['', 'about/', 'pavilion/']) {
    test(`footer social links: /${locale}${route}`, async ({ page }) => {
      const errors: string[] = [];
      const socialRequests: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('request', (request) => {
        if (/(facebook|linkedin|licdn|fbcdn)/i.test(new URL(request.url()).hostname)) {
          socialRequests.push(request.url());
        }
      });
      await page.goto(locale + route);
      const label = locale ? 'Социальные сети' : 'Social media';
      const note = locale ? 'откроется в новой вкладке' : 'opens in a new tab';
      const nav = page.locator('footer').getByRole('navigation', { name: label });
      await expect(page.getByRole('navigation', { name: label })).toHaveCount(1);
      await expect(nav.getByRole('listitem')).toHaveCount(2);
      const links = nav.getByRole('link');
      await expect(links).toHaveCount(2);
      await expect(page.locator('a[href*="linkedin.com"], a[href*="facebook.com"]')).toHaveCount(2);
      for (const [i, profile] of profiles.entries()) {
        const link = links.nth(i);
        await expect(link).toHaveAttribute('href', profile.url);
        await expect(link).toHaveAttribute('target', '_blank');
        await expect(link).toHaveAttribute('rel', 'noopener');
        await expect(link).toHaveAccessibleName(new RegExp(`^${profile.name}\\s*, ${note}$`));
        await expect(link.locator('.sr-only')).toHaveText(`, ${note}`);
        const icon = link.locator('svg');
        await expect(icon).toHaveAttribute('aria-hidden', 'true');
        await expect(icon).toHaveAttribute('focusable', 'false');
        await expect(icon).toHaveAttribute('viewBox', '0 0 16 16');
        await expect(icon).toHaveAttribute('fill', 'currentColor');
      }
      await links.first().focus();
      for (const link of await links.all()) {
        await expect(link).toBeFocused();
        expect(await link.evaluate((a) => getComputedStyle(a).outlineStyle)).toBe('solid');
        await page.keyboard.press('Tab');
      }
      await expect(
        page
          .locator('footer > div')
          .first()
          .locator(':scope > nav')
          .first()
          .getByRole('link')
          .first(),
      ).toBeFocused();
      expect(errors).toEqual([]);
      expect(socialRequests).toEqual([]);
    });
  }
}

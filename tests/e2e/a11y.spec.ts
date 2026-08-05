import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { waitReady, dropSample } from './_helpers';

// axe inspects the rendered DOM; one engine is representative.
test.describe('accessibility', () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium', 'axe runs on one engine');
  });

  for (const path of ['/pdf-split/', '/pdf-split/ja/']) {
    test(`has no serious or critical axe violations on ${path} (#6)`, async ({ page }) => {
      // Disable the decorative fade-in so axe samples the settled (fully-opaque)
      // state, not a mid-animation frame.
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(path);
      const { violations } = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();
      const blocking = violations.filter(
        (v) => v.impact === 'serious' || v.impact === 'critical'
      );
      expect(blocking.map((v) => `${v.id} (${v.impact})`)).toEqual([]);
    });
  }

  test('has no serious or critical axe violations with the page-thumbnail grid rendered', async ({
    page,
  }) => {
    // The thumbnail grid (#144) only exists once a PDF is loaded — the two
    // checks above never see it. Axe here on the "picking pages" state.
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/pdf-split/');
    await waitReady(page);
    await dropSample(page);
    await expect(page.getByLabel('Page previews')).toBeVisible();
    const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
    const blocking = violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(blocking.map((v) => `${v.id} (${v.impact})`)).toEqual([]);
  });
});

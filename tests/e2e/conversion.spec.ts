import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { PDFDocument } from 'pdf-lib';
import { waitReady, convert, dropSample } from './_helpers';

test.describe('PDF split', () => {
  test('extracts pages into a valid PDF in the browser, no upload', async ({ page }) => {
    const external: string[] = [];
    page.on('request', (req) => {
      const u = req.url();
      if (!u.startsWith('http://localhost:4321') && !u.startsWith('data:') && !u.startsWith('blob:')) {
        external.push(u);
      }
    });
    await page.goto('/pdf-split/');
    await waitReady(page);
    const download = await convert(page);
    expect(download.suggestedFilename()).toMatch(/\.pdf$/);
    const buf = readFileSync((await download.path()) as string);
    expect(buf.subarray(0, 5).toString('latin1')).toBe('%PDF-');
    expect(external, `unexpected cross-origin requests: ${external.join(', ')}`).toHaveLength(0);
  });

  test('clicking a page thumbnail toggles it out of the extracted PDF', async ({ page }) => {
    await page.goto('/pdf-split/');
    await waitReady(page);
    await dropSample(page); // sample.pdf has 5 pages, all selected by default

    const previews = page.getByLabel('Page previews');
    await expect(previews).toBeVisible();
    const pageCounter = page.locator('text=/5 \\/ 5/');
    await expect(pageCounter).toBeVisible();

    // Deselect page 1 by clicking its thumbnail (the same control a screen
    // reader announces via aria-label — this is the accessible name, not a
    // CSS selector into implementation detail).
    const page1Thumb = page.getByRole('button', { name: 'Page 1' });
    await expect(page1Thumb).toHaveAttribute('aria-pressed', 'true');
    await page1Thumb.click();
    await expect(page1Thumb).toHaveAttribute('aria-pressed', 'false');
    await expect(page.locator('text=/4 \\/ 5/')).toBeVisible();
    // The range input (bidirectionally synced with the thumbnail grid) should
    // now read "2-5" instead of "1-5".
    await expect(page.locator('#range-input')).toHaveValue('2-5');

    const downloadPromise = page.waitForEvent('download', { timeout: 30_000 });
    await page.click('#extract-action');
    const download = await downloadPromise;
    const buf = readFileSync((await download.path()) as string);
    const out = await PDFDocument.load(new Uint8Array(buf));
    expect(out.getPageCount()).toBe(4);
  });
});

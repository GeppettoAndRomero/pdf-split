import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { waitReady, convert } from './_helpers';

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
});

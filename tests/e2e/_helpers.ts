import { type Page, type Download } from '@playwright/test';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';

const PDF_B64 = readFileSync(
  fileURLToPath(new URL('../fixtures/pdf/sample.pdf', import.meta.url))
).toString('base64');

export async function waitReady(page: Page) {
  await page.waitForFunction(() => (window as Record<string, unknown>).__toolReady === true);
}

/** pdf-split action: drop a PDF, then extract (range defaults to all pages on load). */
export async function convert(page: Page): Promise<Download> {
  const downloadPromise = page.waitForEvent('download', { timeout: 30_000 });
  await page.evaluate((b64) => {
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    window.dispatchEvent(
      new CustomEvent('filesDropped', {
        detail: [new File([bytes], 'sample.pdf', { type: 'application/pdf' })],
      })
    );
  }, PDF_B64);
  await page.locator('#extract-action').waitFor({ state: 'visible', timeout: 10_000 });
  await page.click('#extract-action');
  return downloadPromise;
}

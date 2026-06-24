/**
 * Split / extract pages from a PDF in the browser (pdf-lib, no server).
 *
 * Range parsing is 1-based and exact (page 1 = the first page). Extraction copies the
 * selected page objects into a new document, so the output opens in any real reader.
 */

import { PDFDocument } from 'pdf-lib';

/** Number of pages in a PDF. Throws a clear error on encrypted/corrupt files. */
export async function getPageCount(file: File): Promise<number> {
  const doc = await loadPdf(file);
  return doc.getPageCount();
}

async function loadPdf(file: File): Promise<PDFDocument> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  try {
    return await PDFDocument.load(bytes);
  } catch (e) {
    const msg = e instanceof Error ? e.message : '';
    if (/encrypt/i.test(msg)) throw new Error('This PDF is password-protected (encrypted).');
    throw new Error('This file is not a readable PDF.');
  }
}

/**
 * Parse a 1-based range spec like "1-3, 5, 8-10" into ASCENDING, de-duplicated
 * 0-based page indices. Throws on malformed input or out-of-range pages.
 */
export function parseRanges(spec: string, pageCount: number): number[] {
  const trimmed = spec.trim();
  if (!trimmed) throw new Error('Enter the pages to extract (e.g. 1-3, 5).');

  const pages = new Set<number>();
  for (const part of trimmed.split(',')) {
    const token = part.trim();
    if (!token) continue;
    const m = token.match(/^(\d+)(?:\s*-\s*(\d+))?$/);
    if (!m) throw new Error(`"${token}" is not a valid page or range.`);
    const start = Number(m[1]);
    const end = m[2] === undefined ? start : Number(m[2]);
    if (start < 1 || end < 1 || start > pageCount || end > pageCount) {
      throw new Error(`Pages must be between 1 and ${pageCount}.`);
    }
    const [lo, hi] = start <= end ? [start, end] : [end, start];
    for (let p = lo; p <= hi; p++) pages.add(p - 1); // → 0-based
  }
  if (pages.size === 0) throw new Error('No pages selected.');
  return [...pages].sort((a, b) => a - b);
}

/** Extract the given 0-based page indices into a new PDF Blob. */
export async function extractPages(file: File, indices0: number[]): Promise<Blob> {
  const src = await loadPdf(file);
  const out = await PDFDocument.create();
  const copied = await out.copyPages(src, indices0);
  copied.forEach((p) => out.addPage(p));
  const bytes = await out.save();
  return new Blob([new Uint8Array(bytes)], { type: 'application/pdf' });
}

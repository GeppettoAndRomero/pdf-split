import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { parseRanges, getPageCount, extractPages } from '@/utils/pdfEngine';
import { PDFDocument } from 'pdf-lib';

const buf = readFileSync(fileURLToPath(new URL('../fixtures/pdf/sample.pdf', import.meta.url)));
const pdf = () => new File([buf], 'sample.pdf', { type: 'application/pdf' });

describe('parseRanges (1-based → 0-based)', () => {
  it('parses ranges and singletons', () => {
    expect(parseRanges('1-3, 5', 5)).toEqual([0, 1, 2, 4]);
  });
  it('sorts and de-duplicates', () => {
    expect(parseRanges('5, 1-3, 2', 5)).toEqual([0, 1, 2, 4]);
  });
  it('accepts a descending range', () => {
    expect(parseRanges('3-1', 5)).toEqual([0, 1, 2]);
  });
  it('rejects out-of-range pages', () => {
    expect(() => parseRanges('6', 5)).toThrow();
    expect(() => parseRanges('0', 5)).toThrow();
  });
  it('rejects malformed input', () => {
    expect(() => parseRanges('a-b', 5)).toThrow();
    expect(() => parseRanges('', 5)).toThrow();
  });
});

describe('pdf extraction', () => {
  it('reads the page count', async () => {
    expect(await getPageCount(pdf())).toBe(5);
  });
  it('extracts exactly the chosen pages into a valid PDF', async () => {
    const blob = await extractPages(pdf(), [0, 2, 4]); // pages 1,3,5
    expect(blob.type).toBe('application/pdf');
    const out = await PDFDocument.load(new Uint8Array(await blob.arrayBuffer()));
    expect(out.getPageCount()).toBe(3);
  });
  it('rejects a non-PDF file', async () => {
    await expect(getPageCount(new File([new Uint8Array([1, 2, 3])], 'x.pdf'))).rejects.toThrow();
  });
});

#!/usr/bin/env node
/**
 * pdf.js ships asset directories it fetches lazily at runtime rather than
 * bundling inline, keyed by a *directory prefix* option passed to
 * `getDocument()` (not a single-file import a bundler can resolve for you):
 *
 *   - `cmaps/`           — character maps for non-Latin (e.g. CJK) embedded
 *                           font encodings. Without `cMapUrl`, a page whose
 *                           text uses a CID-keyed font (common in Japanese/
 *                           Chinese PDFs) can render blank or garbled — the
 *                           exact opposite of what a "confirm this looks
 *                           right before you split/merge" thumbnail is for.
 *   - `standard_fonts/`  — metrics/glyphs for the 14 standard PDF fonts
 *                           (Helvetica, Times, ...) when a PDF references one
 *                           without embedding it.
 *
 * This repo pins `pdfjs-dist@^4.10.38` (matching pdf-extract-text, same
 * version), which does not ship a `wasm/` directory at all — the optional
 * WASM image codecs (and `wasmUrl`) only exist in later pdf.js releases
 * (pdf-to-image is on 6.1.200 and has one). Nothing to copy or wire up here.
 *
 * A `?url` import gives Vite a single hashed URL, not a stable directory
 * prefix these APIs need, so instead this copies the two folders verbatim
 * out of the installed `pdfjs-dist` and into `public/pdf-split/pdfjs/`, where
 * Astro serves them as static files at a fixed, predictable path. Runs on
 * `npm install` (postinstall) so it always matches the installed pdfjs-dist
 * version; the copied output is gitignored (a build artifact, not source).
 *
 * Same script as pdf-extract-text's — copied here per-repo rather than
 * shared, per this repo's polyrepo convention (see
 * handbook/TOOL-ADAPTATION-PLAYBOOK.md).
 */
import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const src = path.resolve(root, 'node_modules/pdfjs-dist');
const dest = path.resolve(root, 'public/pdf-split/pdfjs');

const dirs = ['cmaps', 'standard_fonts'];

if (!existsSync(src)) {
  console.error('[copy-pdfjs-assets] pdfjs-dist not found in node_modules; skipping (run npm install first)');
  process.exit(0);
}

mkdirSync(dest, { recursive: true });
for (const dir of dirs) {
  const from = path.join(src, dir);
  const to = path.join(dest, dir);
  if (!existsSync(from)) {
    console.warn(`[copy-pdfjs-assets] ${dir} not found in installed pdfjs-dist, skipping`);
    continue;
  }
  cpSync(from, to, { recursive: true });
  console.log(`[copy-pdfjs-assets] copied ${dir} -> public/pdf-split/pdfjs/${dir}`);
}

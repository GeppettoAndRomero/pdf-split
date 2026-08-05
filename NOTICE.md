# Third-party notices

The source code in this repository is licensed under the MIT License (see LICENSE).
It redistributes the following third-party components under their own licenses:

## pdfjs-dist — Apache-2.0

- **Package:** [`pdfjs-dist`](https://www.npmjs.com/package/pdfjs-dist)
- **Upstream:** [PDF.js](https://github.com/mozilla/pdf.js) (Mozilla) — parses each
  PDF and rasterizes a page onto a `<canvas>` to draw the page-selection
  thumbnails; the actual page extraction is done separately by pdf-lib.
- **License:** Apache License, Version 2.0.
- **Modifications:** none. The library is used unmodified, as an npm dependency.

A copy of the Apache License, Version 2.0 is available at
<https://www.apache.org/licenses/LICENSE-2.0> and is included within the `pdfjs-dist`
package (`node_modules/pdfjs-dist/LICENSE` in this repository's dependency tree).

`public/pdf-split/pdfjs/` contains two data directories pdf.js fetches on demand at
runtime (not bundled into the JS): `cmaps/` (Adobe's predefined CMaps for CID-keyed
fonts, BSD-style license) and `standard_fonts/` (Foxit's substitute metrics for the
14 standard PDF fonts, BSD-style license, plus the Liberation fonts under the SIL
Open Font License). Both are copied unmodified from `pdfjs-dist`'s own distribution,
and each directory retains its own `LICENSE*` file.

## @zip.js/zip.js — BSD-3-Clause

Copyright (c) 2023, Gildas Lormeau

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright notice, this
   list of conditions and the following disclaimer in the documentation and/or
   other materials provided with the distribution.
3. Neither the name of the copyright holder nor the names of its contributors may
   be used to endorse or promote products derived from this software without
   specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
POSSIBILITY OF SUCH DAMAGE.

Other dependencies — Astro, Preact, @astrojs/preact, and pdf-lib — are distributed under the MIT License.

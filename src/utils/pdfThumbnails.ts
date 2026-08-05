/**
 * PDF ページのサムネイル描画（pdf.js, ブラウザ内・サーバー不要）。
 *
 * これは「見た目の補助（プログレッシブ・エンハンスメント）」専用。ページ数の確定と
 * 実際の抽出/結合は pdf-lib（pdfEngine.ts）が担う。pdf.js の読み込みや描画に失敗しても
 * ツール本体は動作する（サムネイルが出ないだけ）。
 *
 * - pdf.js は動的 import（ブラウザでのみ実行、SSR を汚さない・初期バンドルに載せない）。
 * - worker は同一オリジンのバンドル資産として読み込む（CSP: worker-src 'self' blob:
 *   に準拠、外部リクエストはゼロ）。
 * - isEvalSupported: false（CSP に 'unsafe-eval' が無いため eval を使わせない）。
 * - cMapUrl/standardFontDataUrl は同一オリジンの静的アセット
 *   （scripts/copy-pdfjs-assets.mjs が postinstall で node_modules/pdfjs-dist から
 *   public/pdf-split/pdfjs/ へ複製、pdf-extract-text と同じ構成）。未指定だと CID
 *   フォントを使う PDF（日本語/中国語で多い）のページが空白/文字化けで描画され得る —
 *   「分割位置を確認する」サムネイルの目的そのものを損なうため省略しない。
 */
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

const CMAP_URL = '/pdf-split/pdfjs/cmaps/';
const STANDARD_FONT_DATA_URL = '/pdf-split/pdfjs/standard_fonts/';

// pdf.js 本体は初回に一度だけ動的 import。以降は解決済み Promise を使い回す。
let pdfjsPromise: Promise<any> | null = null;
async function getPdfjs(): Promise<any> {
  if (!pdfjsPromise) {
    pdfjsPromise = import('pdfjs-dist').then((lib: any) => {
      lib.GlobalWorkerOptions.workerSrc = workerUrl;
      return lib;
    });
  }
  return pdfjsPromise;
}

export interface ThumbnailDoc {
  readonly numPages: number;
  /** 1 始まりのページを幅 targetWidth(px) の PNG data URL に描画する。 */
  render(pageNumber: number, targetWidth: number): Promise<string>;
  /** ドキュメントを閉じて worker のリソースを解放する。 */
  destroy(): void;
}

/** File を開いてサムネイル描画用のハンドルを返す。失敗時は例外（呼び出し側で握りつぶす）。 */
export async function openForThumbnails(file: File): Promise<ThumbnailDoc> {
  const pdfjs = await getPdfjs();
  // pdf-lib 側の File.arrayBuffer() とは別コピーを渡す（pdf.js は typed array を
  // worker に転送して detach するため、元 File には触れない）。
  const data = new Uint8Array(await file.arrayBuffer());
  const doc = await pdfjs.getDocument({
    data,
    isEvalSupported: false,
    disableAutoFetch: true,
    disableStream: true,
    cMapUrl: CMAP_URL,
    cMapPacked: true,
    standardFontDataUrl: STANDARD_FONT_DATA_URL,
  }).promise;

  return {
    numPages: doc.numPages,
    async render(pageNumber: number, targetWidth: number): Promise<string> {
      const page = await doc.getPage(pageNumber);
      try {
        const unscaled = page.getViewport({ scale: 1 });
        const scale = Math.max(0.05, targetWidth / unscaled.width);
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.ceil(viewport.width));
        canvas.height = Math.max(1, Math.ceil(viewport.height));
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas 2D context unavailable');
        // 白紙で下地を塗る（背景を描かない PDF でも JPEG が黒くならないように）。
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport }).promise;
        return canvas.toDataURL('image/jpeg', 0.72);
      } finally {
        page.cleanup();
      }
    },
    destroy() {
      doc.destroy();
    },
  };
}

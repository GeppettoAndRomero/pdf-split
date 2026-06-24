/**
 * ConversionManager (pdf-split).
 * PDF を 1 つ受け取り、ページ範囲（1 始まり）を指定して抽出 → 新しい PDF をダウンロード。
 * すべてメインスレッド（pdf-lib、サーバー不要）。
 */

import { useState, useEffect, useCallback } from 'preact/hooks';
import { AppCard } from './AppCard';
import { ErrorToast } from './ErrorToast';
import { getPageCount, parseRanges, extractPages } from '@/utils/pdfEngine';
import { ui } from '@/i18n/ui';

interface ErrorToastItem {
  id: string;
  message: string;
}

interface ConversionManagerProps {
  locale?: string;
}

export function ConversionManager({ locale = 'en' }: ConversionManagerProps) {
  const t = (ui as any)[locale] ?? ui.en;
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [ranges, setRanges] = useState('');
  const [busy, setBusy] = useState(false);
  const [errorToasts, setErrorToasts] = useState<ErrorToastItem[]>([]);

  const showErrorToast = useCallback((message: string) => {
    const id = `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setErrorToasts((prev) => [...prev, { id, message }]);
  }, []);
  const removeErrorToast = useCallback((id: string) => {
    setErrorToasts((prev) => prev.filter((e) => e.id !== id));
  }, []);

  useEffect(() => {
    (globalThis as Record<string, unknown>).__toolReady = true;
  }, []);

  const openPdf = useCallback(
    async (f: File) => {
      setFile(f);
      setPageCount(null);
      try {
        const n = await getPageCount(f);
        setPageCount(n);
        setRanges(`1-${n}`);
      } catch (error) {
        setFile(null);
        showErrorToast(`${f.name}: ${error instanceof Error ? error.message : 'Failed'}`);
      }
    },
    [showErrorToast]
  );

  const handleFiles = useCallback(
    (files: File[]) => {
      const pdf = files.find((f) => f.name.toLowerCase().endsWith('.pdf'));
      if (!pdf) {
        if (files.length > 0) showErrorToast(t.errUnsupported.replace('{name}', files[0].name));
      } else {
        openPdf(pdf);
      }
      window.dispatchEvent(new CustomEvent('filesProcessed'));
    },
    [openPdf, showErrorToast, t]
  );

  useEffect(() => {
    const handler = (e: Event) => handleFiles((e as CustomEvent<File[]>).detail);
    window.addEventListener('filesDropped', handler);
    return () => window.removeEventListener('filesDropped', handler);
  }, [handleFiles]);

  const handleExtract = useCallback(async () => {
    if (!file || pageCount === null || busy) return;
    setBusy(true);
    try {
      const indices = parseRanges(ranges, pageCount);
      const blob = await extractPages(file, indices);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name.replace(/\.pdf$/i, '') + '-pages.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      showErrorToast(error instanceof Error ? error.message : 'Failed');
    } finally {
      setBusy(false);
    }
  }, [file, pageCount, ranges, busy, showErrorToast]);

  return (
    <div>
      <AppCard>
        <div style="margin-bottom: var(--space-4);">
          <h3 style="margin: 0 0 var(--space-1) 0; font-size: var(--fs-4); font-weight: 600;">
            {t.uploadHeading}
          </h3>
          <p style="margin: 0; font-size: var(--fs-2); color: var(--color-subtle);">
            {t.uploadSubtitle}
          </p>
        </div>

        <div
          style={{
            padding: 'var(--space-6)',
            border: '2px dashed var(--color-border)',
            borderRadius: 'var(--radius-md)',
            background: 'var(--color-surface)',
            textAlign: 'center',
            marginBottom: 'var(--space-4)',
            cursor: 'pointer',
          }}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <div style="font-size: 3rem; margin-bottom: var(--space-2);">📄</div>
          <div style="font-size: var(--fs-3); font-weight: 600; margin-bottom: var(--space-2);">
            {t.dropClick}
          </div>
          <div style="font-size: var(--fs-1); color: var(--color-subtle);">{t.dropOr}</div>
          <div style="font-size: var(--fs-1); color: var(--color-subtle); margin-top: var(--space-1);">
            {t.dropSupported}
          </div>
          <input
            id="file-input"
            type="file"
            accept=".pdf,application/pdf"
            onChange={(e) => {
              handleFiles(Array.from(e.currentTarget.files || []));
              e.currentTarget.value = '';
            }}
            style="display: none;"
          />
        </div>

        {file && pageCount !== null && (
          <div style="display: flex; flex-direction: column; gap: var(--space-3);">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{file.name}</strong>
              <span style="font-size: var(--fs-2); color: var(--color-subtle); flex-shrink: 0;" class="num">
                {pageCount} {t.pagesLabel ?? 'pages'}
              </span>
            </div>
            <label style="font-size: var(--fs-2); display: flex; flex-direction: column; gap: var(--space-1);">
              {t.rangeLabel ?? 'Pages to extract'}
              <input
                id="range-input"
                type="text"
                value={ranges}
                placeholder="1-3, 5"
                onInput={(e) => setRanges(e.currentTarget.value)}
                style="padding: var(--space-2) var(--space-3); border: 1px solid var(--color-border); border-radius: var(--radius-sm); background: var(--color-bg); color: var(--color-text); font-size: var(--fs-2);"
              />
            </label>
            <div style="display: flex; justify-content: flex-end;">
              <button
                id="extract-action"
                onClick={handleExtract}
                disabled={busy}
                class="app-button app-button--primary"
              >
                {busy ? (t.extracting ?? 'Extracting…') : (t.extractButton ?? 'Extract pages')}
              </button>
            </div>
          </div>
        )}
      </AppCard>

      {errorToasts.length > 0 && (
        <div className="error-toast-container" aria-label={t.notificationsAria}>
          {errorToasts.map((toast) => (
            <ErrorToast key={toast.id} id={toast.id} message={toast.message} onClose={removeErrorToast} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}

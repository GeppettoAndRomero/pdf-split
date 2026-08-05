/**
 * ConversionManager (pdf-split).
 * PDF を 1 つ受け取り、ページのサムネイルを表示。クリックで抽出するページを選び
 * （テキストのページ範囲入力とも双方向同期）、選んだページを新しい PDF として抽出 →
 * ダウンロード。すべてメインスレッド（サーバー不要）。
 *
 * 役割分担:
 *  - pdf-lib（pdfEngine.ts）… ページ数の確定・抽出という「機能の本体」。
 *  - pdf.js（pdfThumbnails.ts）… サムネイル描画という「見た目の補助」。読み込みに
 *    失敗してもテキストのページ範囲入力で操作でき、ツール本体は動く。
 */

import { useState, useEffect, useCallback, useRef } from 'preact/hooks';
import { AppCard } from './AppCard';
import { ErrorToast } from './ErrorToast';
import { getPageCount, parseRanges, extractPages } from '@/utils/pdfEngine';
import { resolveErrorMessage } from '@/utils/appError';
import { openForThumbnails, type ThumbnailDoc } from '@/utils/pdfThumbnails';
import { ui } from '@/i18n/ui';

interface ErrorToastItem {
  id: string;
  message: string;
}

interface ConversionManagerProps {
  locale?: string;
}

/** 昇順 0 始まりインデックス集合を 1 始まりの範囲文字列（"1-3, 5, 8-10"）へ整形。 */
function formatRanges(indices0: number[]): string {
  if (indices0.length === 0) return '';
  const s = [...indices0].sort((a, b) => a - b);
  const parts: string[] = [];
  let start = s[0];
  let prev = s[0];
  for (let k = 1; k < s.length; k++) {
    if (s[k] === prev + 1) {
      prev = s[k];
      continue;
    }
    parts.push(start === prev ? `${start + 1}` : `${start + 1}-${prev + 1}`);
    start = prev = s[k];
  }
  parts.push(start === prev ? `${start + 1}` : `${start + 1}-${prev + 1}`);
  return parts.join(', ');
}

/** 1 枚のページサムネイル。表示領域に入ったら pdf.js で描画する（遅延レンダリング）。 */
function PageThumb({
  doc,
  page,
  selected,
  onToggle,
  ariaLabel,
}: {
  doc: ThumbnailDoc;
  page: number; // 1 始まり
  selected: boolean;
  onToggle: () => void;
  ariaLabel: string;
}) {
  const [src, setSrc] = useState<string | null>(null);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          doc
            .render(page, 200)
            .then((url) => {
              if (!cancelled) setSrc(url);
            })
            .catch(() => {
              /* サムネイル描画失敗は無視（本体機能には影響しない） */
            });
        }
      },
      { rootMargin: '300px' }
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, [doc, page]);

  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={selected}
      aria-label={ariaLabel}
      onClick={onToggle}
      class="page-thumb"
      data-selected={selected ? 'true' : 'false'}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--space-1)',
        padding: 'var(--space-2)',
        border: `2px solid ${selected ? 'var(--color-primary)' : 'var(--color-border)'}`,
        borderRadius: 'var(--radius-sm)',
        background: selected ? 'color-mix(in srgb, var(--color-primary) 10%, var(--color-bg))' : 'var(--color-bg)',
        cursor: 'pointer',
        transition: 'border-color 0.12s, background 0.12s',
      }}
    >
      <div
        style={{
          width: '100%',
          aspectRatio: '3 / 4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: 'var(--color-surface)',
          borderRadius: '2px',
          opacity: selected ? '1' : '0.85',
        }}
      >
        {src ? (
          <img
            src={src}
            alt=""
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', boxShadow: '0 1px 3px rgba(0,0,0,0.18)' }}
          />
        ) : (
          <span style={{ fontSize: 'var(--fs-1)', color: 'var(--color-subtle)' }}>…</span>
        )}
      </div>
      <span class="num" style={{ fontSize: 'var(--fs-1)', color: selected ? 'var(--color-primary)' : 'var(--color-subtle)', fontWeight: selected ? '600' : '400' }}>
        {page}
      </span>
      {selected && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 'var(--space-1)',
            right: 'var(--space-1)',
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            background: 'var(--color-primary)',
            color: '#fff',
            fontSize: '12px',
            lineHeight: '18px',
            textAlign: 'center',
          }}
        >
          ✓
        </span>
      )}
    </button>
  );
}

export function ConversionManager({ locale = 'en' }: ConversionManagerProps) {
  const t = (ui as any)[locale] ?? ui.en;
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [thumbDoc, setThumbDoc] = useState<ThumbnailDoc | null>(null);
  const [selected, setSelected] = useState<Set<number>>(new Set()); // 0 始まり
  const [rangeText, setRangeText] = useState('');
  const [rangeValid, setRangeValid] = useState(true);
  const [busy, setBusy] = useState(false);
  const [errorToasts, setErrorToasts] = useState<ErrorToastItem[]>([]);
  const thumbDocRef = useRef<ThumbnailDoc | null>(null);

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

  // アンマウント時に開いているサムネイル doc を解放。
  useEffect(() => {
    return () => {
      thumbDocRef.current?.destroy();
      thumbDocRef.current = null;
    };
  }, []);

  const setDoc = useCallback((d: ThumbnailDoc | null) => {
    thumbDocRef.current?.destroy();
    thumbDocRef.current = d;
    setThumbDoc(d);
  }, []);

  const openPdf = useCallback(
    async (f: File) => {
      setFile(f);
      setPageCount(null);
      setSelected(new Set());
      setRangeText('');
      setRangeValid(true);
      setDoc(null);
      // 機能の本体: ページ数を pdf-lib で確定（全 CI ブラウザで実績あり）。
      let n: number;
      try {
        n = await getPageCount(f);
      } catch (error) {
        setFile(null);
        showErrorToast(`${f.name}: ${resolveErrorMessage(error, t)}`);
        return;
      }
      setPageCount(n);
      const all = new Set<number>();
      for (let i = 0; i < n; i++) all.add(i);
      setSelected(all);
      setRangeText(`1-${n}`);
      // 見た目の補助: サムネイルは pdf.js（失敗しても無視 = 本体は動く）。
      try {
        const doc = await openForThumbnails(f);
        setDoc(doc);
      } catch {
        /* サムネイルなし。ページ範囲入力で操作可能。 */
      }
    },
    [setDoc, showErrorToast, t]
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

  // 選択（真の状態）→ ページ範囲テキストへ反映。入力中（フォーカス時）は上書きしない。
  // 状態更新は関数型で行い、同一フレーム内の連続トグルが取りこぼされないようにする。
  useEffect(() => {
    const el = document.getElementById('range-input');
    if (el && document.activeElement === el) return;
    setRangeText(formatRanges([...selected]));
    setRangeValid(true);
  }, [selected]);

  const togglePage = useCallback((i: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelected(() => {
      const all = new Set<number>();
      for (let i = 0; i < (pageCount ?? 0); i++) all.add(i);
      return all;
    });
  }, [pageCount]);

  const clearSelection = useCallback(() => setSelected(new Set()), []);

  const invertSelection = useCallback(() => {
    setSelected((prev) => {
      const next = new Set<number>();
      for (let i = 0; i < (pageCount ?? 0); i++) if (!prev.has(i)) next.add(i);
      return next;
    });
  }, [pageCount]);

  // テキスト範囲 → 選択へ反映（不正な入力は選択を変えず印だけ付ける）。
  const onRangeInput = useCallback(
    (value: string) => {
      setRangeText(value);
      if (pageCount === null) return;
      try {
        const idx = parseRanges(value, pageCount);
        setSelected(new Set(idx));
        setRangeValid(true);
      } catch {
        setRangeValid(false);
      }
    },
    [pageCount]
  );

  const handleExtract = useCallback(async () => {
    if (!file || pageCount === null || busy) return;
    const indices = [...selected].sort((a, b) => a - b);
    if (indices.length === 0) {
      showErrorToast(t.errNoPages ?? 'Select at least one page to extract.');
      return;
    }
    setBusy(true);
    try {
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
      showErrorToast(resolveErrorMessage(error, t));
    } finally {
      setBusy(false);
    }
  }, [file, pageCount, selected, busy, showErrorToast, t]);

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
            <div style="display: flex; justify-content: space-between; align-items: center; gap: var(--space-3);">
              <strong style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{file.name}</strong>
              <span style="font-size: var(--fs-2); color: var(--color-subtle); flex-shrink: 0;" class="num">
                {selected.size} / {pageCount} {t.pagesLabel ?? 'pages'}
              </span>
            </div>

            <div style="display: flex; flex-wrap: wrap; gap: var(--space-2); align-items: center;">
              <button type="button" class="app-button app-button--secondary" onClick={selectAll}>
                {t.selectAllPages ?? 'Select all'}
              </button>
              <button type="button" class="app-button app-button--secondary" onClick={invertSelection}>
                {t.invertSelection ?? 'Invert'}
              </button>
              <button type="button" class="app-button app-button--secondary" onClick={clearSelection}>
                {t.clearSelection ?? 'Clear'}
              </button>
            </div>

            {thumbDoc ? (
              <div
                aria-label={t.previewsAria ?? 'Page previews'}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))',
                  gap: 'var(--space-2)',
                  maxHeight: '460px',
                  overflowY: 'auto',
                  padding: 'var(--space-1)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--color-surface)',
                }}
              >
                {Array.from({ length: pageCount }, (_, i) => (
                  <PageThumb
                    key={i}
                    doc={thumbDoc}
                    page={i + 1}
                    selected={selected.has(i)}
                    onToggle={() => togglePage(i)}
                    ariaLabel={(t.pageAria ?? 'Page {n}').replace('{n}', String(i + 1))}
                  />
                ))}
              </div>
            ) : (
              <div style="font-size: var(--fs-1); color: var(--color-subtle);">{t.loadingPreviews ?? 'Rendering page previews…'}</div>
            )}

            <label style="font-size: var(--fs-2); display: flex; flex-direction: column; gap: var(--space-1);">
              {t.rangeLabel ?? 'Pages to extract'}
              <input
                id="range-input"
                type="text"
                value={rangeText}
                placeholder="1-3, 5"
                onInput={(e) => onRangeInput(e.currentTarget.value)}
                aria-invalid={rangeValid ? 'false' : 'true'}
                style={{
                  padding: 'var(--space-2) var(--space-3)',
                  border: `1px solid ${rangeValid ? 'var(--color-border)' : 'var(--color-danger)'}`,
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--color-bg)',
                  color: 'var(--color-text)',
                  fontSize: 'var(--fs-2)',
                }}
              />
            </label>

            <div style="display: flex; justify-content: flex-end;">
              <button
                id="extract-action"
                onClick={handleExtract}
                disabled={busy || selected.size === 0}
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

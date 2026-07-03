import { describe, it, expect } from 'vitest';
import { AppError, resolveErrorMessage } from '@/utils/appError';
import { ui } from '@/i18n/ui';

describe('resolveErrorMessage', () => {
  it('maps an AppError code to the localized string per locale', () => {
    expect(resolveErrorMessage(new AppError('errPdfEncrypted'), ui.en)).toBe(
      'This PDF is password-protected (encrypted).'
    );
    expect(resolveErrorMessage(new AppError('errPdfEncrypted'), ui.ja)).toBe(
      'この PDF はパスワードで保護されています（暗号化）。'
    );
    expect(resolveErrorMessage(new AppError('errPdfUnreadable'), ui.de)).toBe(
      'Diese Datei ist kein lesbares PDF.'
    );
  });

  it('substitutes params', () => {
    expect(resolveErrorMessage(new AppError('errRangeInvalid', { token: 'x-y' }), ui.en)).toBe(
      '"x-y" is not a valid page or range.'
    );
    expect(resolveErrorMessage(new AppError('errPageOutOfRange', { n: 5 }), ui.es)).toBe(
      'Las páginas deben estar entre 1 y 5.'
    );
  });

  it('resolves a bare code string (worker-forwarded message)', () => {
    expect(resolveErrorMessage('errNoPagesSelected', ui.zh)).toBe('未选择任何页面。');
  });

  it('falls back to the localized generic message for unknown/internal errors', () => {
    expect(resolveErrorMessage(new Error('Canvas 2D context unavailable'), ui.ja)).toBe(
      ui.ja.errConversionFailed
    );
    expect(resolveErrorMessage(undefined, ui.de)).toBe(ui.de.errConversionFailed);
  });

  it('every locale defines all mapped error codes', () => {
    const codes = [
      'errPdfEncrypted',
      'errPdfUnreadable',
      'errRangeEmpty',
      'errRangeInvalid',
      'errPageOutOfRange',
      'errNoPagesSelected',
      'errConversionFailed',
    ];
    for (const loc of ['en', 'ja', 'zh', 'de', 'es'] as const) {
      for (const c of codes) expect((ui as any)[loc][c], `${loc}.${c}`).toBeTruthy();
    }
  });
});

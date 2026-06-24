/**
 * Preact アイランド（クライアント UI）の文言。ロケール別。
 * ページレベル content (`en.ts` / `ja.ts`) とは別に、インタラクティブな
 * アイランドが表示する文字列をここに集約する。
 *
 * 重要: アイランドは locale を PROP で受け取り（SSR 時に存在）、
 * `document` 等から読まない。SSR とクライアントで同一文字列を描画して
 * hydration mismatch を防ぐ。
 *
 * 補間文字列は `{name}` / `{count}` のテンプレートを持ち、
 * アイランド側で `.replace('{name}', x)` する。
 */
export const ui = {
  en: {
    // ConversionManager
    uploadHeading: 'Upload files',
    uploadSubtitle: 'Choose a PDF to split.',
    dropClick: 'Click to choose files',
    dropOr: 'or drop files anywhere on the page',
    dropSupported: 'PDF files',
    settingsButton: 'Settings',
    pagesLabel: 'pages', rangeLabel: 'Pages to extract', extractButton: 'Extract pages', extracting: 'Extracting…',
    openSettingsAria: 'Open settings',
    statTotal: 'Total',
    statProcessing: 'Processing',
    statDone: 'Done',
    statFailed: 'Failed',
    failedDownloadTitle: 'Automatic download failed',
    failedDownloadDesc:
      'The following files could not be downloaded automatically. Please download them manually.',
    clearAll: 'Clear all',
    convertedManual: 'Conversion complete - manual download required',
    download: 'Download',
    notificationsAria: 'Notifications',
    conversionSettings: 'Conversion settings',
    errUnsupported:
      'Not a PDF file ({name}).',
    errConversionFailed: 'Conversion failed',
    errDownloadFailed: 'Download failed',

    // SettingsPanel
    outputFormat: 'Output format',
    required: 'Required',
    jpgQuality: 'JPG quality',
    jpgQualityHelp: 'Higher quality means larger file size',
    resize: 'Resize',
    resizeNone: 'No resize',
    resizeContain: 'Fit within max size (keep aspect ratio)',
    resizeCover: 'Fill max size (keep aspect ratio)',
    resizeHelpContain: 'Contain: scale down so the whole image fits within the max size',
    resizeHelpCover: 'Cover: scale down to fill the max size (overflow is cropped)',
    maxWidth: 'Max width (pixels)',
    maxHeight: 'Max height (pixels)',
    keepMetadata: 'Keep EXIF/ICC metadata',
    keepMetadataHelp: 'Unchecking reduces file size',
    timeout: 'Timeout (seconds)',
    timeoutHelp: 'Processing timeout per file',

    // ToastNotification
    stWaiting: 'Waiting',
    stFailed: 'Failed',
    stDone: 'Done',
    phDecoding: 'Decoding',
    phResizing: 'Resizing',
    phEncoding: 'Encoding',
    phProcessing: 'Processing',

    // InstallPrompt
    installHeading: 'Install app',
    installBody: 'Add to your home screen for quick access.',
    install: 'Install',
    later: 'Later',

    // GlobalDropZone
    dzProcessing: 'Processing {count} file(s)...',
    dzPleaseWait: 'Please wait',
    dzDropTitle: 'Drop files to convert',
    dzDropSub: 'Drop a PDF to split its pages',

    // ThemeToggle
    themeToLight: 'Switch to light mode',
    themeToDark: 'Switch to dark mode',
    themeLabel: 'Theme',

    // shared
    close: 'Close',
  },
  ja: {
    // ConversionManager
    uploadHeading: 'ファイルを選ぶ',
    uploadSubtitle: '分割したい PDF を選んでください。',
    dropClick: 'クリックして選択',
    dropOr: 'またはページ上にドロップ',
    dropSupported: 'PDF ファイル',
    settingsButton: '設定',
    pagesLabel: 'ページ', rangeLabel: '抽出するページ', extractButton: 'ページを抽出', extracting: '抽出中…',
    openSettingsAria: '設定を開く',
    statTotal: '合計',
    statProcessing: '処理中',
    statDone: '完了',
    statFailed: '失敗',
    failedDownloadTitle: '自動ダウンロードに失敗',
    failedDownloadDesc:
      '以下のファイルは自動でダウンロードできませんでした。手動でダウンロードしてください。',
    clearAll: 'すべてクリア',
    convertedManual: '変換済み — 手動でダウンロードしてください',
    download: 'ダウンロード',
    notificationsAria: '通知',
    conversionSettings: '変換設定',
    errUnsupported:
      'PDF ファイルではありません（{name}）。',
    errConversionFailed: '変換に失敗しました',
    errDownloadFailed: 'ダウンロードに失敗しました',

    // SettingsPanel
    outputFormat: '出力形式',
    required: '必須',
    jpgQuality: 'JPG 画質',
    jpgQualityHelp: '画質を上げるほどファイルサイズは大きくなります',
    resize: 'リサイズ',
    resizeNone: 'リサイズしない',
    resizeContain: '最大サイズに収める（縦横比を保持）',
    resizeCover: '最大サイズを満たす（縦横比を保持）',
    resizeHelpContain: '収める: 画像全体が最大サイズ内に収まるよう縮小します',
    resizeHelpCover: '満たす: 最大サイズを満たすよう縮小します（はみ出しは切り取り）',
    maxWidth: '最大幅（ピクセル）',
    maxHeight: '最大高さ（ピクセル）',
    keepMetadata: 'EXIF / ICC メタデータを保持',
    keepMetadataHelp: 'オフにするとファイルサイズが小さくなります',
    timeout: 'タイムアウト（秒）',
    timeoutHelp: '1 ファイルあたりの処理タイムアウト',

    // ToastNotification
    stWaiting: '待機中',
    stFailed: '失敗',
    stDone: '完了',
    phDecoding: 'デコード中',
    phResizing: 'リサイズ中',
    phEncoding: 'エンコード中',
    phProcessing: '処理中',

    // InstallPrompt
    installHeading: 'アプリを追加',
    installBody: 'ホーム画面に追加すると、すぐに開けます。',
    install: '追加',
    later: 'あとで',

    // GlobalDropZone
    dzProcessing: '{count} 件のファイルを処理中…',
    dzPleaseWait: 'お待ちください',
    dzDropTitle: 'ドロップで変換',
    dzDropSub: 'PDF をドロップしてページを分割',

    // ThemeToggle
    themeToLight: 'ライトモードに切り替え',
    themeToDark: 'ダークモードに切り替え',
    themeLabel: 'テーマ',

    // shared
    close: '閉じる',
  },
  zh: {
    // ConversionManager
    uploadHeading: '选择文件',
    uploadSubtitle: '选择要拆分的 PDF。',
    dropClick: '点击选择文件',
    dropOr: '或把文件拖到页面任意位置',
    dropSupported: 'PDF 文件',
    settingsButton: '设置',
    pagesLabel: '页', rangeLabel: '要提取的页面', extractButton: '提取页面', extracting: '正在提取…',
    openSettingsAria: '打开设置',
    statTotal: '合计',
    statProcessing: '处理中',
    statDone: '完成',
    statFailed: '失败',
    failedDownloadTitle: '自动下载失败',
    failedDownloadDesc: '以下文件无法自动下载，请手动下载。',
    clearAll: '全部清除',
    convertedManual: '已转换 — 请手动下载',
    download: '下载',
    notificationsAria: '通知',
    conversionSettings: '转换设置',
    errUnsupported: '不是 PDF 文件（{name}）。',
    errConversionFailed: '转换失败',
    errDownloadFailed: '下载失败',

    // SettingsPanel
    outputFormat: '输出格式',
    required: '必填',
    jpgQuality: 'JPG 质量',
    jpgQualityHelp: '质量越高，文件体积越大',
    resize: '调整尺寸',
    resizeNone: '不调整',
    resizeContain: '缩放到最大尺寸以内（保持宽高比）',
    resizeCover: '填满最大尺寸（保持宽高比）',
    resizeHelpContain: '包含：缩小图片，使整张图片落在最大尺寸以内',
    resizeHelpCover: '覆盖：缩小图片以填满最大尺寸（超出部分会被裁剪）',
    maxWidth: '最大宽度（像素）',
    maxHeight: '最大高度（像素）',
    keepMetadata: '保留 EXIF / ICC 元数据',
    keepMetadataHelp: '取消勾选可减小文件体积',
    timeout: '超时（秒）',
    timeoutHelp: '每个文件的处理超时时间',

    // ToastNotification
    stWaiting: '等待中',
    stFailed: '失败',
    stDone: '完成',
    phDecoding: '解码中',
    phResizing: '调整尺寸中',
    phEncoding: '编码中',
    phProcessing: '处理中',

    // InstallPrompt
    installHeading: '安装应用',
    installBody: '添加到主屏幕，方便随时打开。',
    install: '安装',
    later: '以后再说',

    // GlobalDropZone
    dzProcessing: '正在处理 {count} 个文件…',
    dzPleaseWait: '请稍候',
    dzDropTitle: '拖放即可转换',
    dzDropSub: '拖入 PDF 以拆分页面',

    // ThemeToggle
    themeToLight: '切换到浅色模式',
    themeToDark: '切换到深色模式',
    themeLabel: '主题',

    // shared
    close: '关闭',
  },
  de: {
    // ConversionManager
    uploadHeading: 'Dateien auswählen',
    uploadSubtitle: 'Wähle ein PDF zum Teilen.',
    dropClick: 'Zum Auswählen klicken',
    dropOr: 'oder Dateien irgendwo auf die Seite ziehen',
    dropSupported: 'PDF-Dateien',
    settingsButton: 'Einstellungen',
    pagesLabel: 'Seiten', rangeLabel: 'Zu extrahierende Seiten', extractButton: 'Seiten extrahieren', extracting: 'Wird extrahiert…',
    openSettingsAria: 'Einstellungen öffnen',
    statTotal: 'Gesamt',
    statProcessing: 'Läuft',
    statDone: 'Fertig',
    statFailed: 'Fehlgeschlagen',
    failedDownloadTitle: 'Automatischer Download fehlgeschlagen',
    failedDownloadDesc:
      'Die folgenden Dateien konnten nicht automatisch heruntergeladen werden. Bitte lade sie manuell herunter.',
    clearAll: 'Alle entfernen',
    convertedManual: 'Umgewandelt – bitte manuell herunterladen',
    download: 'Herunterladen',
    notificationsAria: 'Benachrichtigungen',
    conversionSettings: 'Umwandlungs-Einstellungen',
    errUnsupported:
      'Keine PDF-Datei ({name}).',
    errConversionFailed: 'Umwandlung fehlgeschlagen',
    errDownloadFailed: 'Download fehlgeschlagen',

    // SettingsPanel
    outputFormat: 'Ausgabeformat',
    required: 'Erforderlich',
    jpgQuality: 'JPG-Qualität',
    jpgQualityHelp: 'Höhere Qualität bedeutet größere Dateien',
    resize: 'Größe ändern',
    resizeNone: 'Keine Änderung',
    resizeContain: 'In Maximalgröße einpassen (Seitenverhältnis beibehalten)',
    resizeCover: 'Maximalgröße ausfüllen (Seitenverhältnis beibehalten)',
    resizeHelpContain: 'Einpassen: verkleinern, sodass das ganze Bild in die Maximalgröße passt',
    resizeHelpCover: 'Ausfüllen: verkleinern, um die Maximalgröße auszufüllen (Überstand wird beschnitten)',
    maxWidth: 'Maximale Breite (Pixel)',
    maxHeight: 'Maximale Höhe (Pixel)',
    keepMetadata: 'EXIF-/ICC-Metadaten behalten',
    keepMetadataHelp: 'Deaktivieren verringert die Dateigröße',
    timeout: 'Zeitlimit (Sekunden)',
    timeoutHelp: 'Verarbeitungs-Zeitlimit pro Datei',

    // ToastNotification
    stWaiting: 'Wartet',
    stFailed: 'Fehlgeschlagen',
    stDone: 'Fertig',
    phDecoding: 'Dekodieren',
    phResizing: 'Größe ändern',
    phEncoding: 'Kodieren',
    phProcessing: 'Verarbeiten',

    // InstallPrompt
    installHeading: 'App installieren',
    installBody: 'Zum Startbildschirm hinzufügen, um es direkt zu öffnen.',
    install: 'Installieren',
    later: 'Später',

    // GlobalDropZone
    dzProcessing: '{count} Datei(en) werden verarbeitet …',
    dzPleaseWait: 'Bitte warten',
    dzDropTitle: 'Dateien zum Umwandeln ablegen',
    dzDropSub: 'Lege ein PDF ab, um Seiten zu teilen',

    // ThemeToggle
    themeToLight: 'Zum hellen Modus wechseln',
    themeToDark: 'Zum dunklen Modus wechseln',
    themeLabel: 'Design',

    // shared
    close: 'Schließen',
  },
  es: {
    // ConversionManager
    uploadHeading: 'Seleccionar archivos',
    uploadSubtitle: 'Elige un PDF para dividir.',
    dropClick: 'Haz clic para elegir archivos',
    dropOr: 'o suelta archivos en cualquier parte de la página',
    dropSupported: 'Archivos PDF',
    settingsButton: 'Configuración',
    pagesLabel: 'páginas', rangeLabel: 'Páginas a extraer', extractButton: 'Extraer páginas', extracting: 'Extrayendo…',
    openSettingsAria: 'Abrir configuración',
    statTotal: 'Total',
    statProcessing: 'Procesando',
    statDone: 'Listo',
    statFailed: 'Con error',
    failedDownloadTitle: 'La descarga automática falló',
    failedDownloadDesc: 'Los siguientes archivos no se pudieron descargar de forma automática. Descárgalos manualmente.',
    clearAll: 'Quitar todo',
    convertedManual: 'Conversión terminada: hay que descargar manualmente',
    download: 'Descargar',
    notificationsAria: 'Notificaciones',
    conversionSettings: 'Ajustes de conversión',
    errUnsupported: 'No es un archivo PDF ({name}).',
    errConversionFailed: 'La conversión falló',
    errDownloadFailed: 'La descarga falló',

    // SettingsPanel
    outputFormat: 'Formato de salida',
    required: 'Obligatorio',
    jpgQuality: 'Calidad del JPG',
    jpgQualityHelp: 'A mayor calidad, mayor tamaño de archivo',
    resize: 'Cambiar tamaño',
    resizeNone: 'Sin cambio de tamaño',
    resizeContain: 'Ajustar dentro del tamaño máximo (mantener proporción)',
    resizeCover: 'Rellenar el tamaño máximo (mantener proporción)',
    resizeHelpContain: 'Ajustar: reduce la imagen para que quepa entera dentro del tamaño máximo',
    resizeHelpCover: 'Rellenar: reduce la imagen para llenar el tamaño máximo (lo que sobra se recorta)',
    maxWidth: 'Ancho máximo (píxeles)',
    maxHeight: 'Alto máximo (píxeles)',
    keepMetadata: 'Mantener metadatos EXIF/ICC',
    keepMetadataHelp: 'Desmarcarlo reduce el tamaño del archivo',
    timeout: 'Tiempo de espera (segundos)',
    timeoutHelp: 'Límite de tiempo de procesamiento por archivo',

    // ToastNotification
    stWaiting: 'En espera',
    stFailed: 'Con error',
    stDone: 'Listo',
    phDecoding: 'Decodificando',
    phResizing: 'Cambiando tamaño',
    phEncoding: 'Codificando',
    phProcessing: 'Procesando',

    // InstallPrompt
    installHeading: 'Instalar la app',
    installBody: 'Añádela a tu pantalla de inicio para tenerla siempre a mano.',
    install: 'Instalar',
    later: 'Más tarde',

    // GlobalDropZone
    dzProcessing: 'Procesando {count} archivo(s)...',
    dzPleaseWait: 'Espera un momento',
    dzDropTitle: 'Suelta los archivos para convertir',
    dzDropSub: 'Suelta un PDF para dividir sus páginas',

    // ThemeToggle
    themeToLight: 'Cambiar al modo claro',
    themeToDark: 'Cambiar al modo oscuro',
    themeLabel: 'Tema',

    // shared
    close: 'Cerrar',
  },
} as const;

export type UiStrings = (typeof ui)['en'];

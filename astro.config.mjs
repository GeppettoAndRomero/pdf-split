import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  integrations: [preact()],
  output: 'static',
  // slug-first 名前空間: ツールを runlocally.app/pdf-split/ 配下に「物理配置」する
  // （src/pages/pdf-split/ + public/pdf-split/）。base は使わない（base は URL に
  // prefix を付けるが dist を入れ子化せず、ルート配信の Pages と不整合になるため）。
  // バンドルアセットも /pdf-split/_assets/ に隔離し hub/他ツールと無衝突にする。
  build: {
    inlineStylesheets: 'auto',
    assets: 'pdf-split/_assets',
  },
  vite: {
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    // worker は module worker（{ type: 'module' }）。imagePipeline.ts を worker と
    // メインスレッドで共有するとコード分割が発生し、iife では不可になるため es に固定。
    worker: {
      format: 'es'
    },
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['preact', 'preact/hooks'],
            'zip': ['@zip.js/zip.js']
          }
        }
      }
    }
  },
  compressHTML: true,
  scopedStyleStrategy: 'class'
});

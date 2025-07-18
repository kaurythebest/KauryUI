import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  base: "/KauryUI/", // 🔥 Nécessaire pour GitHub Pages
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        lib: resolve(__dirname, 'src/lib/index.ts')
      },
      output: {
        format: 'es',
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'lib') {
            return 'kauryui.js';
          }
          return '[name]-[hash].js';
        }
      }
    },
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'KauryUI',
      fileName: 'kauryui',
      formats: ['es', 'umd']
    }
  }
});

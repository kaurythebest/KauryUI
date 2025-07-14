import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
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
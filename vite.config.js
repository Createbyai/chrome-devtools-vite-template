import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import copy from 'rollup-plugin-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 不再需要复制panel.html到根目录，因为它已经在那里了
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, 'panel.html'),
      output: {
        entryFileNames: 'panel.js',
        chunkFileNames: 'vendor/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'assets/panel.css';
          return 'assets/[name].[ext]';
        },
      },
      plugins: [
        copy({
          targets: [
            {
              src: 'src/icons',
              dest: 'dist' 
            },
            {
              src: 'src/manifest.json',
              dest: 'dist'
            },
            {
              src: 'src/background.js',
              dest: 'dist'
            },
            {
              src: 'src/devtools.html',
              dest: 'dist'
            },
            {
              src: 'src/devtools.js',
              dest: 'dist'
            }
          ],
          hook: 'writeBundle'
        })
      ]
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})

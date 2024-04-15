import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import electron from 'vite-plugin-electron'
import Icons from 'unplugin-icons/vite'
import MarkdownPlugin from 'vite-plugin-markdown'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    // VueDevTools(),
    Icons(),
    MarkdownPlugin({
      mode: ['vue'],
    }),
    electron({
      entry: 'main.js'
    })
  ],
  server: {
    // 端口
    port: 3000
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import electron from 'vite-plugin-electron'
import Icons from 'unplugin-icons/vite'
import MarkdownPlugin from 'vite-plugin-markdown'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import dayjs from 'dayjs'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    modulePreload: false,
    assetsDir: 'assets',  //指定生成静态资源的存放路径
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        manualChunks: {
          vue: ['vue'],
          vendor: ['vue-router','vue-i18n','lodash', 'dayjs', 'pinia'],
          element: ['element-plus']
        }
      }
    }
  },
  define: {
    __BUILD_TIME__: JSON.stringify(dayjs().format('YYYY-MM-DD HH:mm:ss'))
  },
  plugins: [
    vue(),
    VueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    Icons(),
    MarkdownPlugin({
      mode: ['vue']
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

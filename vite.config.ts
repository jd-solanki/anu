import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import { anuVueSrc } from './scripts/paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    dedupe: ['vue'],
    alias: {
      '@anu-vue/core': anuVueSrc,
    },
  },
})

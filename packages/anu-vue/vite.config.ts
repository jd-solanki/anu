import { resolve } from 'node:path'
import { URL, fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import { defineConfig } from 'vitest/config'
import vueJsx from '@vitejs/plugin-vue-jsx'

const externals = [
  'vue',
  '@floating-ui/vue',
  'colord',
  'defu',
]

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'anu-vue',
      fileName: 'anu-vue',
    },
    emptyOutDir: false,
    outDir: 'dist',
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: externals,
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          'vue': 'Vue',
          '@floating-ui/vue': 'FloatingVue',
          'colord': 'Colord',
          'defu': 'Defu',
        },
      },
    },
  },
  plugins: [
    VueMacros({
      plugins: {
        vue: vue(),
      },
    }),
    vueJsx(),
    AutoImport({
      imports: ['vue', '@vueuse/core'],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setup.vitest.ts'],
    transformMode: {
      web: [/.[tj]sx$/],
    },
  },
})

import { resolve } from 'node:path'
import { URL, fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import { defineConfig } from 'vitest/config'

function noop() {}

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
      // betterDefine: {
      //   include: [/\.vue(\?v=\d+)?$/],
      // },
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
    dedupe: ['vue'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    // exclude: ['vitest', 'vitest/utils', 'vitest/browser', 'vitest/runners', '@vitest/utils'],
    include: [
      ...externals,

      // '@vitest/utils > concordance',
      // '@vitest/utils > loupe',
      // '@vitest/utils > pretty-format',
      // 'vitest > chai',
    ],
  },
  test: {
    // globals: true,
    // environment: 'jsdom',
    include: ['test/*.test.*'],
    open: true,
    isolate: false,
    browser: {
      enabled: true,
      name: 'chrome',
      headless: false,
      provider: 'webdriverio',
    },
    reporters: ['json', {
      onInit: noop,
      onPathsCollected: noop,
      onCollected: noop,
      onFinished: noop,
      onTaskUpdate: noop,
      onTestRemoved: noop,
      onWatcherStart: noop,
      onWatcherRerun: noop,
      onServerRestart: noop,
      onUserConsoleLog: noop,
    }, 'default'],
    setupFiles: ['./test/setup.vitest.ts'],

    // transformMode: {
    //   web: [/.[tj]sx$/],
    // },
  },
})

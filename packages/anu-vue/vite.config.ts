import { resolve } from 'path'
import { URL, fileURLToPath } from 'url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const externals = [
  'vue',
  '@floating-ui/dom',
]

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'anu-vue',
      fileName: 'anu-vue',
    },
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
          '@floating-ui/dom': 'FloatingDom',
        },
      },
    },
  },
  plugins: [vue(), vueJsx(), dts({
    outputDir: 'dist/types',
    insertTypesEntry: true,
  })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

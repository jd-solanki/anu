import { resolve } from 'node:path'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig, mergeConfig } from 'vitest/config'
import viteBaseConfig from '../../vite.config'

const externals = [
  'vue',
  '@floating-ui/vue',
  'colord',
  'defu',
]

// https://vitejs.dev/config/
export default mergeConfig(viteBaseConfig, defineConfig({
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
    AutoImport({
      imports: ['vue', '@vueuse/core'],
    }),
  ],
  resolve: {
    dedupe: ['vue'],
  },
}))

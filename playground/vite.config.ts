import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'

const pathSrc = path.resolve(__dirname, 'src')

export default defineConfig(() => {
  return {
    resolve: {
      alias: { '@': pathSrc },
    },
    plugins: [
      vue(),
      AutoImport({
        dirs: [path.resolve(pathSrc, 'composables')],
        imports: ['vue', '@vueuse/core'],
        dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
      }),
      Unocss(),
      Inspect(),
    ],
  }
})

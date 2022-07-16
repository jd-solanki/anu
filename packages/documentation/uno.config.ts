import { presetCore, presetThemeDefault } from 'anu-vue'
import {
  defineConfig,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      unit: 'em',
      extraProperties: {
        'height': '1.5em',
        'flex-shrink': '0',
      },
    }),

    // anu-vue presets
    presetCore(),
    presetThemeDefault(),
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
  configDeps: ['../anu-vue/src/presets/theme-default/index.ts'],
  include: [/.*\/anu-vue\.js(.*)?$/, './**/*.vue', './**/*.md'],
})

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
        'height': '1.2em',
        'width': '1.2em',

        // ℹ️ We also have to find a way to inject this without this config. (e.g. [class^=i-])
        'vertical-align': 'text-top',
        'flex-shrink': '0',
        'display': 'inline-block',
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

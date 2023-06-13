import { presetAnu, presetIconExtraProperties } from 'anu-vue'
import { presetThemeDefault } from '@anu-vue/preset-theme-default'
import {
  defineConfig,
  presetIcons,
  presetUno,
} from 'unocss'
import transformerDirective from '@unocss/transformer-directives'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      extraProperties: presetIconExtraProperties,
    }),

    // anu-vue preset
    presetAnu(),

    // default theme preset
    presetThemeDefault(),
  ],
  transformers: [transformerDirective()],
  include: [/.*\/anu-vue\.js(.*)?$/, './**/*.vue', './**/*.md'],
})

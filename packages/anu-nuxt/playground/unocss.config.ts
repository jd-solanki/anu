import { presetThemeDefault } from '@anu-vue/preset-theme-default'
import type { UnocssNuxtOptions } from '@unocss/nuxt'
import presetIcons from '@unocss/preset-icons'
import presetUno from '@unocss/preset-uno'
import { presetAnu } from 'anu-vue'

export default <UnocssNuxtOptions>{
  preflight: false,
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        'height': '1.5em',
        'flex-shrink': '0',
        'display': 'inline-block',
      },
    }),

    // anu-vue presets
    presetAnu(),
    presetThemeDefault(),
  ],
  include: [/.*\/anu-vue\.js(.*)?$/, './**/*.vue', './**/*.md'],

}

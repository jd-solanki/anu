import { presetThemeDefault } from '@anu-vue/preset-theme-default'
import {
  addPlugin,
  createResolver,
  defineNuxtModule,
} from '@nuxt/kit'
import presetIcons from '@unocss/preset-icons'
import presetUno from '@unocss/preset-uno'
import { presetAnu, presetIconExtraProperties } from 'anu-vue'

import { name, version } from '../package.json'

const configKey = 'anu'

/** Nuxt Module Options */
interface PresetThemeOptions {

  /**
   * Import Anu Preset Theme with either CSS or SASS
   * You can either import CSS which doesn't require any additional setup
   * or SASS which requires you to install `sass` dependencies.
   *
   * @default 'css'
   */
  style?: 'css' | 'sass'
}

export interface ModuleOptions {

  /**
   * Import Anu Preset Theme Default | Source npm pkg: `@anu-vue/preset-theme-default`
   * When enabled, it will automatically set up the default presets for Anu and Uno.
   * We recommend to enable this option to get the best experience.
   *
   * @default true
   */
  presetTheme?: PresetThemeOptions | boolean
}

export default defineNuxtModule<ModuleOptions>({
  defaults: {
    presetTheme: true,
  },
  meta: {
    name,
    version,
    configKey,
    compatibility: {
      nuxt: '^3.0.0',
    },
  },
  setup(opts, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    nuxt.options.css.push('anu-vue/dist/style.css')

    if (opts.presetTheme === true || typeof opts.presetTheme === 'object') {
      nuxt.options.unocss = nuxt.options.unocss || {}

      const ext = typeof opts.presetTheme === 'object' ? opts.presetTheme.style : 'css'
      nuxt.options.css.push(`@anu-vue/preset-theme-default/dist/style.${ext}`)

      const iconPreset = !!nuxt.options.unocss?.icons || true
      nuxt.options.unocss.preflight = false

      // Add default presets for Anu into the unocss options.
      nuxt.options.unocss.presets = [
        // @ts-expect-error - We know that is a valid preset
        presetUno(),

        // @ts-expect-error - We know that is a valid preset
        presetAnu(),

        // @ts-expect-error - We know that is a valid preset
        presetThemeDefault(),
        ...(nuxt.options.unocss.presets || []),
      ]

      // If icon preset is enabled via `unocss.icons` option, add it to the presets.
      // Default to `true` if `unocss.icons` is not defined.
      if (iconPreset) {
        // Icon Preset Anu by default
        const presetIcon = presetIcons(typeof iconPreset === 'object'
          ? iconPreset
          : {
              scale: 1.2,
              extraProperties: presetIconExtraProperties,
            },
        )

        // @ts-expect-error - We know that is a valid preset
        nuxt.options.unocss.presets?.push(presetIcon)
      }
    }

    nuxt.hook('prepare:types', ({ tsConfig, references }) => {
      tsConfig.compilerOptions!.types.push('anu-vue/volar')
      references.push({
        types: 'anu-vue/volar',
      })
    })

    addPlugin({ src: resolve('./runtime/plugin') })
  },
})

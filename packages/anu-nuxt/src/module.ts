import { presetThemeDefault } from '@anu-vue/preset-theme-default'
import {
  addImports,
  addPluginTemplate,
  defineNuxtModule,
} from '@nuxt/kit'
import presetIcons from '@unocss/preset-icons'
import presetUno from '@unocss/preset-uno'
import { composables as AnuComposables, presetAnu, presetIconExtraProperties } from 'anu-vue'

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
  style?: 'css' | 'scss'
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
    const enablePreset = opts.presetTheme === true || typeof opts.presetTheme === 'object'

    if (enablePreset) {
      nuxt.options.unocss = nuxt.options.unocss || {}

      // Enable unocss preset icon by default if it is not enabled.
      const iconPreset = typeof nuxt.options.unocss?.icons === 'boolean'
        ? {
            scale: 1.2,
            extraProperties: presetIconExtraProperties,
          }
        : nuxt.options.unocss.icons

      nuxt.options.unocss.preflight = false

      // Add default presets for Anu into the unocss options.
      nuxt.options.unocss.presets = [
        // @ts-expect-error - We know that is a valid preset
        presetUno(),

        // @ts-expect-error - We know that is a valid preset
        presetAnu(),

        // @ts-expect-error - We know that is a valid preset
        presetIcons(iconPreset),

        // @ts-expect-error - We know that is a valid preset
        presetThemeDefault(),
        ...(nuxt.options.unocss.presets || []),
      ]
    }

    // Add inline plugin template for Anu
    // TODO: Look for reasons why import '#imports' doesn't work within a plugin template.
    addPluginTemplate({
      filename: 'anu-vue.mjs',
      getContents: () => {
        const lines = [
          'import { anu } from \'anu-vue\'',
          `export default defineNuxtPlugin(nuxtApp => {
            nuxtApp.vueApp.use(anu)
          })`,
        ]

        if (enablePreset) {
          const styleExt = typeof opts.presetTheme === 'object' ? opts.presetTheme.style : 'css'
          lines.unshift(`import '@anu-vue/preset-theme-default/dist/style.${styleExt}'`)
        }

        lines.unshift('import \'anu-vue/dist/style.css\'')

        return lines.join('\n')
      },
    })

    // Add Auto Completions for Anu Composables
    const composablesToExclude = ['useProp']

    Object.keys(AnuComposables)
      .filter(key => key.includes('use') && !composablesToExclude.includes(key))
      .forEach(name => {
        addImports({
          name,
          from: 'anu-vue',
        })
      })

    nuxt.hook('prepare:types', ({ tsConfig, references }) => {
      tsConfig.compilerOptions!.types.push('anu-vue/volar')
      references.push({
        types: 'anu-vue/volar',
      })
    })
  },
})

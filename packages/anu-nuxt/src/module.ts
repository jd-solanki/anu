import { presetThemeDefault } from '@anu-vue/preset-theme-default'
import {
  addComponent,
  addImports,
  addPluginTemplate,
  defineNuxtModule,
  extendViteConfig,
  useLogger,
} from '@nuxt/kit'
import presetIcons from '@unocss/preset-icons'
import presetUno from '@unocss/preset-uno'
import type { PluginOptions } from 'anu-vue'
import { components as AnuComponents, composables as AnuComposables, presetAnu, presetIconExtraProperties } from 'anu-vue'

import type { UnocssNuxtOptions } from '@unocss/nuxt'

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

  /**
   * Anu Vue Initial Theme | Source npm pkg: `anu-vue`
   * You can pass in your own initial theme to override the default theme.
   *
   * @remarks
   * The default theme for `initialTheme` is `light`. You can also make it `dark` by setting it to `dark`.
   *
   * @default 'light'
   */
  initialTheme?: PluginOptions['initialTheme']

  /**
   * Anu Vue Themes | Source npm pkg: `anu-vue`
   * You can pass in your own themes to override the default themes.
   *
   * @remarks
   * The default themes for `light` and `dark` are:
   *
   * ```ts
   * {
   *   light: {
   *     class: '',
   *     colors: {
   *       primary: '265, 97.7%, 66.3%',
   *       success: '94.5, 100%, 39.6%',
   *       info: '200.1, 100%, 54.3%',
   *       warning: '42.4, 100%, 50%',
   *       danger: '358.3, 100%, 64.9%',
   *     },
   *     cssVars: {},
   *   },
   *   dark: {
   *     class: 'dark',
   *     colors: {
   *       primary: '261, 73%, 66.3%',
   *       success: '94.5, 73%, 39.6%',
   *       info: '200.1, 73%, 54.3%',
   *       warning: '42.4, 73%, 50%',
   *       danger: '358.3, 73%, 64.9%',
   *     },
   *     cssVars: {},
   *   },
   * }
   * ```
   */
  themes?: PluginOptions['themes']
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
  hooks: {
    'prepare:types': ({ tsConfig, references }) => {
      tsConfig.compilerOptions!.types.push('anu-vue/volar')
      references.push({
        types: 'anu-vue/volar',
      })
    },
  },
  setup(opts, nuxt) {
    const logger = useLogger('anu-vue')
    const enableDefaultPreset = opts.presetTheme === true || typeof opts.presetTheme === 'object'

    // Disable module if '@unocss/nuxt' is not installed.
    if (nuxt.options.modules.includes('@unocss/nuxt') === false) {
      logger.warn('You need to install "@unocss/nuxt" to use Anu Vue. Disabling anu-vue module.')

      return
    }

    nuxt.options.unocss = nuxt.options.unocss || {} as UnocssNuxtOptions

    // Disable unocss preflight by default.
    nuxt.options.unocss.preflight = false

    // Add default presets for Anu into the unocss options.
    nuxt.options.unocss.presets = [
      ...(nuxt.options.unocss.presets || []), // Don't override existing presets.
      presetUno(),
      presetIcons(
        typeof nuxt.options.unocss.icons === 'boolean'
          ? {
              scale: 1.2,
              extraProperties: presetIconExtraProperties,
            }
          : nuxt.options.unocss.icons,
      ),
      presetAnu(),
      enableDefaultPreset && presetThemeDefault(),
    ] as any // Since unocss doesn't have runtime types for plugins yet.

    nuxt.options.unocss.include = [
      /.*\/anu-vue\.js(.*)?$/,
      '**/*.vue',
      '**/*.md',
    ]

    // Add inline plugin template for Anu
    const pluginOptions = {
      initialTheme: opts.initialTheme,
      themes: opts.themes,
    }

    addPluginTemplate({
      filename: 'anu-vue-plugin.mjs',
      getContents: () => {
        const lines = [
          'import { anu } from "anu-vue"',
          `export default defineNuxtPlugin(nuxtApp => {
            nuxtApp.vueApp.use(anu, ${JSON.stringify(pluginOptions)})
          })`,
        ]

        if (enableDefaultPreset) {
          const styleExt = typeof opts.presetTheme === 'object' ? opts.presetTheme.style : 'css'
          lines.unshift(`import '@anu-vue/preset-theme-default/dist/style.${styleExt}'`)
        }

        lines.unshift('import \'anu-vue/dist/style.css\'')

        return lines.join('\n')
      },
    })

    Object.keys(AnuComponents).forEach(name => {
      addComponent({
        name,
        export: name,
        filePath: 'anu-vue',
      })
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

    nuxt.hook('devtools:customTabs', tabs => {
      tabs.push({
        name: 'anu-vue',
        title: 'AnuVue',
        icon: 'noto-v1:paintbrush',
        view: {
          type: 'iframe',
          src: 'https://anu-vue.netlify.app/',
        },
      })
    })

    // Fixes auto-imports for Anu Composables
    extendViteConfig(config => {
      config.optimizeDeps = config.optimizeDeps || {}
      config.optimizeDeps.include = config.optimizeDeps.include || []
      config.optimizeDeps.include.push('anu-vue')
    })
  },
})

declare module '@nuxt/schema' {
  interface NuxtConfig {
    anu?: ModuleOptions
  }
  interface NuxtOptions {
    anu?: ModuleOptions
  }
}

import type { PresetOptions as PresetThemeDefaultOptions } from '@anu-vue/preset-theme-default'
import { presetThemeDefault } from '@anu-vue/preset-theme-default'
import { addCustomTab } from '@nuxt/devtools-kit'
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
import type { PluginOptions, PresetAnuOptions } from 'anu-vue'
import { components as AnuComponents, composables as AnuComposables, presetAnu, presetIconExtraProperties } from 'anu-vue'
import type { PartialDeep } from 'type-fest'

import type { UnocssNuxtOptions } from '@unocss/nuxt'

import { name, version } from '../package.json'

const configKey = 'anu'

/** Nuxt Module Options */
// TODO: (types) We don't get nested autocompletion for options
export interface ModuleOptions {

  /**
   * Import Anu Preset Theme Default
   * When enabled, it will automatically set up the default theme preset for Anu and Uno.
   *
   * @default true
   */
  presetThemeDefault?: PresetThemeDefaultOptions | boolean

  /**
   * Options for Anu Preset
   */
  presetAnuOptions?: PresetAnuOptions

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
  themes?: PartialDeep<PluginOptions['themes']>

  // TODO: Aliases doesn't work ATM because we JSON.stringify the options.
  // aliases?: PluginOptions['aliases']

  propsDefaults?: PluginOptions['propsDefaults']
}

export default defineNuxtModule<ModuleOptions>({
  defaults: {
    presetThemeDefault: true,
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
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      tsConfig.compilerOptions!.types.push('anu-vue/volar')
      references.push({
        types: 'anu-vue/volar',
      })
    },
  },
  setup(opts, nuxt) {
    const logger = useLogger('anu-vue')

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

      // Anu Preset
      presetAnu(opts.presetAnuOptions),
    ]

    /*
      👉 Preset Theme Default

      Inject preset theme default into the unocss options if isn't disabled.
    */
    const isPresetThemeDefaultEnabled = opts.presetThemeDefault !== false
    if (isPresetThemeDefaultEnabled) {
      nuxt.options.unocss.presets.push(
        presetThemeDefault(
          typeof opts.presetThemeDefault === 'object'
            ? opts.presetThemeDefault
            : undefined,
        ),
      )
    }

    /*
      👉 Preset Icons

      Inject preset icons extra properties into icons preset unocss options if icons preset isn't disabled.
    */
    if (nuxt.options.unocss.icons !== false) {
      nuxt.options.unocss.presets.push(
        presetIcons(
          typeof nuxt.options.unocss.icons === 'object'
            ? nuxt.options.unocss.icons
            : {
                scale: 1.2,
                extraProperties: presetIconExtraProperties,
              },
        ),
      )
    }

    nuxt.options.unocss.include = [
      /.*\/anu-vue\.js(.*)?$/,
      '**/*.vue',
      '**/*.md',
    ]

    // Add inline plugin template for Anu
    const pluginOptions = {
      initialTheme: opts.initialTheme,
      themes: opts.themes,

      // aliases: opts.aliases,
      propsDefaults: opts.propsDefaults,
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

        if (isPresetThemeDefaultEnabled)
          lines.unshift('import \'@anu-vue/preset-theme-default/dist/style.css\'')

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

    // Add devtools tab for Anu
    addCustomTab({
      name: 'anu-vue',
      title: 'Anu',
      icon: 'bx:atom',
      view: {
        type: 'iframe',
        src: 'https://anu-vue.netlify.app/',
      },
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

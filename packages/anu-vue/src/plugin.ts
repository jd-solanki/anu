import { defu } from 'defu'
import type { PartialDeep } from 'type-fest'
import type { App } from 'vue'
import { defineComponent } from 'vue'
import type { PluginOptionDefaults } from './pluginDefaults'
import * as components from '@/components'
import { useAnu } from '@/composables/useAnu'
import { useDefaults } from '@/composables/useDefaults'
import { useZIndex } from '@/composables/useZIndex'
import { ANU_CONFIG, ANU_PROPS_DEFAULTS } from '@/symbols'

export type ThemeColors = 'primary' | 'success' | 'info' | 'warning' | 'danger'
export type DefaultThemes = 'light' | 'dark'

export interface ThemeOptions {
  class: string
  colors: Record<ThemeColors, string>
  cssVars: Record<string, string>
}

export type ConfigThemes = Record<DefaultThemes, ThemeOptions>

export interface PluginOptions {
  registerComponents: boolean
  initialTheme: keyof ConfigThemes
  themes: ConfigThemes
  componentAliases: Record<string, any>
  propsDefaults: PartialDeep<PluginOptionDefaults>
  baseZIndex: number
}

// ℹ️ We are exporting this so that we can use it in tests
export const defaultBaseZIndex = 2000

const configDefaults: PluginOptions = {
  registerComponents: true,
  initialTheme: 'light',
  themes: {
    light: {
      class: '',
      colors: {
        primary: '265, 97.7%, 66.3%',
        success: '94.5, 100%, 39.6%',
        info: '200.1, 100%, 54.3%',
        warning: '42.4, 100%, 50%',
        danger: '358.3, 100%, 64.9%',
      },
      cssVars: {
        'body-color': 'hsla(var(--a-base-c), 0.68)',
        'body-bg-c': '0,4.8%,95.9%',

        // ℹ️ Used for background on body like select options, card, etc
        'surface-c': '0, 0%, 100%',
      },
    },
    dark: {
      class: 'dark',
      colors: {
        primary: '261, 73%, 66.3%',
        success: '94.5, 73%, 39.6%',
        info: '200.1, 73%, 54.3%',
        warning: '42.4, 73%, 50%',
        danger: '358.3, 73%, 64.9%',
      },
      cssVars: {
        'body-color': 'hsla(var(--a-base-c), 0.68)',
        'body-bg-c': 'var(--a-primary-hue), 15%, 5%',
        'surface-c': 'var(--a-primary-hue), 7%, 10%',
      },
    },
  },
  componentAliases: {},
  propsDefaults: {},
  baseZIndex: defaultBaseZIndex,
}

export const plugin = {
  install(app: App, options: PartialDeep<PluginOptions> = {}) {
    const config: PluginOptions = defu(options, configDefaults)

    if (config.registerComponents) {
      for (const prop in components) {
        // @ts-expect-error: I want to index import using string
        // eslint-disable-next-line import/namespace
        const component = components[prop]
        app.component(component.name, component)
      }
    }

    for (const aliasComponentName in config.componentAliases) {
      const baseComponent = config.componentAliases[aliasComponentName]

      app.component(aliasComponentName, defineComponent({
        ...baseComponent,
        name: aliasComponentName,

        // TODO: (types) Why we have to use ts-expect-error here?
        // @ts-expect-error: TS/Vue unable to get types correctly
        setup(props, ctx) {
          const { props: modifiedProps, defaultsClass, defaultsStyle, defaultsAttrs } = useDefaults(props)

          return () => h(baseComponent, { ...modifiedProps, defaultsClass, defaultsStyle, defaultsAttrs }, ctx.slots)
        },
      }))
    }

    app.provide(ANU_CONFIG, config)
    app.provide(ANU_PROPS_DEFAULTS, config.propsDefaults)

    // Initialize Anu instance with config values
    useAnu({
      initialTheme: config.initialTheme,
      themes: config.themes,
    })

    // Initialize useZIndex composable
    useZIndex(config.baseZIndex, app)
  },
}

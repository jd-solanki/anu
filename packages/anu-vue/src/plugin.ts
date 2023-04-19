import { defu } from 'defu'
import type { PartialDeep } from 'type-fest'
import type { App } from 'vue'
import * as components from '@/components'
import { useAnu } from '@/composables/useAnu'
import { ANU_CONFIG } from '@/symbols'
import { provideConfig } from '@/composables/useConfig'
import { defaultBaseZIndex } from '@/composables/useZIndex'

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
  zIndex: number
}

const configDefaults: PluginOptions = {
  registerComponents: true,
  initialTheme: 'light',
  zIndex: 2000,
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
}

export const plugin = {
  install(app: App, options: PartialDeep<PluginOptions> = {}) {
    const config = defu(options, configDefaults)

    if (config.registerComponents) {
      for (const prop in components) {
      // @ts-expect-error: I want to index import using string
        const component = components[prop]
        app.component(component.name, component)
      }
    }

    app.provide(ANU_CONFIG, config)

    if (options)
      provideConfig({ zIndex: options.zIndex || defaultBaseZIndex }, app)

    // Initialize Anu instance with config values
    useAnu({
      initialTheme: config.initialTheme,
      themes: config.themes,
    })
  },
}

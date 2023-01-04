import { defu } from 'defu'
import type { App } from 'vue'
import * as components from './components'
import * as composables from './composables'
import { provideAppSpacing } from '@/composables/useSpacing'
import './scss/index.scss'

export interface PluginOptions {
  registerComponents: boolean
}

const optionsDefaults: Partial<PluginOptions> = {
  registerComponents: true,
}

const plugin = {
  install(app: App, options: Partial<PluginOptions> = {}) {
    provideAppSpacing(app)

    const _options = defu(options, optionsDefaults)

    if (_options.registerComponents) {
      for (const prop in components) {
      // @ts-expect-error: I want to index import using string
        const component = components[prop]
        app.component(component.name, component)
      }
    }
  },
}

export { AnuComponentResolver } from './componentResolver'
export * from './components'
export * from './composables'
export { presetAnu } from './preset'
export * from './symbols'
export { plugin as anu }
export const Composables = composables
export const presetIconExtraProperties = {
  'height': '1.2em',
  'width': '1.2em',

  // ℹ️ We also have to find a way to inject this without this config. (e.g. [class^=i-])
  'vertical-align': 'text-top',
  'flex-shrink': '0',
  'display': 'inline-block',
}


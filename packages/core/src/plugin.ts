import { defu } from 'defu'
import type { PartialDeep } from 'type-fest'
import type { App } from 'vue'
import * as components from './components'

export interface PluginOptions {
    registerComponents: boolean
}

const configDefaults: PluginOptions = {
    registerComponents: false,
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
  },
}
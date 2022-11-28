import type { App } from 'vue'
import * as components from './components'
import { provideAppSpacing } from '@/composables/useSpacing'
import './presets/theme-default/scss/index.scss'
import './scss/index.scss'

export interface PluginOptions {
  registerComponents: boolean
}

const plugin = {
  install(app: App, options?: PluginOptions) {
    provideAppSpacing(app)

    // console.log('components :>> ', components);
    if (options && options.registerComponents) {
      for (const prop in components) {
      // @ts-expect-error: I want to index import using string
        const component = components[prop]
        app.component(component.name, component)
      }
    }

    // Create teleport target
    // if (typeof window !== 'undefined') {
    const teleportTarget = document.createElement('div')
    teleportTarget.id = 'a-teleport-target'
    document.body.appendChild(teleportTarget)

    // }
  },
}

export { AnuComponentResolver } from './componentResolver'
export * from './components'
export * from './composables'
export { presetCore } from './presets/core'
export {
  colors as defaultThemeColors, presetThemeDefault,
} from './presets/theme-default'
export * from './symbols'
export { plugin as anu }


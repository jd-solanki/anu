import { defu } from 'defu';
import type { PartialDeep } from 'type-fest';
import type { App } from 'vue';
import * as components from './components';
import { useDefaults } from './composables/useDefaults';
import type { PluginOptionDefaults } from './pluginDefaults';
import { ANU_PROPS_DEFAULTS } from './symbols';

export interface PluginOptions {
  registerComponentsGlobally: boolean
  componentAliases: Record<string, any>
  propsDefaults: PartialDeep<PluginOptionDefaults>
}

const configDefaults: PluginOptions = {
  registerComponentsGlobally: false,
  componentAliases: {},
  propsDefaults: {},
}

export const plugin = {
  install(app: App, options: PartialDeep<PluginOptions> = {}) {
    const config: PluginOptions = defu(options, configDefaults)

    // Register components globally
    if (config.registerComponentsGlobally) {
      for (const prop in components) {
        // @ts-expect-error: I want to index import using string
        // eslint-disable-next-line import/namespace
        const component = components[prop]
        app.component(component.name, component)
      }
    }

    // Register component aliases
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

    // Props defaults
    app.provide(ANU_PROPS_DEFAULTS, config.propsDefaults)
  },
}
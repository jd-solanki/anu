import type { MaybeRef } from '@vueuse/core'
import type { App, InjectionKey, Ref } from 'vue'
import { getCurrentInstance, provide } from 'vue'
import { zIndexContextKey } from '@/composables/useZIndex'
import type { ConfigProviderProps } from '@/components/config-provider/config-provider-props'

export type ConfigProviderContext = Partial<ConfigProviderProps>
export const configProviderContextKey: InjectionKey<
  Ref<ConfigProviderContext>
> = Symbol('AnuConfigProviderKey')

// Storing this value is to be able to use useConfig outside of the component.
const globalConfig = ref<ConfigProviderContext>()

export function useConfig() {
  return getCurrentInstance()
    ? inject(configProviderContextKey, globalConfig)
    : globalConfig
}

export function provideConfig(
  config: MaybeRef<ConfigProviderProps>,
  app?: App,
) {
  const provideFn = getProvideFunction(app)
  if (!provideFn)
    return

  const context = computed(() => unref(config))

  provideFn(configProviderContextKey, context)

  provideFn(zIndexContextKey, computed(() => context.value.zIndex))

  if (!globalConfig.value)
    globalConfig.value = context.value

  return context
}

function getProvideFunction(app?: App) {
  const currentInstance = getCurrentInstance()
  const useInComponent = !!currentInstance

  if (useInComponent)
    return provide

  if (app)
    return app.provide

  console.warn('provideConfig() can only be used inside setup().')

  return undefined
}

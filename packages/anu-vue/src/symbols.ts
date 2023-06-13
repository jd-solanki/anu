import type { InjectionKey, MaybeRef } from 'vue'
import type { PluginOptions } from '@/plugin'

export const ANU_CONFIG = Symbol('ANU_CONFIG') as InjectionKey<PluginOptions>
export const ANU_PROPS_DEFAULTS = Symbol('ANU_PROPS_DEFAULTS') as InjectionKey<MaybeRef<PluginOptions['propsDefaults']>>
export const ANU_Z_INDEX: InjectionKey<Ref<number | undefined>> = Symbol('zIndexContextKey')

import type { PluginOptions } from 'anu-vue/plugin'
import type { InjectionKey, MaybeRef, Ref } from 'vue'

export const ANU_CONFIG = Symbol('ANU_CONFIG') as InjectionKey<PluginOptions>
export const ANU_PROPS_DEFAULTS = Symbol('ANU_PROPS_DEFAULTS') as InjectionKey<MaybeRef<PluginOptions['propsDefaults']>>
export const ANU_Z_INDEX = Symbol('ANU_Z_INDEX') as InjectionKey<Ref<number | undefined>>

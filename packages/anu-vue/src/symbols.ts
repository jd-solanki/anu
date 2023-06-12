import type { PluginOptions } from '@/plugin'
import type { InjectionKey, MaybeRef } from 'vue'

export const ANU_CONFIG = Symbol('ANU_CONFIG') as InjectionKey<PluginOptions>
export const ANU_DEFAULTS = Symbol('ANU_DEFAULTS') as InjectionKey<MaybeRef<PluginOptions['propsDefaults']>>

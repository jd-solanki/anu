import type { InjectionKey } from 'vue'
import type { PluginOptions } from '@/plugin'

export const ANU_CONFIG = Symbol('ANU_CONFIG') as InjectionKey<PluginOptions>
export const ANU_DEFAULTS = Symbol('ANU_DEFAULTS') as InjectionKey<PluginOptions['defaults']>

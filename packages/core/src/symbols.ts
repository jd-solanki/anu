import type { InjectionKey, MaybeRef } from 'vue';
import type { PluginOptions } from './plugin';

export const ANU_PROPS_DEFAULTS = Symbol('ANU_PROPS_DEFAULTS') as InjectionKey<MaybeRef<PluginOptions['propsDefaults']>>
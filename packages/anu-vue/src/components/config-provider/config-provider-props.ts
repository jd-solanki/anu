import type { ExtractPropTypes } from 'vue'
import { defaultBaseZIndex } from '@/composables/useZIndex'

export const configProviderProps = {
  zIndex: {
    type: Number,
    default: defaultBaseZIndex,
  },
}
export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>

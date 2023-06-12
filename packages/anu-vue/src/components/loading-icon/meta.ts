import type { ExtractPublicPropTypes } from 'vue'
import { configurable as configurableProp } from '@/composables/useProps'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
export const aLoadingIconProps = {
  icon: configurableProp,

  /**
   * Set loading state
   */
  loading: {
    type: Boolean,
    default: false,
  },
} as const
export type ALoadingIconProps = ExtractPublicPropTypes<typeof aLoadingIconProps>

// 👉 Slots
export const aLoadingIconSlots = {} as const

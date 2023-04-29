import type { ComponentObjectPropsOptions } from 'vue'
import type { ConfigurableValue } from '@/composables/useConfigurable'
import { configurable as configurableProp } from '@/composables/useProps'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
export interface ALoadingIconProps {
  icon?: ConfigurableValue
  loading?: boolean
}

export const aLoadingIconProps = ({
  icon: configurableProp,

  /**
   * Set loading state
   */
  loading: {
    type: Boolean,
    default: false,
  },
} as const) satisfies Required<ComponentObjectPropsOptions<ALoadingIconProps>>

// 👉 Slots
export const aLoadingIconSlots = {} as const

// 👉 Events
export interface ALoadingIconEvents {}

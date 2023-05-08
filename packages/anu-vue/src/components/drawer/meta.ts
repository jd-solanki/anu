import type { ExtractPublicPropTypes } from 'vue'
import { aCardProps, aCardSlots } from '@/components/card'

// ℹ️ Make sure to checkout meta definition rules

export type ADrawerAnchor = 'left' | 'right' | 'top' | 'bottom'

// 👉 Props
export const aDrawerProps = {
  ...aCardProps,

  /**
   * Show/Hide menu base on v-model value
   */
  modelValue: Boolean,

  /**
   * Persistence of drawer when clicked outside of reference element
   */
  persistent: Boolean,

  /**
   * Drawer anchor/position
   */
  anchor: {
    type: String as PropType<ADrawerAnchor>,
    default: 'left',
  },
} as const

export type ADrawerProps = ExtractPublicPropTypes<typeof aDrawerProps>

// 👉 Slots
export const aDrawerSlots = {
  ...aCardSlots,
} as const

// 👉 Events
export interface ADrawerEvents {
  (e: 'update:modelValue', value: boolean): void
}

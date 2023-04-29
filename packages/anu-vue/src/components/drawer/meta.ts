import type { ComponentObjectPropsOptions } from 'vue'
import type { ACardProps } from '@/components/card'
import { aCardProps, aCardSlots } from '@/components/card'

// ℹ️ Make sure to checkout meta definition rules

export type ADrawerAnchor = 'left' | 'right' | 'top' | 'bottom'

// 👉 Props
export interface ADrawerProps extends ACardProps {

  /**
   * Show/Hide menu base on v-model value
   */
  modelValue?: boolean

  /**
   * Persistence of drawer when clicked outside of reference element
   */
  persistent?: boolean

  /**
   * Drawer anchor/position
   */
  anchor: ADrawerAnchor
}

export const aDrawerProps = ({
  ...aCardProps,
  modelValue: Boolean,
  persistent: Boolean,
  anchor: {
    type: String as PropType<ADrawerProps['anchor']>,
    default: 'left',
  },
} as const) satisfies Required<ComponentObjectPropsOptions<ADrawerProps>>

// 👉 Slots
export const aDrawerSlots = {
  ...aCardSlots,
} as const

// 👉 Events
export interface ADrawerEvents {
  (e: 'update:modelValue', value: boolean): void
}

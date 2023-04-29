import type { ComponentObjectPropsOptions } from 'vue'
import type { ACardProps } from '@/components/card'
import { aCardProps, aCardSlots } from '@/components/card'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
export interface ADialogProps extends ACardProps {

  /**
   * Show/Hide menu base on v-model value
   */
  modelValue?: boolean

  /**
   * Persistence of dialog when clicked outside of reference element
   */
  persistent?: boolean
}

export const aDialogProps = ({
  ...aCardProps,
  modelValue: Boolean,
  persistent: Boolean,
} as const) satisfies Required<ComponentObjectPropsOptions<ADialogProps>>

// 👉 Slots
export const aDialogSlots = {
  ...aCardSlots,
} as const

// 👉 Events
export interface ADialogEvents {
  (e: 'update:modelValue', value: boolean): void
}

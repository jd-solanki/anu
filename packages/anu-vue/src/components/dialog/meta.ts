import { aCardProps, aCardSlots } from 'anu-vue/components/card'
import type { ExtractPublicPropTypes } from 'vue'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
export const aDialogProps = {
  ...aCardProps,

  /**
   * Show/Hide menu base on v-model value
   */
  modelValue: Boolean,

  /**
   * Persistence of dialog when clicked outside of reference element
   */
  persistent: Boolean,
} as const

export type ADialogProps = ExtractPublicPropTypes<typeof aDialogProps>

// 👉 Slots
export const aDialogSlots = {
  ...aCardSlots,
} as const

// 👉 Events
export interface ADialogEvents {
  (e: 'update:modelValue', value: boolean): void
}

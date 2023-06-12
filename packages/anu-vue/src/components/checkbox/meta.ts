import type { ExtractPublicPropTypes } from 'vue'
import { useCheckboxProps } from '@/composables/useCheckbox'
import { color as colorProp, configurable as configurableProp, disabled as disabledProp } from '@/composables/useProps'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
export const aCheckboxProps = {
  ...useCheckboxProps,

  /**
   * Checkbox color
   */
  color: {
    ...colorProp,
    default: 'primary',
  },

  /**
   * Label text
   */
  label: String,

  /**
   * Icon to render in checkbox square instead of check
   */
  icon: {
    ...configurableProp,
    default: 'i-bx-check',
  },

  /**
   * Bind classes to input element
   */
  inputClasses: { type: null },

  /**
   * Disable checkbox
   */
  disabled: disabledProp,
} as const
export type ACheckboxProps = ExtractPublicPropTypes<typeof aCheckboxProps>

// 👉 Slots
export const aCheckboxSlots = {

  /**
   * Default slot for rendering checkbox label. If default slot is used `label` prop will be discarded.
   */
  default: (_: any) => null as any,
} as const

// 👉 Events
export interface ACheckboxEvents {
  (e: 'update:modelValue', value: ACheckboxProps['modelValue']): void
}

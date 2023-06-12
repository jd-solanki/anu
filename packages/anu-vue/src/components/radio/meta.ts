import type { ExtractPublicPropTypes } from 'vue'
import { color as colorProp, disabled as disabledProp } from '@/composables/useProps'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
export const aRadioProps = {

  /**
   * Radio color
   */
  color: {
    ...colorProp,
    default: 'primary',
  },

  // ℹ️ If we want any type need to set `propName: { type: null }`. Using `propName: null` will omit (disable) the prop.
  /**
   * Bind v-model value to radio
   */
  modelValue: { type: null },

  /**
   * Define label text
   */
  label: String,

  /**
   * Disable radio
   */
  disabled: disabledProp,

  // ℹ️ If we want any type need to set `propName: { type: null }`. Using `propName: null` will omit (disable) the prop.
  /**
   * Bind classes to input element
   */
  inputClasses: { type: null },
} as const
export type ARadioProps = ExtractPublicPropTypes<typeof aRadioProps>

// 👉 Slots
export const aRadioSlots = {

  /**
   * Default slot for rendering radio label. If default slot is used `label` prop will be discarded.
   */
  default: (_: any) => null as any,
} as const

// 👉 Events
export interface ARadioEvents {
  (e: 'update:modelValue', value: ARadioProps['modelValue']): void
}

import type { ComponentObjectPropsOptions } from 'vue'
import type { ColorProp } from '@/composables/useProps'
import { color as colorProp, disabled as disabledProp } from '@/composables/useProps'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
export interface ARadioProps {

  /**
   * Radio color
   */
  color?: ColorProp

  /**
   * Bind v-model value to radio
   */
  modelValue?: any

  /**
   * Bind classes to input element
   */
  inputClasses?: any

  /**
   * Define label text
   */
  label?: string

  /**
   * Disable radio
   */
  disabled?: boolean
}

export const aRadioProps = ({
  color: {
    ...colorProp,
    default: 'primary',
  },

  // ℹ️ If we want any type need to set `propName: { type: null }`. Using `propName: null` will omit (disable) the prop.
  modelValue: { type: null },

  label: String,
  disabled: disabledProp,

  // ℹ️ If we want any type need to set `propName: { type: null }`. Using `propName: null` will omit (disable) the prop.
  inputClasses: { type: null },
} as const) satisfies Required<ComponentObjectPropsOptions<ARadioProps>>

// 👉 Slots
export const aRadioSlots = {

  /**
   * Default slot for rendering radio label. If default slot is used `label` prop will be discarded.
   */
  default: {},
} as const

// 👉 Events
export interface ARadioEvents {
  (e: 'update:modelValue', value: ARadioProps['modelValue']): void
}

import type { ComponentObjectPropsOptions } from 'vue'
import type { UseCheckboxProps } from '@/composables/useCheckbox'
import { useCheckboxProps } from '@/composables/useCheckbox'
import type { ConfigurableValue } from '@/composables/useConfigurable'
import type { ColorProp } from '@/composables/useProps'
import { color as colorProp, configurable as configurableProp, disabled as disabledProp } from '@/composables/useProps'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
export interface ACheckboxProps extends UseCheckboxProps {

  /**
   * Checkbox color
   */
  color?: ColorProp

  /**
   * Label text
   */
  label?: string

  /**
   * Icon to render in checkbox square instead of check
   */
  icon?: ConfigurableValue

  /**
   * Bind classes to input element
   */
  inputClasses?: any

  /**
   * Disable checkbox
   */
  disabled?: boolean
}

export const aCheckboxProps = ({
  ...useCheckboxProps,
  color: {
    ...colorProp,
    default: 'primary',
  },

  label: String,

  icon: {
    ...configurableProp,
    default: 'i-bx-check',
  },

  inputClasses: { type: null },

  disabled: disabledProp,
} as const) satisfies Required<ComponentObjectPropsOptions<ACheckboxProps>>

// 👉 Slots
export const aCheckboxSlots = {

  /**
   * Default slot for rendering checkbox label. If default slot is used `label` prop will be discarded.
   */
  default: {},
} as const

// 👉 Events
export interface ACheckboxEvents {
  (e: 'update:modelValue', value: ACheckboxProps['modelValue']): void
}

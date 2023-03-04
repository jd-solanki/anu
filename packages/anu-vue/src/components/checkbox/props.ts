import { defu } from 'defu'
import type { ExtractPropTypes } from 'vue'
import { useCheckboxProps } from '@/composables'
import { color as colorProp, configurable as configurableProp, disabled as disabledProp } from '@/composables/useProps'

export const checkboxProps = {

  ...useCheckboxProps,

  /**
   * Checkbox color
   */
  color: defu({ default: 'primary' }, colorProp),

  /**
   * Label text
   */
  label: String,

  /**
   * Icon to render in checkbox square instead of check
   */
  icon: defu({ default: 'i-bx-check' }, configurableProp),

  /**
   * Bind classes to input element
   */
  inputClasses: { type: null },

  /**
   * Disable checkbox
   */
  disabled: disabledProp,
}

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>

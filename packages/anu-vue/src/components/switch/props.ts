import { defu } from 'defu'
import type { ExtractPropTypes } from 'vue'
import { useCheckboxProps } from '@/composables'
import { color as colorProp, disabled as disabledProp } from '@/composables/useProps'

export const switchProps = {
  ...useCheckboxProps,

  /**
   * Switch color
   */
  color: defu({
    default: 'primary',
  }, colorProp),

  /**
   * Define label text
   */
  label: String,

  /**
   * Icon to render when switch is on
   */
  onIcon: String,

  /**
   * Icon to render when switch is off
   */
  offIcon: String,

  /**
   * Bind classes to input element
   */
  inputClasses: { type: null },

  /**
   * Disable switch
   */
  disabled: disabledProp,
}

export type SwitchProps = ExtractPropTypes<typeof switchProps>

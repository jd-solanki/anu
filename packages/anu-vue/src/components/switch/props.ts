import { defu } from 'defu'
import type { ExtractPropTypes, PropType } from 'vue'
import type { CheckboxModelValue } from '@/composables/useCheckbox'
import { color as colorProp, disabled as disabledProp } from '@/composables/useProps'

export const switchProps = {
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
     * Bind v-model value
     */
  modelValue: {
    type: [Boolean, Number, String, Array, Set] as PropType<CheckboxModelValue>,
    default: true,
  },

  /**
   * Switch value when in on state
   */
  onValue: [Boolean, Number, String, Array, Set] as PropType<CheckboxModelValue>,

  /**
   * Switch value when in off state
   */
  offValue: {
    type: [Boolean, Number, String, Array, Set] as PropType<CheckboxModelValue>,
    default: false,
  },

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

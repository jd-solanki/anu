import type { ExtractPublicPropTypes } from 'vue'
import { useCheckboxProps } from '@/composables/useCheckbox'
import { color as colorProp, disabled as disabledProp } from '@/composables/useProps'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
const { checkedValue: onValue, uncheckedValue: offValue, ...useSwitchCheckboxProps } = useCheckboxProps
export const aSwitchProps = {
  ...useSwitchCheckboxProps,
  onValue,
  offValue,

  /**
   * Switch color
   */
  color: {
    ...colorProp,
    default: 'primary',
  },

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
   * Disable switch
   */
  disabled: disabledProp,

  // ℹ️ If we want any type need to set `propName: { type: null }`. Using `propName: null` will omit (disable) the prop.
  /**
   * Bind classes to input element
   */
  inputClasses: { type: null },
} as const
export type ASwitchProps = ExtractPublicPropTypes<typeof aSwitchProps>

// 👉 Slots
export const aSwitchSlots = {

  /**
   * Default slot for rendering switch label. If default slot is used `label` prop will be discarded.
   */
  default: (_: any) => null as any,
} as const

// 👉 Events
export interface ASwitchEvents {
  (e: 'update:modelValue', value: ASwitchProps['modelValue']): void
}

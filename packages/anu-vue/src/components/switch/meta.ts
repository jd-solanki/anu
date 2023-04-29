import type { ComponentObjectPropsOptions } from 'vue'
import type { UseCheckboxProps } from '@/composables/useCheckbox'
import { useCheckboxProps } from '@/composables/useCheckbox'
import type { ColorProp } from '@/composables/useProps'
import { color as colorProp, disabled as disabledProp } from '@/composables/useProps'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
const { checkedValue: onValue, uncheckedValue: offValue, ...useSwitchCheckboxProps } = useCheckboxProps
export interface ASwitchProps extends Omit<UseCheckboxProps, 'checkedValue' | 'uncheckedValue'> {
  onValue: UseCheckboxProps['checkedValue']
  offValue: UseCheckboxProps['uncheckedValue']

  /**
   * Switch color
   */
  color?: ColorProp

  /**
   * Define label text
   */
  label?: string

  /**
   * Icon to render when switch is on
   */
  onIcon?: string

  /**
   * Icon to render when switch is off
   */
  offIcon?: string

  /**
   * Bind classes to input element
   */
  inputClasses?: any

  /**
   * Disable switch
   */
  disabled?: boolean
}

export const aSwitchProps = ({
  ...useSwitchCheckboxProps,
  onValue,
  offValue,

  color: {
    ...colorProp,
    default: 'primary',
  },
  label: String,
  onIcon: String,
  offIcon: String,
  disabled: disabledProp,

  // ℹ️ If we want any type need to set `propName: { type: null }`. Using `propName: null` will omit (disable) the prop.
  inputClasses: { type: null },
} as const) satisfies Required<ComponentObjectPropsOptions<ASwitchProps>>

// 👉 Slots
export const aSwitchSlots = {

  /**
   * Default slot for rendering switch label. If default slot is used `label` prop will be discarded.
   */
  default: {},
} as const

// 👉 Events
export interface ASwitchEvents {
  (e: 'update:modelValue', value: ASwitchProps['modelValue']): void
}

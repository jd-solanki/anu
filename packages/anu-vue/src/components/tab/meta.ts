import type { ComponentObjectPropsOptions } from 'vue'
import type { ConfigurableValue } from '@/composables/useConfigurable'
import { configurable as configurableProp, disabled as disabledProp } from '@/composables/useProps'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
export interface ATabProps {

  /**
   * Tab title
   */
  title: string

  /**
   * Render icon before tab title
   */
  icon?: ConfigurableValue

  /**
   * Append icon after tab title
   */
  appendIcon?: ConfigurableValue

  /**
   * Stack tab title and icons vertically
   */
  stacked?: boolean

  /**
   * Tab value to be used for v-model binding
   */
  value?: any

  /**
   * Hide tab title on mobile
   */
  hideTitleOnMobile?: boolean

  /**
   * Set component in disabled state
   */
  disabled?: boolean
}

export const aTabProps = ({
  title: {
    type: String,
    required: true,
  },
  icon: configurableProp,
  appendIcon: configurableProp,
  stacked: Boolean,
  hideTitleOnMobile: Boolean,
  disabled: disabledProp,

  // ℹ️ If we want any type need to set `propName: { type: null }`. Using `propName: null` will omit (disable) the prop.
  value: { type: null },
} as const) satisfies Required<ComponentObjectPropsOptions<ATabProps>>

// 👉 Slots
export const aTabSlots = {
  /**
   * Prepend content to the title
   */
  prepend: {},

  /**
   * Append content to the title
   */
  append: {},

} as const

// 👉 Events
export interface ATabEvents {}

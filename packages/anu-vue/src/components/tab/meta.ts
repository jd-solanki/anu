import type { ExtractPublicPropTypes } from 'vue'
import { configurable as configurableProp, disabled as disabledProp } from '@/composables/useProps'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
export const aTabProps = {
  /**
   * Tab title
   */
  title: {
    type: String,
    required: true,
  },

  /**
   * Render icon before tab title
   */
  icon: configurableProp,

  /**
   * Append icon after tab title
   */
  appendIcon: configurableProp,

  /**
   * Stack tab title and icons vertically
   */
  stacked: Boolean,

  /**
   * Hide tab title on mobile
   */
  hideTitleOnMobile: Boolean,

  /**
   * Set component in disabled state
   */
  disabled: disabledProp,

  // ℹ️ If we want any type need to set `propName: { type: null }`. Using `propName: null` will omit (disable) the prop.
  /**
   * Tab value to be used for v-model binding
   */
  value: { type: null },
} as const
export type ATabProps = ExtractPublicPropTypes<typeof aTabProps>

// 👉 Slots
export const aTabSlots = {
  /**
   * Prepend content to the title
   */
  prepend: (_: any) => null as any,

  /**
   * Append content to the title
   */
  append: (_: any) => null as any,

} as const

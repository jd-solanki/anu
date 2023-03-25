import type { ExtractPropTypes } from 'vue'
import { configurable as configurableProp, disabled as disabledProp } from '@/composables/useProps'

export const tabProps = {
  /**
   * Tab title
   */
  title: {
    type: String,
    required: true,
  } as const,

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
  stacked: {
    type: Boolean,
    default: false,
  },

  /**
   * Tab value to be used for v-model binding
   */
  // ℹ️ If we want any type need to set `propName: { type: null }`. Using `propName: null` will omit (disable) the prop.
  value: { type: null },

  /**
   * Hide tab title on mobile
   */
  hideTitleOnMobile: {
    type: Boolean,
    default: false,
  },

  /**
   * Set component in disabled state
   */
  disabled: disabledProp,

}

export type TabProps = ExtractPropTypes<typeof tabProps>

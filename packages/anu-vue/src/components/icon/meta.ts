import { color as colorProp } from 'anu-vue/composables/useProps'
import type { ExtractPublicPropTypes } from 'vue'

// ℹ️ Make sure to checkout prop definition rules

// 👉 Props
export const aIconProps = {
  /**
   * Icon name
   */
  icon: {
    type: String as PropType<`i-${string}`>,
    required: true,
  },

  /**
   * Icon color
   */
  color: colorProp,
} as const

export type AIconProps = ExtractPublicPropTypes<typeof aIconProps>

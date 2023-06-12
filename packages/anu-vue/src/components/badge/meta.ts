import type { ExtractPublicPropTypes } from 'vue'
import { color as colorProp } from '@/composables/useProps'

export type AVerticalAnchor = 'top' | 'bottom'
export type AHorizontalAnchor = 'left' | 'right'
export type AAnchor = `${AVerticalAnchor} ${AHorizontalAnchor}`

export const aBadgeDefaultOffset = 4

export const aBadgeDefaultOverlapOffset = 12

// ℹ️ Make sure to checkout prop definition rules

// 👉 Props
export const aBadgeProps = {
  /**
   * Show/Hide badge based on v-model value
   */
  modelValue: {
    type: Boolean,
    default: true,
  },

  /**
   * Sets badge color
   */
  color: {
    ...colorProp,
    default: 'primary',
  },

  /**
   * Converts badge to a dot
   */
  dot: Boolean,

  /**
  * Adds badge border
  */
  bordered: {
    type: Boolean,
    default: true,
  },

  /**
   * Sets the highest possible value
   */
  max: Number,

  /**
   * Use to pass numeric values
   */
  content: [Number, String] as PropType<number | string>,

  /**
   * Sets the badge position
   */
  anchor: {
    type: String as PropType<AAnchor>,
    default: 'top right',
  },

  /**
   * Adjusts position of badge
   */
  overlap: {
    type: Boolean,
    default: true,
  },

  /**
   * Sets offset on x-axis
   */
  offsetX: {
    type: [Number, String] as PropType<number | string>,
    default: aBadgeDefaultOffset,
  },

  /**
   * Sets offset on y-axis
   */
  offsetY: {
    type: [Number, String] as PropType<number | string>,
    default: aBadgeDefaultOffset,
  },
} as const
export type ABadgeProps = ExtractPublicPropTypes<typeof aBadgeProps>

// 👉 Slots
export const aBadgeSlots = {

  /**
   * Default slot for rendering badge content
   */
  default: (_: any) => null as any,
} as const

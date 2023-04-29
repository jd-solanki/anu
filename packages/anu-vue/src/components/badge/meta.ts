import type { ComponentObjectPropsOptions } from 'vue'
import type { ColorProp } from '@/composables/useProps'
import { color as colorProp } from '@/composables/useProps'
import type { NoUndefined } from '@/utils/typescripts'

export type AVerticalAnchor = 'top' | 'bottom'
export type AHorizontalAnchor = 'left' | 'right'
export type AAnchor = `${AVerticalAnchor} ${AHorizontalAnchor}`

export const aBadgeDefaultOffset = 4

export const aBadgeDefaultOverlapOffset = 12

// 👉 Props
// ℹ️ Make sure to checkout prop definition rules
export interface ABadgeProps {

  /**
   * Show/Hide badge based on v-model value
   */
  modelValue?: boolean

  /**
   * Sets badge color
   */
  color?: ColorProp

  /**
   * Converts badge to a dot
   */
  dot: boolean

  /**
  * Adds badge border
  */
  bordered?: boolean

  /**
   * Sets the highest possible value
   */
  max?: number

  /**
   * Use to pass numeric values
   */
  content?: number | string

  /**
   * Sets the badge position
   */
  anchor?: AAnchor

  /**
   * Adjusts position of badge
   */
  overlap?: boolean

  /**
   * Sets offset on x-axis
   */
  offsetX?: number | string

  /**
   * Sets offset on y-axis
   */
  offsetY?: number | string
}

export const aBadgeProps = ({
  modelValue: {
    type: Boolean,
    default: true,
  },
  color: {
    ...colorProp,
    default: 'primary',
  },
  dot: Boolean,
  bordered: {
    type: Boolean,
    default: true,
  },
  max: Number,
  content: [Number, String] as PropType<ABadgeProps['content']>,
  anchor: {
    type: String as PropType<NoUndefined<ABadgeProps['anchor']>>,
    default: 'top right',
  },
  overlap: {
    type: Boolean,
    default: true,
  },
  offsetX: {
    type: [Number, String] as PropType<NoUndefined<ABadgeProps['offsetX']>>,
    default: 4,
  },
  offsetY: {
    type: [Number, String] as PropType<NoUndefined<ABadgeProps['offsetY']>>,
    default: 4,
  },
} as const) satisfies Required<ComponentObjectPropsOptions<ABadgeProps>>

// 👉 Slots
export const aBadgeSlots = {

  /**
   * Default slot for rendering badge content
   */
  default: {},
} as const

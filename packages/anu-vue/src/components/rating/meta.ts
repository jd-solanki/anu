import type { ComponentObjectPropsOptions } from 'vue'
import type { ColorProp } from '@/composables/useProps'
import { color as colorProp, disabled as disabledProp, readonly as readonlyProp } from '@/composables/useProps'
import type { NoUndefined } from '@/utils/typescripts'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
export interface ARatingProps {

  /**
   * Rating color
   */
  color?: ColorProp

  /**
   * Bind v-model value to rating
   */
  modelValue?: number

  /**
   * Sets amount of rating items
   */
  length?: number | string

  /**
   * Allows the award of half a point
   */
  halve?: boolean

  /**
   * Sets empty icon
   */
  emptyIcon?: string

  /**
   * Sets half-filled icon
   */
  halfIcon?: string

  /**
   * Sets filled icon
   */
  fullIcon?: string

  /**
   * Allows to see visual changes of value on hover
   */
  noHoverHint?: boolean

  /**
   * Animate icon on hover
   */
  animate?: boolean

  /**
   * Make rating component readonly
   */
  readonly?: boolean

  /**
   * Disable rating selection
   */
  disabled?: boolean
}

export const aRatingProps = ({
  color: {
    ...colorProp,
    default: 'warning',
  },
  modelValue: Number,
  length: {
    type: [Number, String] as PropType<NoUndefined<ARatingProps['length']>>,
    default: 5,
  },
  halve: Boolean,
  emptyIcon: {
    type: String,
    default: 'i-bx:star',
  },
  halfIcon: {
    type: String,
    default: 'i-bx:bxs-star-half',
  },
  fullIcon: {
    type: String,
    default: 'i-bx:bxs-star',
  },
  noHoverHint: Boolean,
  animate: Boolean,
  readonly: readonlyProp,
  disabled: disabledProp,
} as const) satisfies Required<ComponentObjectPropsOptions<ARatingProps>>

// 👉 Slots
export const aRatingSlots = {} as const

// 👉 Events
export interface ARatingEvents {
  (e: 'update:modelValue', value: ARatingProps['modelValue']): void
}

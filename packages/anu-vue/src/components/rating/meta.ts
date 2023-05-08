import type { ExtractPublicPropTypes } from 'vue'
import { color as colorProp, disabled as disabledProp, readonly as readonlyProp } from '@/composables/useProps'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
export const aRatingProps = {
  color: {
    ...colorProp,
    default: 'warning',
  },

  /**
   * Bind v-model value to rating
   */
  modelValue: Number,

  /**
   * Sets amount of rating items
   */
  length: {
    type: [Number, String] as PropType<number | string>,
    default: 5,
  },

  /**
   * Allows the award of half a point
   */
  halve: Boolean,

  /**
   * Sets empty icon
   */
  emptyIcon: {
    type: String,
    default: 'i-bx:star',
  },

  /**
   * Sets half-filled icon
   */
  halfIcon: {
    type: String,
    default: 'i-bx:bxs-star-half',
  },

  /**
   * Sets filled icon
   */
  fullIcon: {
    type: String,
    default: 'i-bx:bxs-star',
  },

  /**
   * Allows to see visual changes of value on hover
   */
  noHoverHint: Boolean,

  /**
   * Animate icon on hover
   */
  animate: Boolean,

  /**
   * Make rating component readonly
   */
  readonly: readonlyProp,

  /**
   * Disable rating selection
   */
  disabled: disabledProp,
} as const
export type ARatingProps = ExtractPublicPropTypes<typeof aRatingProps>

// 👉 Slots
export const aRatingSlots = {} as const

// 👉 Events
export interface ARatingEvents {
  (e: 'update:modelValue', value: ARatingProps['modelValue']): void
}

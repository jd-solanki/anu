import type { UseSwipeDirection } from '@vueuse/core'
import type { LiteralUnion } from 'type-fest'
import type { ExtractPublicPropTypes } from 'vue'
import type { Transitions } from '@/transitions'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
export const aViewsProps = {
  /**
   * Active view value
   */
  modelValue: {
    type: null,
    default: 0,
  },

  /**
   * Transition to use
   */
  transition: {
    type: String as PropType<LiteralUnion<Transitions, string>>,
    default: 'fade',
  },
} as const

export type AViewsProps = ExtractPublicPropTypes<typeof aViewsProps>

// 👉 Slots
// TODO: It has nested dynamic slots inside default slot
export const aViewsSlots = {} as const

// 👉 Events
export interface AViewsEvents {

  /**
   * Emitted when the view is swiped
   */
  (e: 'swipe', direction: UseSwipeDirection): void
}

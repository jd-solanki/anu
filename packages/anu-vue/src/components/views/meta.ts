import type { UseSwipeDirection } from '@vueuse/core'
import { transition as transitionProp } from 'anu-vue/composables/useProps'
import type { ExtractPublicPropTypes } from 'vue'

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
    ...transitionProp,
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

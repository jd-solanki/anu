import type { UseSwipeDirection } from '@vueuse/core'
import type { LiteralUnion } from 'type-fest'
import type { ComponentObjectPropsOptions } from 'vue'
import type { NoUndefined } from '@/utils/typescripts'
import type { Transitions } from '@/transitions'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
export interface AViewsProps {

  /**
   * Active view value
   */
  modelValue?: any

  /**
   * Transition to use
   */
  transition?: LiteralUnion<Transitions, string>
}

export const aViewsProps = ({
  modelValue: {
    type: null,
    default: 0,
  },
  transition: {
    type: String as PropType<NoUndefined<AViewsProps['transition']>>,
    default: 'fade',
  },
} as const) satisfies Required<ComponentObjectPropsOptions<AViewsProps>>

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

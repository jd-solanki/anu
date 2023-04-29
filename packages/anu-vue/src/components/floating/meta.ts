import type { Middleware, Placement, Strategy } from '@floating-ui/vue'
import { flip, shift } from '@floating-ui/vue'
import type { LiteralUnion } from 'type-fest'
import type { ComponentObjectPropsOptions } from 'vue'
import { sameWidth as sameWidthMiddleware } from './middlewares'
import type { NoUndefined } from '@/utils/typescripts'
import type { Transitions } from '@/transitions'

// ℹ️ Make sure to checkout meta definition rules

export type AFloatingReferenceEl = HTMLElement | null | undefined

// 👉 Props
export type AFloatingMiddlewareFunc = (referenceEl: Ref<AFloatingReferenceEl>, refFloating: Ref<HTMLElement>) => Middleware[]
export const middlewareFunc: AFloatingMiddlewareFunc = (referenceEl, refFloating) => [
  // ℹ️ For this we need need bridge to handle keep menu content open
  // offset(6),

  sameWidthMiddleware(refFloating),
  flip(),
  shift({ padding: 10 }),
]

export interface AFloatingProps {
  referenceEl?: AFloatingReferenceEl

  /**
   * Show/Hide floating element base on v-model value
   */
  modelValue?: boolean

  /**
   * Persistence of floating element when clicked outside of reference element
   */
  persist?: boolean | 'content'

  /**
   * Trigger event to open the floating element
   */
  trigger?: 'click' | 'hover'

  /**
   * Delay before showing floating element
   */
  delay?: number

  /**
   * Delay before hiding floating element
   */
  hideDelay?: number

  /**
   * Transition to add while showing/hiding floating element
   */
  transition?: LiteralUnion<Transitions, string> | null

  // -- Floating UI based Props

  // https://floating-ui.com/docs/computePosition#placement
  /**
   * Placement option from Floating UI
   */
  placement?: Placement

  // https://floating-ui.com/docs/computePosition#strategy
  /**
   * Strategy option from Floating UI
   */
  strategy?: Strategy

  // https://floating-ui.com/docs/tutorial#middleware
  /**
   * Middleware option from Floating UI
   */
  middleware?: AFloatingMiddlewareFunc
}

export const aFloatingProps = ({
  referenceEl: {
    type: Object as PropType<AFloatingProps['referenceEl']>,
  },

  modelValue: {
    type: Boolean,
    default: undefined,
  },
  persist: {
    type: [Boolean, String] as PropType<NoUndefined<AFloatingProps['persist']>>,
    default: false,
  },
  trigger: {
    type: String as PropType<NoUndefined<AFloatingProps['trigger']>>,
    default: 'click',
  },
  delay: {
    type: Number,
    default: 0,
  },
  hideDelay: {
    type: Number,
    default: 0,
  },
  transition: {
    type: [String, null] as PropType<NoUndefined<AFloatingProps['transition']>>,
    default: 'slide-y',
  },

  placement: {
    type: String as PropType<Placement>,
    default: 'bottom-start',
  },
  strategy: {
    type: String as PropType<Strategy>,
    default: 'absolute',
  },
  middleware: {
    type: Function as PropType<AFloatingMiddlewareFunc>,
    default: middlewareFunc,
  },
} as const) satisfies Required<ComponentObjectPropsOptions<AFloatingProps>>

// 👉 Slots
export const aFloatingSlots = {
  default: {},
} as const

// 👉 Events
export interface AFloatingEvents {
  (e: 'update:modelValue', value: boolean): void
  (e: 'show'): void
  (e: 'hide'): void
}

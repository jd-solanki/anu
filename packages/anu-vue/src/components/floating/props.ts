import type { Middleware, Placement, Strategy } from '@floating-ui/vue'
import type { ExtractPropTypes, PropType, Ref } from 'vue'

export const floatingProps = {
  referenceEl: {
    type: Object as PropType<HTMLElement | any>,
  },

  /**
   * Show/Hide floating element base on v-model value
   */
  modelValue: {
    type: Boolean,
    default: undefined,
  },

  /**
   * Persistence of floating element when clicked outside of reference element
   */
  persist: {
    type: [Boolean, String] as PropType<boolean | 'content'>,
    default: false,
  },

  /**
   * Trigger event to open the floating element
   */
  trigger: {
    type: String as PropType<'click' | 'hover'>,
    default: 'click',
  },

  /**
   * Delay before showing floating element
   */
  delay: {
    type: Number,
    default: 0,
  },

  /**
   * Delay before hiding floating element
   */
  hideDelay: {
    type: Number,
    default: 0,
  },

  /**
   * Transition to add while showing/hiding floating element
   */
  transition: {
    type: [String, null] as PropType<string | null>,
    default: 'slide-up',
  },

  // -- Floating UI based Props

  // https://floating-ui.com/docs/computePosition#placement
  /**
   * Placement option from Floating UI
   */
  placement: {
    type: String as PropType<Placement>,
    default: 'bottom-start',
  },

  // https://floating-ui.com/docs/computePosition#strategy
  /**
   * Strategy option from Floating UI
   */
  strategy: {
    type: String as PropType<Strategy>,
    default: 'absolute',
  },

  // https://floating-ui.com/docs/tutorial#middleware
  /**
   * Middleware option from Floating UI
   */
  middleware: Function as PropType<(referenceEl: Ref<HTMLElement>, floatingEl: Ref<HTMLElement>) => Middleware[]>,
}

export type FloatingProps = ExtractPropTypes<typeof floatingProps>

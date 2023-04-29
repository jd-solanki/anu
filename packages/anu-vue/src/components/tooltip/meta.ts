import { flip, offset, shift } from '@floating-ui/vue'
import type { ComponentObjectPropsOptions } from 'vue'
import type { AFloatingMiddlewareFunc, AFloatingProps } from '@/components/floating'
import { aFloatingProps } from '@/components/floating'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
const { referenceEl: _, ...floatingRestProps } = aFloatingProps
export const middlewareFunc: AFloatingMiddlewareFunc = () => [
  offset(10),
  flip(),
  shift({ padding: 10 }),

  // arrow({
  //   element: arrowEl,
  // }),
]

export interface ATooltipProps extends Omit<AFloatingProps, 'referenceEl'> {

  /**
   * Text to render in tooltip
   */
  text?: string
}

export const aTooltipProps = ({
  ...{
    ...floatingRestProps,
    trigger: {
      ...floatingRestProps.trigger,
      default: 'hover',
    },
    placement: {
      ...floatingRestProps.placement,
      default: 'bottom',
    },
    middleware: {
      ...floatingRestProps.middleware,
      default: middlewareFunc,
    },
  },
  text: String,
} as const) satisfies Required<ComponentObjectPropsOptions<ATooltipProps>>

// 👉 Slots
export const aTooltipSlots = {

  /**
   * Default slot for rendering tooltip content. If default slot is used `text` prop will be discarded.
   */
  default: {},
} as const

// 👉 Events
export interface ATooltipEvents {}

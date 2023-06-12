import { flip, offset, shift } from '@floating-ui/vue'
import type { ExtractPublicPropTypes } from 'vue'
import type { AFloatingMiddlewareFunc } from '@/components/floating'
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

export const aTooltipProps = {
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

  /**
   * Text to render in tooltip
   */
  text: String,
} as const
export type ATooltipProps = ExtractPublicPropTypes<typeof aTooltipProps>

// 👉 Slots
export const aTooltipSlots = {

  /**
   * Default slot for rendering tooltip content. If default slot is used `text` prop will be discarded.
   */
  default: (_: any) => null as any,
} as const

import { flip, offset, shift } from '@floating-ui/vue'
import type { ExtractPropTypes, PropType } from 'vue'
import type { MiddlewareFunc } from '@/components/floating'
import { floatingProps } from '@/components/floating'
import { defuProps } from '@/composables/useProps'

const { referenceEl: _, middleware: __, ...floatingRestProps } = floatingProps
export const middlewareFunc: MiddlewareFunc = () => [
  offset(10),
  flip(),
  shift({ padding: 10 }),

  // arrow({
  //   element: arrowEl,
  // }),
]

// TODO: Fix types (add types so we get autocomplete)
const tooltipDefaultProps = {
  trigger: {
    default: 'hover',
  },
  placement: {
    default: 'bottom',
  },
}

export const tooltipProps = {
  ...defuProps(tooltipDefaultProps, floatingRestProps),

  // https://floating-ui.com/docs/tutorial#middleware
  /**
   * Middleware option from Floating UI
   */
  middleware: {
    type: Function as PropType<MiddlewareFunc>,
    default: middlewareFunc,
  },

  /**
    * Text to render in tooltip
    */
  text: {
    type: String,
    default: '',
  },
}

export type TooltipProps = ExtractPropTypes<typeof tooltipProps>

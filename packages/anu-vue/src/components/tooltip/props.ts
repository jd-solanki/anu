import type { ExtractPropTypes } from 'vue'
import { floatingProps } from '@/components/floating'
import { defuProps } from '@/composables/useProps'

const { referenceEl: _, ...floatingRestProps } = floatingProps

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

  /**
    * Text to render in tooltip
    */
  text: {
    type: String,
    default: '',
  },
}

export type TooltipProps = ExtractPropTypes<typeof tooltipProps>

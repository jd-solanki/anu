import type { ExtractPropTypes, PropType } from 'vue'
// import type { typeArc } from '@/composables/useTrigonometry'

import { useProps as useLayerProps } from '@/composables/useLayer'

export const circleProps = {
  ...useLayerProps({
    variant: {
      default: 'text',
    },
  }),

  /**
   * Toggle loading state
   */
  loading: {
    type: Boolean,
    default: true,
  },

  /**
     * Set animation state
     */
  animation: {
    type: String,
    default: null,
  },

  value: {
    type: [Number, String, Array, Object], //  as PropType<typeArc[]>, Object as PropType<typeArc>], <-- it's break component-meta api !
    default: 0,
  },
  isPercentages: {
    type: Boolean,
    default: true,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  rounded: {
    type: Boolean,
    default: false,
  },

  svgClasses: {
    type: String,
    default: null,
  },
  svgStyles: {
    type: String,
    default: null,
  },
  ringClasses: {
    type: String,
    default: null,
  },

  type: {
    type: String as PropType<'doughnut' | 'pie'>,
    default: 'doughnut',
  },
  viewBox: {
    type: String,
    default: null,
  },

}

export type CircleProps = ExtractPropTypes<typeof circleProps>

import type { ExtractPropTypes } from 'vue'
import { useProps as useLayerProps } from '@/composables/useLayer'

export const circleProps = {
  ...useLayerProps({
    variant: {
      default: undefined,
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
    type: [Number, Array],
    default: 25,
  },
  isPercent: {
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
  ringClasses: {
    type: String,
    default: null,
  },

}

export type CircleProps = ExtractPropTypes<typeof circleProps>

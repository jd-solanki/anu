import type { ExtractPropTypes } from 'vue'
import { typographyProps } from '@/components/typography/props'
import { useProps as useLayerProps } from '@/composables/useLayer'
import { color } from '@/composables/useProps'

export const loaderProps = {
  ...useLayerProps({
    color: {
      default: 'primary',
    },
    variant: {
      default: undefined,
    },
  }),

  ...typographyProps,

  /**
   * Typography color
   */
  typographyColor: color,

  /**
   * Toggle loading state
   */
  loading: {
    type: Boolean,
    default: true,
  },

  /**
   * Set overlay to use ALoader inside component
   */
  overlay: {
    type: Boolean,
    default: false,
  },

  /**
   * Overlay color
   */
  overlayColor: color,

  /**
   * Display loader in full page mode
   */
  fullPage: {
    type: Boolean,
    default: false,
  },
}

export type LoaderProps = ExtractPropTypes<typeof loaderProps>

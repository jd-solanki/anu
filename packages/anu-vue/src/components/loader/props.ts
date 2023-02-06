import type { ExtractPropTypes } from 'vue'
import { typographyProps } from '@/components/typography/props'

export const loaderProps = {
  ...typographyProps,

  /**
   * Toggle loading state
   */
  loading: {
    type: Boolean,
    default: true,
  },

  /**
   * Display loader in full page mode
   */
  fullPage: {
    type: Boolean,
    default: false,
  },
}

export type LoaderProps = ExtractPropTypes<typeof loaderProps>

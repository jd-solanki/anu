import type { ExtractPropTypes } from 'vue'
import { typographyProps } from '@/components/typography/props'
import { useProps as useLayerProps } from '@/composables/useLayer'
import { spacing } from '@/composables/useProps'

export const cardProps = {
  ...useLayerProps(),
  ...typographyProps,
  spacing,

  /**
   * Render image at the top of the card (_above header_)
   */
  img: String,

  /**
   * `alt` attribute for image rendered via `img` prop
   */
  imgAlt: String,

  /**
   * Set loading state
   */
  loading: {
    type: Boolean,
    default: false,
  },
}

export type CardProps = ExtractPropTypes<typeof cardProps>

import type { ExtractPropTypes, PropType } from 'vue'
import type { LoaderProps } from '@/components/loader/props'
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
    type: [Boolean, Object] as PropType<boolean | LoaderProps>,
    default: undefined,
  },
}

export type CardProps = ExtractPropTypes<typeof cardProps>

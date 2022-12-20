import type { ExtractPropTypes } from 'vue'
import { typographyProps } from '@/components/typography/props'
import { useProps as useLayerProps } from '@/composables/useLayer'
import { spacing } from '@/composables/useProps'

export const cardProps = {
  ...useLayerProps(),
  ...typographyProps,
  spacing,
  img: String,
  alt: String,
}

export type CardProps = ExtractPropTypes<typeof cardProps>

import type { ExtractPropTypes } from 'vue'
import { configurable } from '@/composables/useProps'

export const typographyProps = {
  /**
   * Typography title
   */
  title: configurable,

  /**
   * Typography subtitle
   */
  subtitle: configurable,

  /**
   * Typography text content
   */
  text: configurable,

  /**
   * Tag to use for title of the card
   */
  titleTag: {
    type: String,
    default: 'span',
  },

  /**
   * Tag to use for subtitle of the card
   */
  subtitleTag: {
    type: String,
    default: 'span',
  },

  /**
   * Tag to use for text rendered via `text` prop
   */
  textTag: {
    type: String,
    default: 'span',
  },
}

export type TypographyProps = ExtractPropTypes<typeof typographyProps>

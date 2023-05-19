import type { ExtractPublicPropTypes } from 'vue'
import { configurable } from '@/composables/useProps'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
export const aTypographyProps = {
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
   * Tag to use for title of the component
   */
  titleTag: {
    type: String,
    default: 'p',
  },

  /**
   * Tag to use for subtitle of the component
   */
  subtitleTag: {
    type: String,
    default: 'p',
  },

  /**
   * Tag to use for text rendered via `text` prop
   */
  textTag: {
    type: String,
    default: 'p',
  },
} as const
export type ATypographyProps = ExtractPublicPropTypes<typeof aTypographyProps>

// 👉 Slots
export const aTypographySlots = {
  /**
   * Render custom content for title
   */
  'title': (_: any) => null as any,

  /**
   * Render custom content for subtitle
   */
  'subtitle': (_: any) => null as any,

  /**
   * Render custom content on right side of title & subtitle.
   * Content inside this slot will be vertically centered to title & subtitle.
   */
  'header-right': (_: any) => null as any,

  /**
   * Default slot for rendering text.
   */
  'default': (_: any) => null as any,
} as const

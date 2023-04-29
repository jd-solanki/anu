import type { ComponentObjectPropsOptions } from 'vue'
import type { ConfigurableValue } from '@/composables/useConfigurable'
import { configurable } from '@/composables/useProps'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
export interface ATypographyProps {

  /**
   * Typography title
   */
  title?: ConfigurableValue

  /**
   * Typography subtitle
   */
  subtitle?: ConfigurableValue

  /**
   * Typography text content
   */
  text?: ConfigurableValue

  /**
   * Tag to use for title of the component
   */
  titleTag?: string

  /**
   * Tag to use for subtitle of the component
   */
  subtitleTag?: string

  /**
   * Tag to use for text rendered via `text` prop
   */
  textTag?: string
}

export const aTypographyProps = ({
  title: configurable,

  subtitle: configurable,

  text: configurable,

  titleTag: {
    type: String,
    default: 'p',
  },

  subtitleTag: {
    type: String,
    default: 'p',
  },

  textTag: {
    type: String,
    default: 'p',
  },
} as const) satisfies Required<ComponentObjectPropsOptions<ATypographyProps>>

// 👉 Slots
export const aTypographySlots = {
  /**
   * Render custom content for title
   */
  'title': {},

  /**
   * Render custom content for subtitle
   */
  'subtitle': {},

  /**
   * Render custom content on right side of title & subtitle.
   * Content inside this slot will be vertically centered to title & subtitle.
   */
  'header-right': {},

  /**
   * Default slot for rendering text.
   */
  'default': {},
} as const

// 👉 Events
export interface ATypographyEvents {}

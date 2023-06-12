import type { ExtractPublicPropTypes } from 'vue'
import { aLayerProps } from '@/composables/useLayer'
import { configurable } from '@/composables/useProps'

// ℹ️ Make sure to checkout prop definition rules

// 👉 Props
export const aAvatarProps = {
  ...{
    ...aLayerProps,
    color: {
      ...aLayerProps.color,
      default: 'primary',
    },
    variant: {
      ...aLayerProps.variant,
      default: 'light',
    },
  },

  /**
   * Icon to render in avatar
   */
  icon: configurable,

  /**
   * Content to render inside avatar
   */
  content: String,

  /**
   * Render image using this prop
   */
  src: String,

  /**
   * Provide alt attribute for image given by `src` prop
   */
  alt: {
    type: String,
    default: 'avatar',
  },
} as const
export type AAvatarProps = ExtractPublicPropTypes<typeof aAvatarProps>

// 👉 Slots
export const aAvatarSlots = {

  /**
   * Default slot for rendering avatar content. If default slots is used `src`, `alt`, `icon` & `content` prop usage will be ignored.
   */
  default: (_: any) => null as any,
}

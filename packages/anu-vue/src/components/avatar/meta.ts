import type { ComponentObjectPropsOptions } from 'vue'
import type { ConfigurableValue } from '@/composables/useConfigurable'
import type { ALayerProps } from '@/composables/useLayer'
import { aLayerProps } from '@/composables/useLayer'
import { configurable } from '@/composables/useProps'

// 👉 Props
// ℹ️ Make sure to checkout prop definition rules
export interface AAvatarProps extends ALayerProps {

  /**
   * Icon to render in avatar
   */
  icon?: ConfigurableValue

  /**
   * Content to render inside avatar
   */
  content?: string

  /**
   * Render image using this prop
   */
  src?: string

  /**
   * Provide alt attribute for image given by `src` prop
   */
  alt?: string
}

export const aAvatarProps = ({
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
  icon: configurable,
  content: String,
  src: String,
  alt: {
    type: String,
    default: 'avatar',
  },
} as const) satisfies Required<ComponentObjectPropsOptions<AAvatarProps>>

// 👉 Slots
export const aAvatarSlots = {

  /**
   * Default slot for rendering avatar content. If default slots is used `src`, `alt`, `icon` & `content` prop usage will be ignored.
   */
  default: {},
}

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableValue } from '@/composables/useConfigurable'

export const avatarOnlyProps = {
  /**
   * Icon to render in avatar
   */
  icon: {
    type: [Array, String] as PropType<ConfigurableValue>,
    required: false,
    default: undefined,
  },

  /**
   * Content to render inside avatar
   */
  content: {
    type: String,
    required: false,
    default: undefined,
  },

  /**
   * Render image using this prop
   */
  src: {
    type: String,
    required: false,
    default: undefined,
  },

  /**
   * Provide alt attribute for image given by `src` prop
   */
  alt: {
    type: String,
    required: false,
    default: 'avatar',
  },
}

export type AvatarOnlyProps = ExtractPropTypes<typeof avatarOnlyProps>

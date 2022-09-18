import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableValue } from '@/composables/useConfigurable'

export const avatarOnlyProps = {
  icon: {
    type: [Array, String] as PropType<ConfigurableValue>,
    required: false,
    default: undefined,
  },
  content: {
    type: String,
    required: false,
    default: undefined,
  },
  src: {
    type: String,
    required: false,
    default: undefined,
  },
  alt: {
    type: String,
    required: false,
    default: 'avatar',
  },
}

export type AvatarOnlyProps = ExtractPropTypes<typeof avatarOnlyProps>

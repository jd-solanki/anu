import type { ConfigurableValue } from '@/composables/useConfigurable'
import type { LayerProps } from '@/composables/useLayer'

export interface AvatarProps extends LayerProps {
  spacing?: number
  icon?: ConfigurableValue
  content?: string
  src?: string
  alt?: string
}

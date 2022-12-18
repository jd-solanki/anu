import type { AvatarProps } from '@/components/avatar'
import type { TypographyProps } from '@/components/typography'
import type { LayerProps } from '@/composables/useLayer'

export interface ListItemProps extends LayerProps, TypographyProps {
  value?: unknown
  icon?: string
  disable?: boolean
  avatarProps?: AvatarProps
  avatarAppend?: boolean
  iconAppend?: boolean
  isActive?: boolean
}

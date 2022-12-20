import type { ExtractPropTypes, PropType } from 'vue'
import type { AvatarProps } from '@/components/avatar'
import { configurable, disabled } from '@/composables/useProps'

import { typographyProps } from '@/components/typography'
import { useProps as useLayerProps } from '@/composables/useLayer'

export const listItemProps = {
  ...useLayerProps({
    states: {
      default: true,
    },
  }),
  ...typographyProps,

  /**
   * List item value, makes list item clickable.
   */
  value: null,

  /**
   * List item icon
   */
  icon: configurable,

  /**
   * Render icon at the end instead of starting of list item
   */
  iconAppend: Boolean,

  /**
   * Mark list item disabled
   */
  disabled,

  /**
   * Props for rendering avatar.
   */
  avatarProps: Object as PropType<AvatarProps>,

  /**
   * Render avatar at the end instead of starting of list item
   */
  avatarAppend: Boolean,

  /**
   * Mark list item as active
   */
  isActive: Boolean,
}

export type ListItemProps = ExtractPropTypes<typeof listItemProps>

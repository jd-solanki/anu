import type { ComponentObjectPropsOptions } from 'vue'
import type { AAvatarProps } from '@/components/avatar'
import { configurable, disabled } from '@/composables/useProps'

import type { ATypographyProps } from '@/components/typography'
import { aTypographyProps } from '@/components/typography'
import type { ConfigurableValue } from '@/composables/useConfigurable'
import type { ALayerProps } from '@/composables/useLayer'
import { aLayerProps } from '@/composables/useLayer'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
export interface AListItemProps extends ALayerProps, ATypographyProps {

  /**
   * List item value, makes list item clickable.
   */
  value?: any

  /**
   * List item icon
   */
  icon?: ConfigurableValue

  /**
   * Render icon at the end instead of starting of list item
   */
  iconAppend?: boolean

  /**
   * Mark list item disabled
   */
  disabled?: boolean

  /**
   * Props for rendering avatar.
   */
  avatarProps?: AAvatarProps

  /**
   * Render avatar at the end instead of starting of list item
   */
  avatarAppend?: boolean

  /**
   * Mark list item as active
   */
  isActive?: boolean
}

export const aListItemProps = ({
  ...{
    ...aLayerProps,
    states: {
      ...aLayerProps.states,
      default: true,
    },
  },

  ...aTypographyProps,

  // ℹ️ If we want any type need to set `propName: { type: null }`. Using `propName: null` will omit (disable) the prop.
  value: { type: null },
  icon: configurable,
  iconAppend: Boolean,
  disabled,
  avatarProps: Object,
  avatarAppend: Boolean,
  isActive: Boolean,
} as const) satisfies ComponentObjectPropsOptions<AListItemProps>

// 👉 Slots
export const aListItemSlots = {
  /**
   * Render custom content and override other slots.
   */
  default: {
    item: Object as unknown as AListItemProps,
    attrs: Object as unknown as Record<string, unknown>,
  },

  /**
   * Prepend custom content to the list item
   */
  prepend: {
    item: Object as unknown as AListItemProps,
    attrs: Object as unknown as Record<string, unknown>,
  },

  /**
   * Render custom content instead of `ATypography` preserving `prepend` and `append` slot usage
   */
  content: {
    item: Object as unknown as AListItemProps,
    attrs: Object as unknown as Record<string, unknown>,
  },

  /**
   * Append custom content to the list item
   */
  append: {
    item: Object as unknown as AListItemProps,
    attrs: Object as unknown as Record<string, unknown>,
  },
} as const

// 👉 Events
export interface AListItemEvents {
  (e: 'click:icon'): void
  (e: 'click:avatar'): void
  (e: 'click:iconAppend'): void
  (e: 'click:avatarAppend'): void
}

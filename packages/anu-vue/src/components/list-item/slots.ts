import type { ListItemProps } from './props'

export const listItemSlots = {
  /**
   * Render custom content and override other slots.
   */
  default: {
    item: Object as unknown as ListItemProps,
    attrs: Object,
  },

  /**
   * Prepend custom content to the list item
   */
  prepend: {
    item: Object as unknown as ListItemProps,
    attrs: Object as unknown,
  },

  /**
   * Render custom content instead of `ATypography` preserving `prepend` and `append` slot usage
   */
  content: {
    item: Object as unknown as ListItemProps,
    attrs: Object as unknown,
  },

  /**
   * Append custom content to the list item
   */
  append: {
    item: Object as unknown as ListItemProps,
    attrs: Object as unknown,
  },
}

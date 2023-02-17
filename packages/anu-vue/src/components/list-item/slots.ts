import type { ListItemProps } from './props'

export const listItemSlots = {
  default: {
    item: Object as unknown as ListItemProps,
    attrs: Object,
  },
  prepend: {
    item: Object as unknown as ListItemProps,
    attrs: Object as unknown,
  },
  item: {
    item: Object as unknown as ListItemProps,
    attrs: Object as unknown,
  },
  append: {
    item: Object as unknown as ListItemProps,
    attrs: Object as unknown,
  },
} as const

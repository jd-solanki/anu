import type { ListItemProps } from './props'

export const listItemSlots = {
  prepend: {
    item: Object as unknown as ListItemProps,
  },
  item: {
    item: Object as unknown as ListItemProps,
  },
  append: {
    item: Object as unknown as ListItemProps,
  },
} as const

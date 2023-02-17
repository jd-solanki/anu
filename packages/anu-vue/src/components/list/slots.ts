import type { ListPropItems } from './props'
import { listItemSlots } from '@/components/list-item/slots'

export const listOwnSlots = {
  before: {},
  default: {
    handleListItemClick: Function as unknown as (item: ListPropItems[number], index: number) => void,
  },
  after: {},
} as const

export const listItemSlot = {
  'item-prepend': {
    item: listItemSlots.prepend.item,
    index: Number(),
  },
  'item-item': {
    item: listItemSlots.item.item,
    index: Number(),
  },
  'item-append': {
    item: listItemSlots.append.item,
    index: Number(),
  },
} as const

export const listSlots = {
  ...listItemSlot,
  ...listOwnSlots,
} as const

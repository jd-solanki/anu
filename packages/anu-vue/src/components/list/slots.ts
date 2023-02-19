import type { ListPropItems } from './props'
import { listItemSlots as listItemComponentSlots } from '@/components/list-item/slots'
import { prefixObjectKeys } from '@/utils/helpers'

export const listOwnSlots = {
  before: {},
  default: {
    handleListItemClick: Function as unknown as (item: ListPropItems[number], index: number) => void,
  },
  after: {},
} as const

// export const listItemSlots = {
//   'item-prepend': {
//     item: listItemComponentSlots.prepend.item,
//     index: Number(),
//   },
//   'item-item': {
//     item: listItemComponentSlots.item.item,
//     index: Number(),
//   },
//   'item-append': {
//     item: listItemComponentSlots.append.item,
//     index: Number(),
//   },
// } as const

const { 'item-default': _, ...listItemSlots } = prefixObjectKeys(listItemComponentSlots, 'item-')
export { listItemSlots }

export const listSlots = {
  ...listItemSlots,
  ...listOwnSlots,
} as const

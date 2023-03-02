import type { ListPropItems } from './props'
import { listItemSlots as listItemComponentSlots } from '@/components/list-item/slots'
import { prefixObjectKeys } from '@/utils/helpers'

export const listOwnSlots = {
  /**
   * Render custom content before list items
   */
  before: {},

  /**
   * Default slot to render custom content instead of `AListItem`
   */
  default: {
    handleListItemClick: Function as unknown as (item: ListPropItems[number], index: number) => void,
  },

  /**
   * Render custom content after list items
   */
  after: {},
}

export const listItemSlotsPrefix = 'item-'
const { 'item-default': _, ...listItemSlots } = prefixObjectKeys(listItemComponentSlots, listItemSlotsPrefix)
export { listItemSlots }

export const listSlots = {
  ...listItemSlots,
  ...listOwnSlots,
}

import type { ExtractPublicPropTypes } from 'vue'
import type { AListItemProps } from '@/components/list-item'
import { aListItemProps, aListItemSlots } from '@/components/list-item'
import { prefixObjectKeys, prefixObjectKeysWithMeta } from '@/utils/helpers'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
export type AListPropItems = (AListItemProps | string | number)[]

const { avatarAppend, iconAppend, color, variant, states } = aListItemProps
export const aListProps = {
  /**
   * Items to render in list
   */
  'items': {
    type: Array as PropType<AListPropItems>,
    default: () => [],
  },

  /**
   * Enable selecting multiple list items
   */
  'multi': Boolean,

  /**
   * Bind v-model value to selected list item
   */
  'modelValue': null,

  // ℹ️ Workaround for checking if event is present on component instance: https://github.com/vuejs/core/issues/5220#issuecomment-1007488240
  'onClick:item': Function as PropType<(item: AListPropItems[number]) => void>,

  /**
   * Emit whole object when item is select instead of `item.value`
   */
  'emitObject': Boolean,

  // ℹ️ Below is list item props that will be passed to each list item
  avatarAppend,
  iconAppend,
  color,
  variant,
  states,
} as const
export type AListProps = ExtractPublicPropTypes<typeof aListProps>

// 👉 Slots
const aListItemSlotsPrefix = 'item-'
const { default: _, ...aListListItemSlotsUnPrefixed } = aListItemSlots
const aListListItemSlots = prefixObjectKeys(aListListItemSlotsUnPrefixed, aListItemSlotsPrefix)
const aListListItemSlotsWithPrefixMeta = prefixObjectKeysWithMeta(aListListItemSlotsUnPrefixed, aListItemSlotsPrefix)
export { aListListItemSlots, aListListItemSlotsWithPrefixMeta }

export const aListOwnSlots = {
  /**
   * Render custom content before list items
   */
  before: (_: any) => null as any,

  /**
   * Default slot to render custom content instead of `AListItem`
   */
  default: (_: {
    handleListItemClick: (item: AListPropItems[number]) => void
  }) => null as any,

  /**
   * Render custom content after list items
   */
  after: (_: any) => null as any,
} as const

// We inject `index` as well
// const extendedAListItemSlots = extendNestedObject(aListListItemSlots, { index: Number() })

export const aListSlots = {
  ...aListListItemSlots,
  ...aListOwnSlots,
} as const

// 👉 Events
export interface AListEvents {
  (e: 'update:modelValue', value: AListProps['modelValue']): void

  // ℹ️ This even is not triggered because we use accepting `onClick:item` as a prop
  // (e: 'click:item', value: { item: AListPropItems[number] }): void
}

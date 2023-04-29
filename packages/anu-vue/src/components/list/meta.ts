import type { ComponentObjectPropsOptions } from 'vue'
import type { AListItemProps } from '@/components/list-item'
import { aListItemProps, aListItemSlots } from '@/components/list-item'
import { extendNestedObject, prefixObjectKeys, prefixObjectKeysWithMeta } from '@/utils/helpers'
import type { NoUndefined } from '@/utils/typescripts'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
export type AListPropItems = (AListItemProps | string | number)[]

const { avatarAppend, iconAppend, color, variant, states } = aListItemProps

export interface AListProps extends Pick<AListItemProps, 'avatarAppend' | 'iconAppend' | 'color' | 'variant' | 'states'> {

  /**
   * Items to render in list
   */
  items?: AListPropItems

  /**
   * Enable selecting multiple list items
   */
  multi?: boolean

  /**
   * Bind v-model value to selected list item
   */
  modelValue?: any

  // ℹ️ Workaround for checking if event is present on component instance: https://github.com/vuejs/core/issues/5220#issuecomment-1007488240
  'onClick:item'?: (item: AListPropItems[number]) => void
}

export const aListProps = ({
  'items': {
    type: Array as PropType<NoUndefined<AListProps['items']>>,
    default: () => [],
  },

  'multi': Boolean,

  'modelValue': null,

  // ℹ️ Workaround for checking if event is present on component instance: https://github.com/vuejs/core/issues/5220#issuecomment-1007488240
  'onClick:item': Function as PropType<AListProps['onClick:item']>,

  // ℹ️ Below is list item props that will be passed to each list item
  avatarAppend,
  iconAppend,
  color,
  variant,
  states,
} as const) satisfies Required<ComponentObjectPropsOptions<AListProps>>

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
  before: {},

  /**
   * Default slot to render custom content instead of `AListItem`
   */
  default: {
    handleListItemClick: Function as unknown as (item: AListPropItems[number], index: number) => void,
  },

  /**
   * Render custom content after list items
   */
  after: {},
} as const

// We are inject `index` as well
const extendedAListItemSlots = extendNestedObject(aListListItemSlots, { index: Number() })

export const aListSlots = {
  ...extendedAListItemSlots,
  ...aListOwnSlots,
} as const

// 👉 Events
export interface AListEvents {
  (e: 'update:modelValue', value: AListProps['modelValue']): void

  // ℹ️ This even is not triggered because we use accepting `onClick:item` as a prop
  // (e: 'click:item', value: { item: AListPropItems[number] }): void
}

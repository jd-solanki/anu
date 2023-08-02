import { aBaseInputProps, aBaseInputSlots } from 'anu-vue/components/base-input'
import { aCardSlots } from 'anu-vue/components/card/meta'
import type { AListProps } from 'anu-vue/components/list'
import { aListSlots } from 'anu-vue/components/list'
import { prefixObjectKeys, prefixObjectKeysWithMeta } from 'anu-vue/utils/helpers'
import type { ExtractPublicPropTypes } from 'vue'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
export const aSelectProps = {
  ...aBaseInputProps,
  options: {
    type: Array as PropType<AListProps['items']>,
    default: () => [],
  },

  /**
   * Emit whole object when item is select instead of `item.value`
   */
  emitObject: Boolean,

  // ℹ️ If we want any type need to set `propName: { type: null }`. Using `propName: null` will omit (disable) the prop.
  modelValue: { type: null },
  optionsWrapperClasses: { type: null },
  listClasses: { type: null },
} as const
export type ASelectProps = ExtractPublicPropTypes<typeof aSelectProps>

// 👉 Slots
const { default: _, ...aSelectBaseInputSlots } = aBaseInputSlots
const { default: __, ...aSelectCardSlots } = aCardSlots
const { default: aSelectListDefaultSlot, ...aSelectListRestSlots } = aListSlots

const aSelectListSlotsPrefix = 'options-'
export const aSelectListSlots = {
  ...prefixObjectKeys(aSelectListRestSlots, aSelectListSlotsPrefix),

  // ℹ️ We don't want to rename the default slot and we are passing $attrs to it
  default: aSelectListDefaultSlot,
}

const aSelectListSlotsWithPrefixMeta = {
  ...prefixObjectKeysWithMeta(aSelectListRestSlots, aSelectListSlotsPrefix),
  ...prefixObjectKeysWithMeta({ default: aSelectListDefaultSlot }, ''),
}

export {
  aSelectBaseInputSlots,
  aSelectCardSlots,
  aSelectListSlotsWithPrefixMeta,
}
export const aSelectSlots = {
  ...aSelectBaseInputSlots,
  ...aSelectCardSlots,
  ...aSelectListSlots,
}

// 👉 Events
export interface ASelectEvents {
  (e: 'change', value: ASelectProps['modelValue']): void
  (e: 'input', value: ASelectProps['modelValue']): void
  (e: 'update:modelValue', value: ASelectProps['modelValue']): void
}

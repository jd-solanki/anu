import type { ComponentObjectPropsOptions } from 'vue'
import type { ABaseInputProps } from '@/components/base-input'
import { aBaseInputProps, aBaseInputSlots } from '@/components/base-input'
import { aCardSlots } from '@/components/card/meta'
import type { AListProps } from '@/components/list'
import { aListSlots } from '@/components/list'
import { prefixObjectKeys, prefixObjectKeysWithMeta } from '@/utils/helpers'
import type { NoUndefined } from '@/utils/typescripts'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
export interface ASelectProps extends ABaseInputProps {
  modelValue?: any
  options: AListProps['items']
  emitObject?: boolean
  optionsWrapperClasses: any
  listClasses: any
}

export const aSelectProps = ({
  ...aBaseInputProps,
  modelValue: [String, Number] as PropType<ASelectProps['modelValue']>,
  options: {
    type: Array as PropType<NoUndefined<ASelectProps['options']>>,
    default: () => [],
  },
  emitObject: Boolean,

  // ℹ️ If we want any type need to set `propName: { type: null }`. Using `propName: null` will omit (disable) the prop.
  optionsWrapperClasses: { type: null },
  listClasses: { type: null },
} as const) satisfies Required<ComponentObjectPropsOptions<ASelectProps>>

// 👉 Slots
const { default: _, ...aSelectBaseInputSlots } = aBaseInputSlots
const { default: __, ...aSelectCardSlots } = aCardSlots
const { default: aSelectListDefaultSlot, ...aSelectListRestSlots } = aListSlots

const aSelectListSlotsPrefix = 'options-'
export const aSelectListSlots = {
  ...prefixObjectKeys(aSelectListRestSlots, aSelectListSlotsPrefix),

  // ℹ️ We don't want to rename the default slot and we are passing $attrs to it
  default: { ...aSelectListDefaultSlot, attrs: Object as any },
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

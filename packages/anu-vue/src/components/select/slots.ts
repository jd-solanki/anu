import { baseInputSlots } from '@/components/base-input'
import { cardSlots } from '@/components/card'
import { listSlots } from '@/components/list'
import { prefixObjectKeys } from '@/utils/helpers'

// Remove default slot
const { default: _, ...selectBaseInputSlots } = baseInputSlots
const { default: __, ...selectCardSlots } = cardSlots

export { selectBaseInputSlots }
export { selectCardSlots }

const { default: selectListDefaultSlot, ...selectListRestSlots } = listSlots

export const selectListSlots = {
  ...prefixObjectKeys(selectListRestSlots, 'options-'),

  // ℹ️ We aren't renaming default slot but we want to get `prefixObjectKeys` return value like object
  ...prefixObjectKeys({ default: selectListDefaultSlot }, ''),
}

export const selectSlots = {
  ...selectBaseInputSlots,
  ...selectCardSlots,
  ...selectListSlots,
} as const

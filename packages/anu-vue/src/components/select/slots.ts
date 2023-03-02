import { baseInputSlots } from '@/components/base-input'
import { cardSlots } from '@/components/card'
import { listSlots } from '@/components/list'
import { prefixObjectKeys } from '@/utils/helpers'

// Remove default slot
const { default: _, ...selectBaseInputSlots } = baseInputSlots
const { default: __, ...selectCardSlots } = cardSlots

const { default: selectListDefaultSlot, ...selectListRestSlots } = listSlots

export const selectListSlotsPrefix = 'options-'
export const selectListSlots = {
  ...prefixObjectKeys(selectListRestSlots, selectListSlotsPrefix),

  // ℹ️ We don't want to rename the default slot
  default: selectListDefaultSlot,
}

// 🚀 Exports
//
// Select base input slots
export { selectBaseInputSlots }
export { selectCardSlots }

// Select list slots
export { selectListDefaultSlot }
export { selectListRestSlots }

// Select slots
export const selectSlots = {
  ...selectBaseInputSlots,
  ...selectCardSlots,
  ...selectListSlots,
}

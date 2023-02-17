import { baseInputSlots } from '@/components/base-input'
import { cardSlots } from '@/components/card'
import { listSlots } from '@/components/list'
import { prefixObjectKeys, removeKeys } from '@/utils/helpers'

export const selectBaseInputSlots = removeKeys(baseInputSlots, ['default'])
export const selectCardSlots = removeKeys(cardSlots, ['default'])
export const selectListSlots = prefixObjectKeys(listSlots, 'option-')

export const selectSlots = {
  ...selectBaseInputSlots,
  ...selectCardSlots,
  ...selectListSlots,
} as const

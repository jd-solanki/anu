import { baseInputSlots } from '@/components/base-input'
import { cardSlots } from '@/components/card'
import { listSlots } from '@/components/list'
import { prefixObjectKeys, removeKeys } from '@/utils/helpers'

export const selectBaseInputSlots = removeKeys(baseInputSlots, ['default'])
export const selectCardSlots = removeKeys(cardSlots, ['default'])

const { default: selectListDefaultSlot, ...selectListRestSlots } = listSlots

// export const selectListSlots = renameObjKey(
//   prefixObjectKeys(listSlots, 'options-'),
//   'options-default',
//   'default',
// )

export const selectListSlots = {
  ...prefixObjectKeys(selectListRestSlots, 'options-'),
  ...prefixObjectKeys({ default: selectListDefaultSlot }, ''),
}

export const selectSlots = {
  ...selectBaseInputSlots,
  ...selectCardSlots,
  ...selectListSlots,
} as const

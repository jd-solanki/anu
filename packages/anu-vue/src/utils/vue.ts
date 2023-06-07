import { objectKeys, objectMap } from '@antfu/utils'
import type { prefixObjectKeysWithMeta } from '@/utils/helpers'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const filterUsedSlots = computed(() => <const T extends Record<string, any>>(slotsToUse: T): (keyof T)[] => {
  const slots = useSlots()

  return objectKeys(slotsToUse).filter(key => slots[key as keyof typeof slots]) as (keyof T)[]
})

export const filterUsedRenamedSlots = computed(() => <const T extends ReturnType<typeof prefixObjectKeysWithMeta>>(slotsToUse: T): T => {
  const slots = useSlots()

  return objectMap(slotsToUse, (originalSlotName, obj) => slots[obj.prefixedKey] ? [originalSlotName, obj] : undefined) as T
})

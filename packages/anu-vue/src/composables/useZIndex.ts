import { isNumber } from '@antfu/utils'
import { computed, inject, ref } from 'vue'

import { ANU_Z_INDEX } from '@/symbols'

const zIndexCounter = ref(0)

export const useZIndex = createGlobalState((defaultBaseZIndex?: number) => {
  if (!defaultBaseZIndex)
    throw new Error('[Anu] `useZIndex` composable must be initialized before usage.')

  const injectedZIndex = inject(ANU_Z_INDEX)

  const baseZIndex = computed(() => {
    const injectedZIndexValue = injectedZIndex?.value

    return isNumber(injectedZIndexValue)
      ? injectedZIndexValue
      : defaultBaseZIndex
  })

  const activeZIndex = computed(() => baseZIndex.value + zIndexCounter.value)

  const getNextZIndex = () => {
    zIndexCounter.value++

    return activeZIndex.value
  }

  return {
    baseZIndex,
    activeZIndex,
    getNextZIndex,
  }
})

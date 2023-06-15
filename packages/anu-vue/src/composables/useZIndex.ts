import { isNumber } from '@antfu/utils'
import { type App, computed, inject, ref } from 'vue'

import { ANU_Z_INDEX } from '@/symbols'

const zIndexCounter = ref(0)

export const useZIndex = createGlobalState((defaultBaseZIndex?: number, app?: App) => {
  if (!defaultBaseZIndex || !app)
    throw new Error('[Anu] `useZIndex` composable must be initialized before usage.')

  let injectedZIndex: Ref<number | undefined> | undefined

  app.runWithContext(() => {
    injectedZIndex = inject(ANU_Z_INDEX, undefined)
  })

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

import type { InjectionKey, Ref } from 'vue'
import { computed, inject, ref, unref } from 'vue'
import { isNumber } from '@vueuse/core'

// TODO add Config Provider Component
export const zIndexContextKey: InjectionKey<Ref<number | undefined>> = Symbol('zIndexContextKey')

const zIndexCounter = ref(0)
export const defaultBaseZIndex = 2000 as const

export function useZIndex(customZIndex?: Ref<number>) {
  const injectedZIndex = customZIndex || inject(zIndexContextKey, undefined)

  const baseZIndex = computed(() => {
    const injectedZIndexValue = unref(injectedZIndex)

    return isNumber(injectedZIndexValue)
      ? injectedZIndexValue
      : defaultBaseZIndex
  })

  const activeZIndex = computed(() => baseZIndex.value + zIndexCounter.value)

  const nextZIndex = () => {
    zIndexCounter.value++

    return activeZIndex.value
  }

  return {
    baseZIndex,
    activeZIndex,
    nextZIndex,
  }
}

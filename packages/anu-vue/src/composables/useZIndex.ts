import type { InjectionKey, Ref } from 'vue'
import { computed, inject, ref, unref } from 'vue'
import { isNumber } from '@vueuse/core'

export const defaultBaseZIndex = 2000 as const

const zIndexCounter = ref(0)

export const zIndexContextKey: InjectionKey<Ref<number | undefined>> = Symbol('zIndexContextKey')

export function useZIndex() {
  const injectedZIndex = inject(zIndexContextKey, undefined)

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

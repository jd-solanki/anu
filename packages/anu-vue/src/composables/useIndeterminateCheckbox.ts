import type { MaybeRefOrGetter } from '@vueuse/core'
import type { Ref } from 'vue'

export function useIndeterminateCheckbox<T>(selected: Ref<T[]>, options: MaybeRefOrGetter<T[]>) {
  const _options = resolveRef(options)

  const vModel = computed({
    get() {
      return selected.value.length === _options.value.length
        ? true
        : selected.value.length === 0
          ? false
          : null
    },
    set(val) {
      selected.value = val ? _options.value : []
    },
  })

  return {
    vModel,
  }
}

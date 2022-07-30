import type { MaybeComputedRef } from '@vueuse/core'
import type { ComputedRef, Ref } from 'vue'
import { computed, ref, toRaw, unref, watch } from 'vue'

// TODO: Improve typings

interface ComposableParams<T> {
  multi?: MaybeComputedRef<boolean>
  options: T[] | number
}

interface OptionsOut<T> {
  value: T
  isSelected: ComputedRef<boolean>
}

export const useGroupModel = <T>(params: ComposableParams<T>) => {
  const { options, multi } = params

  const value = ref<T | number | Set<T | number> | undefined>()

  const select = (option: T | number) => {
    // If multiple selection is enabled
    if (unref(multi)) {
      // If value is not set (Means previously multi was false) => Initialize new set and assign it to value
      if (!(value.value instanceof Set)) { value.value = new Set([option]) }

      // Else toggle option in set
      else {
        if (value.value.has(option))
          value.value.delete(option)
        else value.value.add(option)
      }
    }
    else {
      value.value = option
    }
  }
  watch(
    () => unref(multi),
    () => {
      value.value = undefined
    },
  )

  const _options = ref([]) as Ref<OptionsOut<T | number>[]>

  if (typeof options === 'number') {
    _options.value = [...Array(options)].map((_, i) => ({
      value: i,
      isSelected: computed(() => i === value.value),
    }))
  }
  else {
    _options.value = options.map(option => ({
      value: option,
      isSelected: computed(() => {
        return unref(multi)
          ? value.value instanceof Set ? value.value.has(option) : false
          : option === toRaw(value.value)
      }),
    }))
  }

  return {
    options: _options,
    value,
    select,
  }
}

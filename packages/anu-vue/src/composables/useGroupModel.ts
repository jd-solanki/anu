import type { MaybeComputedRef } from '@vueuse/core'
import type { ComputedRef, Ref } from 'vue'
import { computed, ref, toRaw, unref, watch } from 'vue'

// TODO: Improve typings

export interface ComposableParams<T> {
  multi?: MaybeComputedRef<boolean>
  options: T[] | number
}

export interface OptionsOut<T> {
  value: T
  isSelected: ComputedRef<boolean>
}

// TODO: Improve typing
export function useGroupModel<T extends number>(param: ComposableParams<T>): { options: Ref<OptionsOut<T>[]>; value: T; select: (option: T) => void }
export function useGroupModel<T>(param: ComposableParams<T>): { options: Ref<OptionsOut<T>[]>; value: T; select: (option: T) => void }
export function useGroupModel<T>(params: ComposableParams<T>) {
  const { options, multi } = params

  const value = ref<T | number | Set<T | number> | undefined>()

  const select = (option: T | number) => {
    // If multiple selection is enabled
    if (unref(multi)) {
      // If value is not set (Means previously multi was false) => Initialize new set and assign it to value
      if (!(value.value instanceof Set)) {
        value.value = new Set([option])
      }
      else {
        // Else toggle option in set
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

  const _options = ref([]) as Ref<OptionsOut<T>[]>

  if (typeof options === 'number') {
    _options.value = [...Array(options)].map((_, i) => ({
      value: i as T,
      isSelected: computed(() => unref(multi)
        ? value.value instanceof Set ? value.value.has(i) : false
        : i === value.value,
      ),
    }))
  }
  else {
    _options.value = options.map(option => ({
      value: option,
      isSelected: computed(() => {
        // If multiple selection is enabled
        if (unref(multi))

          // If value is Set => if value exist in set then its Selected else not
          return value.value instanceof Set ? value.value.has(option) : false

        else

          // If multiple selection is not enabled just compare the values
          return option === toRaw(value.value)
      }),
    }))
  }

  return {
    options: _options,
    value,
    select,
  }
}

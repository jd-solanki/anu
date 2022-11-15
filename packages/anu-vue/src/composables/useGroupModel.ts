import type { MaybeComputedRef } from '@vueuse/core'
import type { ComputedRef, Ref } from 'vue'
import { computed, ref, toRaw, unref, watch } from 'vue'

// TODO: Improve typings

interface ComposableParams<T> {
  multi?: MaybeComputedRef<boolean>
  options: T[] | number

  // added selected that takes a function with the specified options as an arg
  // which is expected to compute and return an array of values to be selected by default
  selected?: (options: T[]) => T[]
}

interface OptionsOut<T> {
  value: T
  isSelected: ComputedRef<boolean>
}

// TODO: Improve typing
export function useGroupModel<T extends number>(
  param: ComposableParams<T>
): {
  options: Ref<OptionsOut<T>[]>

  // fixed typings for exported value - made it a Ref
  value: Ref<(T | number)[] | number | T>
  select: (option: T) => void
}

export function useGroupModel<T>(param: ComposableParams<T>): {
  options: Ref<OptionsOut<T>[]>

  // fixed typings for exported value - made it a Ref
  value: Ref<(T | number)[] | number | T>
  select: (option: T) => void
}

export function useGroupModel<T>(params: ComposableParams<T>) {
  const { options, multi, selected } = params

  // created variable picked to hold selected/picked options
  const picked = ref<T | number | Set<T | number> | null>()

  // the value variable now holds the final value
  // which is either an array or a single number
  // this way, you can use the value as is
  const value = ref<(T | number)[] | number | T>()

  const select = (option: T | number) => {
    // If multiple selection is enabled
    if (unref(multi)) {
      // If value is not set (Means previously multi was false) => Initialize new set and assign it to value
      if (!(picked.value instanceof Set)) {
        picked.value = new Set([option])
      }

      // Else toggle option in set
      else {
        if (picked.value.has(option))
          picked.value.delete(option)
        else picked.value.add(option)
      }
    }
    else {
      picked.value = option
    }

    // create an array if picked contains a set
    if (picked.value instanceof Set)
      value.value = Array.from(picked.value)

    else
      value.value = picked.value
  }

  // if selected option is provided
  if (selected) {
    // create a copy of the options
    const _options
      = typeof options == 'number'
        ? [...Array(options).keys()]
        : [...options]

    // pass the options to the selected option
    selected(_options as T[]).forEach(value => {
      // call the select function for each returned value
      select(value)
    })
  }

  watch(
    () => unref(multi),
    () => {
      picked.value = undefined
    },
  )

  const _options = ref([]) as Ref<OptionsOut<T>[]>

  if (typeof options === 'number') {
    _options.value = [...Array(options)].map((_, i) => ({
      value: i as unknown as T,
      isSelected: computed(() =>
        unref(multi)
          ? picked.value instanceof Set
            ? picked.value.has(i)
            : false
          : i === picked.value,
      ),
    }))
  }
  else {
    _options.value = options.map(option => ({
      value: option,
      isSelected: computed(() => {
        // If multiple selection is enabled
        if (unref(multi)) {
        // If value is Set => if value exist in set then its Selected else not
          return picked.value instanceof Set
            ? picked.value.has(option)
            : false
        }

        // If multiple selection is not enabled just compare the values
        else { return option === toRaw(picked.value) }
      }),
    }))
  }

  return {
    options: _options,
    value,
    select,
  }
}

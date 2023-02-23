/**
 * ℹ️ TypeScript Help => Need to make useGroupModel perfects so we get error when we pass options that are invalid
 * E.g. You can't pass initialValue `[1]` for options [1,2] when multi is disabled.
 * E.g. You can't pass initialValue `[4]` for options [1,2] when multi is disabled because 4 is not valid element of options
 * E.g. We should provide autocompletion for initialValue when users types initial value.
 */

import type { MaybeRef } from '@vueuse/core'
import type { ComputedRef, Ref } from 'vue'
import { computed, ref, toRaw, unref, watch } from 'vue'

type InitialValue<T, M> = M extends true ? T[] : T

interface ComposableParams<T, M extends boolean = false> {
  multi?: MaybeRef<M>

  options: T[] | number

  /**
   * Allow adding initial values for group model. This will preselect values for options.
   * It should accept array if multi is true or else generic `T`
   * It also accepts callback function that should return initial values
   */
  initialValue?: InitialValue<T, M> | ((options: T[] | number) => InitialValue<T, M>)
}

function isCallable<T, M>(initialValue: InitialValue<T, M> | ((options: T[]) => InitialValue<T, M>)): initialValue is (options: T[]) => InitialValue<T, M> {
  return typeof initialValue === 'function'
}

type SelectedValue<T, M extends boolean> = M extends true ? T[] | undefined : T | undefined

interface ReturnValue<T, M extends boolean> {
  options: ComputedRef<{ value: T; isSelected: boolean }[]>
  selected: Ref<SelectedValue<T, M>>
  select: (option: T) => void
}

function isNumberOptions(options: ComposableParams<any>['options']): options is number {
  return typeof options === 'number'
}

export function useGroupModel<T, M extends boolean = false>(params: ComposableParams<T, M>): ReturnValue<T, M>
export function useGroupModel<M extends boolean = false>(params: ComposableParams<number, M>): ReturnValue<number, M>
export function useGroupModel<T, M extends boolean = false>(params: ComposableParams<T | number, M>): ReturnValue<T | number, M> {
  const { options, multi = false, initialValue } = params

  const selected = ref<Ref<SelectedValue<T | number, M>>>() as Ref<SelectedValue<T | number, M>>

  // Initialize selected value based on initial value
  if (initialValue !== undefined) {
    if (isCallable(initialValue)) {
      selected.value = initialValue(options)
    }
    else if (unref(multi)) {
      if (Array.isArray(initialValue))
        selected.value = initialValue
    }
    else {
      selected.value = initialValue
    }
  }

  const select = (option: T | number) => {
    // If multiple selection is enabled
    if (unref(multi)) {
      // If value is array then toggle value in array
      if (Array.isArray(selected.value)) {
        // Else toggle option in array
        selected.value.includes(option)
          ? selected.value = selected.value.filter(v => v !== option) as SelectedValue<T | number, M>
          : selected.value.push(option)
      }

      // Else previous multi option was false hence initialize new array with selected option
      else {
        selected.value = [option] as SelectedValue<T | number, M>
      }
    }

    // If multiple selection is disabled => Just option to selected value
    else {
      selected.value = option as SelectedValue<T | number, M>
    }
  }

  // When multi option is changed via reactive value reset select value
  watch(resolveRef(multi), () => {
    selected.value = undefined
  })

  const _options = computed(() => {
    const opts: { value: T | number; isSelected: boolean }[] = []

    if (isNumberOptions(options)) {
      for (let i = 0; i < options; i++) {
        opts.push({
          value: i,
          isSelected: unref(multi)
            ? Array.isArray(selected.value) ? selected.value.includes(i) : false
            : i === toRaw(selected.value),
        })
      }
    }
    else {
      for (const option of options) {
        opts.push({
          value: option,
          isSelected: unref(multi)
            ? Array.isArray(selected.value) ? selected.value.includes(option) : false
            : option === toRaw(selected.value),
        })
      }
    }

    return opts
  })

  return {
    options: _options,
    selected,
    select,
  }
}

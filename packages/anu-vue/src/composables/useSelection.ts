import type { MaybeRef } from '@vueuse/core'
import type { ComputedRef, Ref } from 'vue'
import { isObject } from '@/utils/helpers'

interface Params<T, M> {
  items: MaybeRef<T[]>
  multi?: MaybeRef<M>
  initialValue?: MaybeRef<M extends true ? T[] : T>
}

interface ReturnValue<T, M> {

  // value: Ref<M extends true ? T[] : T | undefined>
  value: Ref<T | T[] | undefined>
  select: (option: T) => void
  options: ComputedRef<{ value: T; isSelected: boolean }[]>
}

export function useSelection<T, M extends boolean>(params: Params<T, M>): ReturnValue<T, M> {
  const { items, multi = false, initialValue = undefined } = params

  const _items = isRef(items) ? items : ref(items) as Ref<T[]>
  const _multi = isRef(multi) ? multi : ref(multi) as Ref<boolean>
  const _initialValue = isRef(initialValue) ? initialValue : ref(initialValue) as Ref<T>

  // ℹ️ If initial value is object compare using `JSON.stringify` else just use `===`
  const _val = ref(
    _items.value.find(i => {
      return (isObject(_initialValue.value) && isObject(i))
        ? JSON.stringify(_initialValue.value) === JSON.stringify(i)
        : _initialValue.value === i
    }),
  ) as Ref<T | T[] | undefined>

  const select = (option: T) => {
    // If multiple selection is enabled
    if (_multi.value) {
      // If value is not set (Means previously multi was false) => Initialize new set and assign it to value
      if (!(Array.isArray(_val.value))) {
        _val.value = [option]
      }
      else {
        // Else toggle option in array
        const index = _val.value.indexOf(option)
        if (index === -1)
          _val.value.push(option)
        else
          _val.value.splice(index, 1)
      }
    }
    else {
      _val.value = option
    }
  }
  watch(_multi, val => {
    _val.value = val ? [] : undefined
  })

  const _options = computed(() => _items.value.map(item => ({
    value: item,
    isSelected: _multi.value
      ? Array.isArray(_val.value) ? _val.value.includes(item) : false
      : item === _val.value,
  })))

  return {
    value: _val,
    select,
    options: _options,
  }
}

import type { MaybeRefOrGetter } from '@vueuse/core'
import type { Ref, UnwrapRef } from 'vue'
import { isObject } from '@/utils/helpers'

type Nullable<T> = T | null | undefined

interface Params<Item, Multi extends boolean, Closable extends boolean, InitialValue extends Item> {
  items: MaybeRefOrGetter<Item[]>
  multi?: MaybeRefOrGetter<Multi>
  closable?: MaybeRefOrGetter<Closable>
  initialValue?: MaybeRefOrGetter<UnwrapRef<Multi> extends true ? InitialValue[] : InitialValue>
}

export interface OptionsOut<Item> {
  value: Item
  isSelected: boolean
  closable?: boolean
}

export interface ReturnValue<Item, Multi extends boolean> {
  select: (option: Item) => void
  append: (option: Item) => void
  close: (option: Item) => void
  value: Ref<UnwrapRef<Multi> extends true ? Item[] : Nullable<Item>>
  options: Ref<OptionsOut<Item>[]>
}

const isEqual = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b)

export function useSelection<const Item, Multi extends boolean, Closable extends boolean, InitialValue extends Item>(params: Params<Item, Multi, Closable, InitialValue>): ReturnValue<Item, Multi> {
  const { items, multi = false, initialValue = undefined, closable = false } = params

  const _items = toRef(items)
  const _multi = toRef(multi)
  const _initialValue = toRef(initialValue)
  const _closable = toRef(closable)
  const _val = ref(

    // _initialValue.value,

    // (_items.value as Item[]).find(i => {
    //   // ℹ️ If initial value is object compare using `JSON.stringify` else just use `===`
    //   return (isObject(_initialValue.value) && isObject(i))
    //     ? JSON.stringify(_initialValue.value) === JSON.stringify(i)
    //     : _initialValue.value === i
    // }),
    (_items.value as Item[]).find(i => isEqual(_initialValue.value, i)),
  ) as ReturnValue<Item, Multi>['value']

  const close = (option: Item) => {
    // If multiple selection is enabled
    if (_multi.value && _closable.value && Array.isArray(_items.value)) {
      const index = _items.value.indexOf(option)
      if (index !== -1) _items.value.splice(index, 1)
    } else {
      _val.value = undefined as UnwrapRef<ReturnValue<Item, Multi>["value"]>
    }
  }
  const append = (val: Item) => {
    // This only works in multiple mode.
    if (_multi.value && Array.isArray(_items.value))
      _items.value.push(val)
  }

  const select = (option: Item) => {
    // If multiple selection is enabled
    if (_multi.value) {
      // If value is not set (Means previously multi was false) => Initialize new set and assign it to value
      if (!(Array.isArray(_val.value))) {
        _val.value = [option] as UnwrapRef<ReturnValue<Item, Multi>['value']>
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
      _val.value = option as UnwrapRef<ReturnValue<Item, Multi>['value']>
    }
  }
  watch(_multi, val => {
    _val.value = (val ? [] : undefined) as UnwrapRef<ReturnValue<Item, Multi>['value']>
  })

  const _options = computed(() => _items.value.map(item => ({
    value: item,
    isSelected: _multi.value
      ? Array.isArray(_val.value) ? _val.value.includes(item) : false
      : isEqual(item, _val.value),
  }))) as ReturnValue<Item, Multi>['options']

  // Watch for external changes to initialValue aka modelValue
  watch(_initialValue, val => {
    select(val as Item)
  })

  return {
    value: _val,
    select,
    close,
    append,
    options: _options,
  }
}

export function extractItemValueFromItemOption<T>(item: T): T extends { value: infer V } ? V : T {
  return isObject(item) && 'value' in item
    ? item.value
    : item as any
}

export function calculateSelectionItems<T>(items: MaybeRefOrGetter<T[]>) {
  return computed(() => {
    const _items = toRef(items)

    if (_items.value.length === 0)
      return []

    return _items.value.map(extractItemValueFromItemOption)
  })
}

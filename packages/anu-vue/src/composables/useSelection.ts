/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable lines-around-comment */

/*
  ℹ️ Help

  1. In playground section, first test case isn't throwing error even if we are passing completely different value than passed to items
  2. If we use computed property for multi, then it's return type is generic T regardless of final value of computed property is true or false

  ℹ️ Note

  1. Once we are ready to merge this branch, we will rename items to options just like in useGroupModel.ts.
  2. For clean code we will prefix _ to received params instead of using _ for toRef values.
*/

import type { MaybeRefOrGetter } from '@vueuse/core'
import { toRef, toValue } from '@vueuse/core'
import type { Ref, UnwrapRef } from 'vue'
import type { IsMaybeRefTrue } from '@/utils/typescripts'

type Nullable<T> = T | null | undefined

interface Params<T, M extends boolean> {
  items: MaybeRefOrGetter<T[]>
  multi?: MaybeRefOrGetter<M>
  initialValue?: MaybeRefOrGetter<IsMaybeRefTrue<M> extends true ? T[] : Nullable<T>>
}

export interface OptionsOut<T> {
  value: T
  isSelected: boolean
}

interface ReturnValue<T, M extends boolean> {
  select: (option: T) => void
  value: IsMaybeRefTrue<M> extends true ? Ref<T[]> : Ref<Nullable<T>>
  options: Ref<OptionsOut<T>[]>
}

export function useSelection<T, M extends boolean>(params: Params<T, M>): ReturnValue<T, M> {
  const { items, multi = false, initialValue = undefined } = params

  const _items = toRef(items)
  const _multi = toRef(multi)
  const _initialValue = toRef(initialValue)

  const _val = ref(
    _initialValue.value,
    // _items.value.find(i => {
    //   // ℹ️ If initial value is object compare using `JSON.stringify` else just use `===`
    //   return (isObject(_initialValue.value) && isObject(i))
    //     ? JSON.stringify(_initialValue.value) === JSON.stringify(i)
    //     : _initialValue.value === i
    // }),
  ) as IsMaybeRefTrue<M> extends true ? Ref<T[]> : Ref<Nullable<T>>

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

// ============================
// Playground
// ============================

const { options: options1, value: value1 } = useSelection({ items: ref(['1', '2', '3']) })
//                                ^?

const { options: options2, value: value2 } = useSelection({ items: ref([1, 2, 3]) })
//                                ^?

const { options: options4, value: value4 } = useSelection({ items: ref([{ num: 1 }, { num: 2 }]) })
//                                ^?

const { options: options5, value: value5 } = useSelection({ items: ref(['1', '2', '3']), multi: ref(true) })
//                                ^?

const { options: options6, value: value6 } = useSelection({ items: ref(['1', '2', '3']), multi: false, initialValue: '1' })
//                                ^?

const { options: options7, value: value7 } = useSelection({ items: ref(['1', '2', '3']), multi: true, initialValue: ['1'] })
//                                ^?

// throw type error when
const { options: options8, value: value8 } = useSelection({ items: ref(['1', '2', '3']), multi: true, initialValue: ['i dont exist'] })
const { options: options9, value: value9 } = useSelection({ items: ref(['1', '2', '3']), multi: false, initialValue: ['array passed as initial value multi is false'] })
const { options: options10, value: value10 } = useSelection({ items: ref(['1', '2', '3']), multi: true, initialValue: 'single value is passed when multi is true' })

// --------------

const x = ref(false)
type XUnWrappedBoolean = UnwrapRef<typeof x>
//   ^?

// --------------

type QUnWrappedBoolean<B extends MaybeRefOrGetter<boolean>> = B extends Ref<infer P> ? P : B
//   ^?
type A = QUnWrappedBoolean<false>
//   ^?

type B = QUnWrappedBoolean<Ref<true>>
//   ^?

// --------------

// eslint-disable-next-line antfu/top-level-function
const returnNum = <T extends number, B extends boolean>(num: T, isMulti: MaybeRefOrGetter<B>): B extends Ref<infer M>
  ? M extends true ? T[] : T
  : B extends true ? T[] : T => {
  return (toValue(isMulti) ? [num] : num) as B extends Ref<infer M>
    ? M extends true ? T[] : T
    : B extends true ? T[] : T
}

const val = returnNum(1, ref(true))
//    ^?

// --------------

type IsTrue<B> = (
  B extends Ref<infer M>
    ? M extends true ? true : false
    : B extends true ? true : false
)

// eslint-disable-next-line antfu/top-level-function
const returnNum2 = <T extends number, B extends boolean>(num: T, isMulti: MaybeRefOrGetter<B>): IsTrue<B> extends true ? T[] : T => {
  return (toValue(isMulti) ? [num] : num) as IsTrue<B> extends true ? T[] : T
}

const val2 = returnNum2(2, ref(true))
//    ^?

const val21 = returnNum2(2, true)
//    ^?

const val22 = returnNum2(2, ref(false))
//    ^?

const val23 = returnNum2(2, false)
//    ^?

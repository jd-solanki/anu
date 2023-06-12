// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck We are going to update this composable later
import type { MaybeRef } from '@vueuse/core'
import type { ComputedRef, Ref } from 'vue'
import { computed, unref } from 'vue'
import { isEmpty, isObject } from '@/utils/helpers'

export type CustomFilter<T> = ((val: keyof T, q: string, item: T) => boolean)

export type typeFilterBy<T> = (string
| (
  string
  | ({ name: string; filterBy: CustomFilter<T> })
))[]
| ((q: string, item: T) => boolean)

/*
  👉 useSearch

  This composable returns filtered data based on query.
  It assumes data is array of object or strings.
    If data is array of object then it allows filtering that object via filterBy param assuming it's object property.
    Moreover, it assumes returning value of someObject[filterBy] is string

  For cases other than mentioned above you need to pass custom filter via filterBy param
*/
export function useSearch<T>(search: MaybeRef<string>, data: MaybeRef<T[]>, filterBy: MaybeRef<typeFilterBy<T>> | undefined = undefined, strict: MaybeRef<boolean> = false): { results: ComputedRef<T[]> | Ref<T[]> } {
  const extractStringValueFromObj = (obj: Record<string, unknown>, key: string, strict: boolean): string | null => {
    const extractedVal = obj[key]

    if (strict) {
      if (typeof extractedVal === 'string')
        return extractedVal
    }
    else {
      if (typeof extractedVal === 'string' || typeof extractedVal === 'number' || typeof extractedVal === 'boolean')
        return extractedVal.toLocaleString()
    }

    return null
  }

  const filterObjectViaProperty = (obj: Record<string, unknown>, propertyName: string, q: string, strict: boolean): boolean => {
    const extractedVal = extractStringValueFromObj(obj, propertyName, strict)
    if (extractedVal)
      return extractedVal.toLocaleLowerCase().includes(q)

    return false
  }

  const results = computed(() => {
    const _data = unref(data)

    // lowercase search query
    const q = unref(search).toLocaleLowerCase()

    const _filterBy = filterBy ? unref(filterBy) : filterBy
    const _strict = unref(strict)

    if (isEmpty(q))
      return _data

    return _data.filter(item => {
      // If filterBy function is provided => Use it
      if (typeof _filterBy === 'function')
        return _filterBy(unref(search), item)

      // Else use our filter

      /*
        If strict is enabled
          filter if iterating item is string (Means: data => string[])
        else
          filter if Iterating item is string | number | boolean (Means: data => (string | boolean | number)[])

        ℹ️ filterBy is useless here
        */
      if (_strict) {
        if (typeof item === 'string')
          return item.toLocaleLowerCase().includes(q)
      }
      else {
        if (typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean')
          return String(item).toLocaleLowerCase().includes(q)
      }

      // If iterating item is object (Means: data => Object[])
      if (isObject(item)) {
        /*
          if filterBy is not provided loop over each object property
            if strict is true
              only filter on properties which has string value
            else
              filter on properties which  has value type of string | boolean | number
        */
        if (!_filterBy) {
          return Object.entries(item).some(([_, val]) => {
            if (_strict) {
              if (typeof val === 'string')
                return val.toLocaleLowerCase().includes(q)
            }
            else {
              if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean')
                return String(val).toLocaleLowerCase().includes(q)
            }

            return false
          })
        }

        // ℹ️ filterBy is required from here

        /*
          From here, we will handle filterBy types other than custom filter function
          1) string
          2) Array of string or { name: string, filterBy: function }
        */

        // Type 1): Extract val from Object and filter it
        if (typeof _filterBy === 'string') {
          return filterObjectViaProperty(item, _filterBy, q, _strict)
        }

        /*
          Type 2): Loop over each filterBy element
            filterBy can be ['username', 'email'] | ['username', { name: 'email', filterBy: (val): boolean => { ... } }] | ...
            and perform filter based on filter element type

            el: string => Extract val from Object and filter it
            el: obj => Extract val via obj.name from iterating item and execute obj.filterBy on it

          We don't have to check for Array.isArray(filterBy) because of type guard.
          Hence, filterBy is array.
        */
        else {
          // k => string | { name: string, filterBy: (val, q) => boolean }
          // console.log('filterBy :>> ', filterBy);
          return _filterBy.some(k => {
            // console.log('k :>> ', k);

            // If k is string
            if (typeof k === 'string') {
              return filterObjectViaProperty(item, k, q, _strict)
            }

            // Else k is of type { name: string, filterBy: (val, q) => boolean }
            else {
              const { name, filterBy } = k

              return filterBy(item[name] as keyof T, unref(search), item)
            }
          })
        }
      }
      else {
        return false
      }
    })
  })

  // Filter data via filter method
  return {
    results,
  }
}

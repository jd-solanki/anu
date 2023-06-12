// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck We are going to update this composable later
import type { MaybeRef } from '@vueuse/core'
import type { ComputedRef, Ref } from 'vue'
import { computed, unref } from 'vue'
import { isEmpty, isNumeric, isObject } from '@/utils/helpers'

export type CustomSort = ((a: unknown, b: unknown) => number)

// Thanks: https://stackoverflow.com/a/60617060/10796681
export type typeSortBy = string
| (
  string
  | ({ name: string } & (
    | { sortBy: CustomSort; isAsc?: never }
    | { sortBy?: never; isAsc: boolean }
  ))
)[]

export function useSort<T>(data: MaybeRef<T[]>, sortBy: MaybeRef<typeSortBy> | undefined = undefined, isAsc: MaybeRef<boolean> = true): { results: ComputedRef<T[]> | Ref<T[]> } {
  const isDate = (val: unknown) => {
    // @ts-expect-error Date can't be passed to isNaN
    return val instanceof Date && !Number.isNaN(val)
  }

  const sortValues = (a: unknown, b: unknown): number => {
    if (isNumeric(a) && isNumeric(b))
      return (a as number) - (b as number)

    if (isDate(a) && isDate(b)) {
      // @ts-expect-error Date.parse can't take Date object as argument
      return Date.parse(new Date(a)) - Date.parse(new Date(b))
    }

    if (typeof a === 'boolean' && typeof b === 'boolean') {
      // @ts-expect-error We can't subtract booleans
      return a - b
    }

    return String(a).localeCompare(String(b))
  }

  // sortable item can be string | Object
  const results = computed(() => {
    const _data = JSON.parse(JSON.stringify(unref(data)))
    const _sortBy = unref(sortBy)
    const _isAsc = unref(isAsc)
    const modifier = _isAsc ? 1 : -1

    const sortedData = _data.sort((a: unknown, b: unknown) => {
      // If sortable items are not object (Means: data => (string | boolean | date | ...)[])
      if (!(isObject(a) && isObject(b))) {
        return sortValues(a, b) * modifier
      }

      // sortable items are object (Means: data => Object[])
      else {
      // ℹ️ sortBy is required from here
        if (!_sortBy)
          return 0

        /*
            From here, we will handle sortBy types other than custom filter function
            1) string
            2) Array of string or { name: string, sortBy: function, isAsc: boolean }
        */

        // Type 1): Extract val from Object and sort it
        if (typeof _sortBy === 'string') {
          return sortValues(a[_sortBy], b[_sortBy]) * modifier
        }

        /*
        Type 2): Loop over each sortBy element
            sortBy can be ['username', 'email'] | ['username', { name: 'email', sortBy: (a,b): number => { ... }, isAsc: true }] | ...
            and perform sort based on sort element type

            el: string => Extract val from Object and sort it
            el: obj => Extract val via obj.name from iterating item and execute obj.sortBy on it

        We don't have to check for Array.isArray(sortBy) because of type guard.
        Hence, sortBy is array.
    */
        else {
          if (isEmpty(_sortBy))
            return 0

          // k => string | { name: string, sortBy: (a, b) => number }
          const _sorted = _sortBy.map(k => {
            // If k is string
            if (typeof k === 'string') {
              return sortValues(a[k], b[k]) * modifier
            }

            // ℹ️ `isAsc` provided to `useSort` is not required when sorting config is passed
            // Else k is of type { name: string, sortBy: (a, b) => number, isAsc: boolean, type: unknown }
            else {
              // Extract properties
              const { name, sortBy, isAsc: __isAsc } = k

              // If custom sortBy function is provided use it
              if (sortBy)
                return sortBy(a[name], b[name])

              // If custom sortBy is not provided there must be `isAsc` provided
              // ℹ️ isAsc is boolean so we are checking against undefined instead of truthiness
              if (__isAsc !== undefined) {
                const _modifier = __isAsc ? 1 : -1

                return sortValues(a[name], b[name]) * _modifier
              }

              return 0
            }
          })

          return _sorted.reduce((a, b) => a || b)
        }
      }
    })

    return sortedData
  })

  return {
    results,
  }
}

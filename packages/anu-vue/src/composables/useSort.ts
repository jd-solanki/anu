import type { MaybeRef } from '@vueuse/core'
import type { ComputedRef, Ref } from 'vue'
import { computed, unref } from 'vue'
import { isObject } from '@/utils/helpers'

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

export const useSort = <T>(data: MaybeRef<T[]>, sortBy: MaybeRef<typeSortBy> | undefined = undefined, isAsc: MaybeRef<boolean> = true): { results: ComputedRef<T[]> | Ref<T[]> } => {
  const showUnexpectedStructureWarning = () => {
    console.warn('Please provide custom filter function to query complex data')
  }

  const extractStringValueFromObj = (obj: Record<string, unknown>, key: string): string | null => {
    const extractedVal = obj[key]

    if (typeof extractedVal !== 'string') {
      showUnexpectedStructureWarning()

      return null
    }

    return extractedVal
  }

  const sortObjectsUsingKey = (objA: Record<string, unknown>, objB: Record<string, unknown>, key: string) => {
    const extractedValOfA = extractStringValueFromObj(objA, key)
    const extractedValOfB = extractStringValueFromObj(objB, key)

    // If can't get extracted value => return 0 <= Don't do sorting
    if (!(extractedValOfA && extractedValOfB))
      return 0

    return extractedValOfA.localeCompare(extractedValOfB)
  }

  // sortable item can be string | Object
  const results = computed(() => {
    const _data = JSON.parse(JSON.stringify(unref(data)))
    const _sortBy = unref(sortBy)
    const _isAsc = unref(isAsc)
    const modifier = _isAsc ? 1 : -1

    const sortedData = _data.sort((a: unknown, b: unknown) => {
      // If sortable item is string (Means: data => string[])
      if (typeof a === 'string' && typeof b === 'string') { return a.localeCompare(b) * modifier }

      // If sortable item is object (Means: data => Object[])
      else if (isObject(a) && isObject(b)) {
      // ℹ️ sortBy is required from here

        if (!_sortBy)
          return 0

        /*
            From here, we will handle sortBy types other than custom filter function
            1) string
            2) Array of string or { name: string, sortBy: function, type: any }
        */

        // Type 1): Extract val from Object and sort it
        if (typeof _sortBy === 'string') {
          return sortObjectsUsingKey(a, b, _sortBy) * modifier
        }

        /*
        Type 2): Loop over each sortBy element
            sortBy can be ['username', 'email'] | ['username', { name: 'email', sortBy: (a,b): number => { ... }, type: unknown }] | ...
            and perform sort based on sort element type

            el: string => Extract val from Object and sort it
            el: obj => Extract val via obj.name from iterating item and execute obj.sortBy on it

        We don't have to check for Array.isArray(sortBy) because of type guard.
        Hence, sortBy is array.
    */
        else {
          // k => string | { name: string, sortBy: (a, b) => number }
          const _sorted = _sortBy.map(k => {
            // If k is string
            if (typeof k === 'string') {
              return sortObjectsUsingKey(a, b, k) * modifier
            }

            // Else k is of type { name: string, sortBy: (a, b) => number, type: unknown }
            else {
              const { name, sortBy, isAsc: __isAsc } = k

              if (sortBy)
                return sortBy(a[name], b[name])

              if (__isAsc !== undefined) {
                const _modifier = __isAsc ? 1 : -1

                return sortObjectsUsingKey(a, b, name) * _modifier
              }

              return 0
            }
          })

          return _sorted.reduce((a, b) => a || b)
        }
      }
      else {
        showUnexpectedStructureWarning()

        return 0
      }
    })

    return sortedData
  })

  return {
    results,
  }
}

import type { MaybeRef } from '@vueuse/core'
import type { ComputedRef, Ref } from 'vue'
import { computed, unref } from 'vue'
import { isObject } from '@/utils/helpers'

export type CustomSort = ((a: unknown, b: unknown) => number)

export type typeSortBy = string
| (
  string
  | ({ name: string; sortBy: CustomSort })
)[]

export const useSort = <T>(data: MaybeRef<T[]>, sortBy: MaybeRef<typeSortBy> | undefined = undefined): { results: ComputedRef<T[]> | Ref<T[]> } => {
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

  // sortable item can be string | Object
  const results = computed(() => {
    const _data = JSON.parse(JSON.stringify(unref(data)))
    const _sortBy = unref(sortBy)

    const sortedData = _data.sort((a, b) => {
    // If sortable item is string (Means: data => string[])
      if (typeof a === 'string' && typeof b === 'string') { return a.localeCompare(b) }

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
          const extractedValOfA = extractStringValueFromObj(a, _sortBy)
          const extractedValOfB = extractStringValueFromObj(b, _sortBy)

          // If can't get extracted value => return 0 <= Don't do sorting
          if (!(extractedValOfA && extractedValOfB))
            return 0

          return extractedValOfA.localeCompare(extractedValOfB)
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
              const extractedValOfA = extractStringValueFromObj(a, k)
              const extractedValOfB = extractStringValueFromObj(b, k)

              // If can't get extracted value return 0 => Don't do sorting
              if (!(extractedValOfA && extractedValOfB))
                return 0

              return extractedValOfA.localeCompare(extractedValOfB)
            }

            // Else k is of type { name: string, sortBy: (a, b) => number, type: unknown }
            else {
              const { name, sortBy } = k
              console.log('name :>> ', name)
              console.log('a[name] :>> ', a[name])
              console.log('b[name] :>> ', b[name])
              console.log('sortBy :>> ', sortBy)
              console.log(sortBy(a[name], b[name]))
              console.log('----')

              return sortBy(a[name], b[name])
            }
          })

          console.log('_sorted :>> ', _sorted, _sorted.reduce((a, b) => a || b))

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

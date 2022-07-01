import type { ComputedRef, Ref } from 'vue'
import { computed, watch } from 'vue'
import { isEmpty, isObject } from '@/utils/helpers'

export type CustomSort = ((a: unknown, b: unknown) => number)

export type typeSortBy = string
| (
  string
  | ({ name: string; sortBy: CustomSort })
)[]

export const useSort = <T>(data: Ref<T[]>, sortBy: Ref<typeSortBy>): { results: ComputedRef<T[]> | Ref<T[]> } => {
  console.log('sortBy :>> ', sortBy.value)

  if (isEmpty(sortBy.value))
    return { results: data }

  watch(sortBy, val => {
    console.log('val :>> ', val)
  }, { deep: true })

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
  const sortedData = computed(() => data.value.sort((a, b) => {
    // If sortable item is string (Means: data => string[])
    if (typeof a === 'string' && typeof b === 'string') { return a.localeCompare(b) }

    // If sortable item is object (Means: data => Object[])
    else if (isObject(a) && isObject(b)) {
      /*
            From here, we will handle sortBy types other than custom filter function
            1) string
            2) Array of string or { name: string, sortBy: function, type: any }
        */

      // Type 1): Extract val from Object and sort it
      if (typeof sortBy.value === 'string') {
        const extractedValOfA = extractStringValueFromObj(a, sortBy.value)
        const extractedValOfB = extractStringValueFromObj(b, sortBy.value)

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
        return sortBy.value.map(k => {
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

            return sortBy(a[name], b[name])
          }
        }).reduce((a, b) => a || b)
      }
    }
    else {
      showUnexpectedStructureWarning()

      return 0
    }
  }))

  return {
    results: sortedData,
  }
}

import type { ComputedRef, Ref } from 'vue'
import { computed, ref } from 'vue'
import { isEmpty, isObject } from '@/utils/helpers'

export type CustomFilter = ((val: unknown, q: string, item: unknown) => boolean)

export type typeFilterBy = string
| (
  string
  | ({ name: string; filterBy: CustomFilter })
)[]
| ((q: string, item: unknown) => boolean)

/*
      👉 useSearch

      This composable returns filtered data based on query.
      It assumes data is array of object or strings.
        If data is array of object then it allows filtering that object via filterBy param assuming it's object property.
        Moreover, it assumes returning value of someObject[filterBy] is string

      For cases other than mentioned above you need to pass custom filter via filterBy param
    */
export const useSearch = <T>(search: Ref<string> | undefined | null, data: T[], filterBy: typeFilterBy): { results: ComputedRef<T[]> | Ref<T[]> } => {
  // If search is empty return all data
  if (isEmpty(search))
    return { results: ref(data) as Ref<T[]> }

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

  const filterObjectViaProperty = (obj: Record<string, unknown>, propertyName: string, q: string): boolean => {
    const extractedVal = extractStringValueFromObj(obj, propertyName)
    if (extractedVal)
      return extractedVal.toLowerCase().includes(q)

    return false
  }

  const results = computed(() => {
    // lowercase search query
    const q = (search as Ref<string>).value.toLowerCase()

    return data.filter(item => {
      // If filterBy function is provided => Use it
      if (typeof filterBy === 'function')
        return filterBy(q, item)

      // Else use our filter

      // If iterating item is string (Means: data => string[])
      if (typeof item === 'string') { return item.toLowerCase().includes(q) }

      // If iterating item is object (Means: data => Object[])
      else if (isObject(item)) {
        /*
            From here, we will handle filterBy types other than custom filter function
            1) string
            2) Array of string or { name: string, filterBy: function }
          */

        // Type 1): Extract val from Object and filter it
        if (typeof filterBy === 'string') { return filterObjectViaProperty(item, filterBy, q) }

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
          return filterBy.some(k => {
            // console.log('k :>> ', k);

            // If k is string
            if (typeof k === 'string') { return filterObjectViaProperty(item, k, q) }

            // Else k is of type { name: string, filterBy: (val, q) => boolean }
            else {
              const { name, filterBy } = k

              return filterBy(item[name], q, item)
            }
          })
        }
      }
      else {
        showUnexpectedStructureWarning()

        return false
      }
    })
  })

  // Filter data via filter method
  return {
    results,
  }
}

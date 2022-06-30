import { ACard, useCardProps } from '@/components/card';
import { AInput } from '@/components/input';
import { isEmpty, isObject } from '@/utils/helpers';
import { MaybeRef } from '@vueuse/core';
import { defineComponent, PropType, ref, unref } from 'vue';

type CustomFilter = ((val: unknown, q: string, item: unknown) => boolean)

interface Column {
  name: string,
  isFilterable: boolean
  filterBy: CustomFilter
}

export const ATable = defineComponent({
  name: 'ATable',
  props: {
    ...useCardProps(),
    rows: {
      type: [Array] as PropType<Object[]>,
      required: true,
    },
    columns: {
      type: [Array] as PropType<Column[]>,
      default: [],
    },
    search: {
      type: [Boolean, String],
      default: false,
    },
    noResultsText: {
      type: String,
      default: 'No matching results found!!'
    }
  },
  setup(props, { slots, emit, attrs }) {

    // ℹ️ I used destructing to extract card props from table props. Moreover,I didn't wanted to use destructured props hence I omitted them
    const { columns: _, rows: __, search: ___, ...cardProps } = props

    const filteredRows = ref(props.rows)


    const columnDefaults = {
      isFilterable: true
    }

    const _columns = props.columns || (props.rows.length ? Object.keys(props.rows[0]).map(k => ({ name: k, ...columnDefaults })) : [])

    const handleInputSearch = (q: string) => {
      // Filter out columns that is searchable based on isFilterable property
      const searchableCols = _columns.filter(col => col.isFilterable || col.filterBy)
      filteredRows.value = useSearch<Object>(
        q,
        props.rows,
        searchableCols.map(col => col.filterBy ? { name: col.name, filterBy: col.filterBy } : col.name)
      );
    }

    type typeFilterBy = string
      | (
        string
        | ({ name: string, filterBy: CustomFilter })
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
    const useSearch = <T,>(search: MaybeRef<string> | undefined | null, data: T[], filterBy: typeFilterBy): T[] => {

      // If search is empty return all data
      if (isEmpty(search)) return data

      const showUnexpectedStructureWarning = () => {
        console.warn("Please provide custom filter function to query complex data")
      }

      const extractStringValueFromObj = (obj: Record<string, unknown>, key: string): string | null => {
        const extractedVal = obj[key]

        if (typeof extractedVal !== 'string') {
          showUnexpectedStructureWarning()
          return null
        }

        return extractedVal
      }

      const filterObjectViaProperty = (obj: Record<string, unknown>, propertyName: string): boolean => {
        const extractedVal = extractStringValueFromObj(obj, propertyName)
        if (extractedVal) return extractedVal.toLowerCase().includes(q)

        return false
      }

      // lowercase search query
      const q = unref(search as MaybeRef<string>).toLowerCase()

      // Filter data via filter method
      return data.filter(item => {

        // If filterBy function is provided => Use it
        if (typeof filterBy === 'function') return filterBy(q, item)

        // Else use our filter

        // If iterating item is string (Means: data => string[])
        if (typeof item === 'string') return item.toLowerCase().includes(q)

        // If iterating item is object (Means: data => Object[])
        else if (isObject(item)) {

          /*
            From here, we will handle filterBy types other than custom filter function
            1) string
            2) Array of string or { name: string, filterBy: function }
          */

          // Type 1): Extract val from Object and filter it
          if (typeof filterBy === 'string') return filterObjectViaProperty(item, filterBy)

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
              if (typeof k === 'string') return filterObjectViaProperty(item, k)

              // Else k is of type { name: string, filterBy: (val, q) => boolean }
              else {
                const { name, filterBy } = k
                return filterBy(item[name], q, item)
              }
            })
          }
        }
        else { showUnexpectedStructureWarning() }
      })
    }


    return () => {
      // 👉 No results
      const noResultsTr = <tr>
        <td colspan={_columns.length} class="px-4 h-12 whitespace-nowrap text-center font-medium">
          {slots.noResults ? slots.noResults() : <span>{props.noResultsText}</span>}
        </td>
      </tr>

      /*
         ℹ️ We need to assign table to const because card have default slots which render table and we also want to allow rendering
            text via default text just above the table

            Later on, we will merge both default slots and will pass as single slot content to card
      */
      {/* TODO(refactor): Use variant group here */ }
      const table = <table class="w-full max-w-full all-[tr]-border-b all-[tr]-border-[hsla(var(--base-color),var(--border-opacity))]">
        {/* 👉 thead */}
        <thead>
          <tr>
            {_columns.map(column => <th class="px-4 h-12 text-left whitespace-nowrap">{column.name}</th>)}
          </tr>
        </thead>

        {/* 👉 tbody */}
        <tbody>
          {
            filteredRows.value.length
              ? filteredRows.value.map(row => {
                return <tr>
                  {Object.entries(row).map(([columnName, columnValue]) => {
                    return <td class="px-4 h-12 whitespace-nowrap">{columnValue}</td>
                  })}
                </tr>
              })
              : noResultsTr
          }
        </tbody>
      </table>

      const searchInput = () => <AInput prepend-inner-icon="i-bx-search" placeholder="search..." class="max-w-48" onInput={handleInputSearch}></AInput>

      // 💡 Here we are passing all the slots to card except default which gets overridden for merging provided default slot with table
      return <ACard
        {...cardProps}
        class="overflow-auto"
        v-slots={{
          ...slots,
          default: () => [slots.default?.(), table],
          headerRight: typeof props.search === 'boolean' && props.search ? searchInput : null
        }}
      />
    }
  },
})

export type ATable = InstanceType<typeof ATable>

import { ACard, useCardProps } from '@/components/card';
import { AInput } from '@/components/input';
import { isEmpty, isObject } from '@/utils/helpers';
import { MaybeRef } from '@vueuse/core';
import { defineComponent, PropType, ref, unref } from 'vue';

export const ATable = defineComponent({
  name: 'ATable',
  props: {
    ...useCardProps(),
    rows: {
      type: [Array] as PropType<Object[]>,
      required: true,
    },
    columns: Array,
    search: {
      type: [Boolean, String],
      default: false,
    },
  },
  setup(props, { slots, emit, attrs }) {

    const { columns, rows, search, ...cardProps } = props
    const filteredRows = ref(rows)

    const columnDefaults = {
      isFilterable: true
    }

    const _columns = props.columns || props.rows.length ? Object.keys(props.rows[0]).map(k => ({ name: k, ...columnDefaults })) : []


    const handleInputSearch = (q: string) => {
      filteredRows.value = useSearch<Object>(q, props.rows, 'name');
    }

    /*
      👉 useSearch

      This composable returns filtered data based on query.
      It assumes data is array of object or strings.
        If data is array of object then it allows filtering that object via filterBy param assuming it's object property.
        Moreover, it assumes returning value of someObject[filterBy] is string
      
      For cases other than mentioned above you need to pass custom filter via filterBy param
    */
    const useSearch = <T,>(search: MaybeRef<string> | undefined | null, data: T[], filterBy: string | ((item: unknown) => boolean)): T[] => {

      // If search is empty return all data
      if (isEmpty(search)) return data

      // lowercase search query
      const q = unref(search as MaybeRef<string>).toLowerCase()

      // Filter data via filter method
      return data.filter(item => {

        // If filterBy function is provided => Use it
        if (typeof filterBy === 'function') return filterBy(item)

        // Else use our filter
        else {

          // If iterating item is string
          if (typeof item === 'string') return item.toLowerCase().includes(q)

          // If iterating item is object
          else if (isObject(item)) {

            // Extract using filterBy param (key) from iterating item
            const val = item[filterBy]

            // If retrieved val is string
            if (typeof val === 'string') return val.toLowerCase().includes(q)

            // If val is other than string => Let user define the custom filter function
            else console.warn("Please provide custom filter function to query complex data")
          }
          else {
            // If val is other than object => Let user define the custom filter function
            console.warn('If cell value is not string you need to pass custom filter function in filterBy')
          }
        }
      })
    }


    return () => {
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
          {filteredRows.value.map(row => {
            return <tr>
              {Object.entries(row).map(([columnName, columnValue]) => {
                return <td class="px-4 h-12 whitespace-nowrap">{columnValue}</td>
              })}
            </tr>
          })}
        </tbody>
      </table>

      const searchInput = () => <AInput prepend-inner-icon="i-bx-search" placeholder="search..." class="max-w-48" onInput={handleInputSearch}></AInput>

      // 💡 Here we are passing all the slots to card except default which gets overridden for merging provided default slot with table
      return <ACard class="overflow-auto" {...cardProps} v-slots={{ ...slots, default: () => [slots.default?.(), table], headerRight: typeof props.search === 'boolean' && props.search ? searchInput : null }} />
    }
  },
})

export type ATable = InstanceType<typeof ATable>

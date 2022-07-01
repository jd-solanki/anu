import { ACard, useCardProps } from '@/components/card';
import { AInput } from '@/components/input';
import { CustomFilter, useSearch } from '@/composables/useSearch';
import { defineComponent, PropType, ref } from 'vue';


interface Column {
  name: string,
  isFilterable: boolean
  filterBy?: CustomFilter
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

    const _search = ref('')



    const columnDefaults = {
      isFilterable: true
    }

    const _columns: Column[] = props.columns.length
      ? props.columns
      : (props.rows.length
        ? Object.keys(props.rows[0])
          .map(k => ({
            ...columnDefaults,
            name: k,
          }))
        : [])

    // Filter out columns that is searchable based on isFilterable property
    const searchableCols = _columns.filter(col => col.isFilterable || col.filterBy)

    const { results: filteredRows } = useSearch(_search, props.rows, searchableCols.map(col => col.filterBy ? { name: col.name, filterBy: col.filterBy } : col.name))


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

      const searchInput = () => <AInput prepend-inner-icon="i-bx-search" placeholder="search..." class="max-w-48" v-model={_search.value}></AInput>

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

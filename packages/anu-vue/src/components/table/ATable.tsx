import { ACard, useCardProps } from '@/components/card'
import { AInput } from '@/components/input'
import type { CustomFilter } from '@/composables/useSearch'
import { useSearch } from '@/composables/useSearch'
import type { CustomSort } from '@/composables/useSort'
import { useSort } from '@/composables/useSort'
import type { PropType } from 'vue'
import { computed, defineComponent, ref, toRef } from 'vue'

// import { controlledComputed } from '@vueuse/core';

interface Column {
  name: string
  isFilterable?: boolean
  filterBy?: CustomFilter
  isSortable?: boolean
  sortBy?: CustomSort
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
      default: () => [],
    },
    search: {
      type: [Boolean, String],
      default: false,
    },
    noResultsText: {
      type: String,
      default: 'No matching results found!!',
    },
    multiSort: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    // ℹ️ I used destructing to extract card props from table props. Moreover,I didn't wanted to use destructured props hence I omitted them
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { columns: _, rows: __, search: ___, ...cardProps } = props

    const _search = ref('')

    const columnDefaults = {
      isFilterable: true,
      isSortable: true,
    }

    // If columns are provided via prop
    const _columns: Column[] = props.columns.length

      // Inject column defaults by iterating over each col
      ? props.columns.map(c => ({ ...columnDefaults, ...c }))

      // Else generate columns from first row
      : (props.rows.length
          ? Object.keys(props.rows[0])
            .map(k => ({
              ...columnDefaults,
              name: k,
            }))
          : [])

    // Filter out columns that is searchable based on isFilterable property
    const searchableCols = _columns.filter(col => col.isFilterable || col.filterBy)
    const sortedCols = ref<Column[]>([])

    const { results: filteredRows } = useSearch(
      _search,
      toRef(props, 'rows'),
      searchableCols
        .map(col => col.filterBy
          ? { name: col.name, filterBy: col.filterBy }
          : col.name),
    )

    const { results: sortedRows } = useSort(
      filteredRows,
      computed(() => sortedCols.value.map(col => col.sortBy ? { name: col.name, sortBy: col.sortBy } : col.name)),
    )

    const handleHeaderClick = (col: Column) => {
      if (!props.multiSort) {
        sortedCols.value = [col]

        return
      }

      // If multiSort is enabled
      const index = sortedCols.value.indexOf(col)

      if (index > -1)
        sortedCols.value.splice(index, 1)
      else sortedCols.value.push(col)
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

          TODO(refactor): Use variant group here
      */
      const table = <table class="w-full max-w-full all-[tr]-border-b all-[tr]-border-[hsla(var(--base-color),var(--border-opacity))]">
        {/* 👉 thead */}
        <thead>
          <tr>
            {_columns.map(column => <th class="px-4 h-12 text-left whitespace-nowrap cursor-pointer" onClick={() => handleHeaderClick(column)}>{column.name}</th>)}
          </tr>
        </thead>

        {/* 👉 tbody */}
        <tbody>
          {
            sortedRows.value.length
              ? sortedRows.value.map(row => {
                return <tr>
                  {Object.entries(row).map(([_, columnValue]) => {
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
          headerRight: typeof props.search === 'boolean' && props.search ? searchInput : null,
        }}
      />
    }
  },
})

export type ATable = InstanceType<typeof ATable>

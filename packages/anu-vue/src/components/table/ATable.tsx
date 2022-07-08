import { ACard, useCardProps } from '@/components/card'
import { AInput } from '@/components/input'
import type { CustomFilter } from '@/composables/useSearch'
import { useSearch } from '@/composables/useSearch'
import type { CustomSort, typeSortBy } from '@/composables/useSort'
import { useSort } from '@/composables/useSort'
import type { PropType, Ref } from 'vue'
import { computed, defineComponent, ref, toRef } from 'vue'

// import { controlledComputed } from '@vueuse/core';

interface PropColumn {
  name: string
  isFilterable?: boolean
  filterBy?: CustomFilter
  isSortable?: boolean
  sortBy?: CustomSort
}

interface TableColumn extends PropColumn {
  shallSortByAsc: boolean | null
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
      type: [Array] as PropType<PropColumn[]>,
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
      shallSortByAsc: null,
    }

    // If columns are provided via prop
    const _columns: Ref<TableColumn[]> = computed(() => props.columns.length

      // Inject column defaults by iterating over each col
      ? props.columns.map(c => ({ ...columnDefaults, ...c }))

      // Else generate columns from first row
      : (props.rows.length
          ? Object.keys(props.rows[0])
            .map(k => ({
              ...columnDefaults,
              name: k,
            }))
          : []))

    // Filter out columns that is searchable based on isFilterable property
    const searchableCols = _columns.value.filter(col => col.isFilterable || col.filterBy)
    const sortedCols = ref <TableColumn[]>([])

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
      computed(() => {
        const colsSortBy: typeSortBy = []

        sortedCols.value.forEach(col => {
          if (col.sortBy)
            colsSortBy.push({ name: col.name, sortBy: col.sortBy })
          else if (col.shallSortByAsc !== null)
            colsSortBy.push({ name: col.name, isAsc: col.shallSortByAsc })
        })

        return colsSortBy
      }),
    )

    const handleHeaderClick = (col: TableColumn) => {
      // console.log('col :>> ', col)

      const index = sortedCols.value.indexOf(col)

      // console.log('index :>> ', index)

      /*
        If col exist in arr
          if sort order is asc
            set sort order to desc
          else
            set sort order to null
            and remove the column from `sortedCols`
        else
          set sort order to asc

        // multi-sort

        if sort order is not null
          if multi-sort is not enabled
            assign above modified col as single element of array to `sortedCols`
          else
            add modified col to sorted cols
      */

      if (index > -1) {
        // Sorted by Asc
        if (col.shallSortByAsc) {
          col.shallSortByAsc = false
        }

        // Sorted by Desc
        else {
          col.shallSortByAsc = null

          // console.log('in')
          // console.log('sortedCols.value :>> ', sortedCols.value)
          sortedCols.value.splice(index, 1)

          // console.log('sortedCols.value :>> ', sortedCols.value)
          // console.log('out')
        }
      }

      // Not sorted
      else {
        col.shallSortByAsc = true
      }

      // console.log('col :>> ', col)

      // Handle Multi sort

      if (col.shallSortByAsc !== null) {
        if (!props.multiSort)
          sortedCols.value = [col]
        else
          sortedCols.value.push(col)
      }

      // console.log('col :>> ', col)
      // console.log('sortedCols :>> ', sortedCols.value)
      // console.log('-----')

      // -------------

      // if (!props.multiSort) {
      //   sortedCols.value = [col]

      //   return
      // }

      // if (index > -1)
      //   sortedCols.value.splice(index, 1)
      // else sortedCols.value.push(col)
    }

    return () => {
      // 👉 No results
      const noResultsTr = <tr>
        <td colspan={_columns.value.length} class="px-4 h-12 whitespace-nowrap text-center font-medium">
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
            {_columns.value.map(column =>
              <th
                class="select-none px-4 h-12 text-left whitespace-nowrap cursor-pointer"
                onClick={() => handleHeaderClick(column)}
              >
                <div class="inline-flex items-center">
                    <span>{column.name}</span>
                    <div v-show={column.shallSortByAsc === true} class="i-bx-up-arrow-alt"></div>
                    <div v-show={column.shallSortByAsc === false} class="i-bx-down-arrow-alt"></div>
                  </div>
              </th>,
            )}
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

      const temp = <pre>{JSON.stringify(_columns.value, null, 2)}</pre>

      // 💡 Here we are passing all the slots to card except default which gets overridden for merging provided default slot with table
      return <ACard
        {...cardProps}
        class="overflow-auto"
        v-slots={{
          ...slots,
          default: () => [slots.default?.(), temp, table],
          headerRight: typeof props.search === 'boolean' && props.search ? searchInput : null,
        }}
      />
    }
  },
})

export type ATable = InstanceType<typeof ATable>

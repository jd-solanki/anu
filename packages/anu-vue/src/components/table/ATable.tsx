import { ABtn } from '@/components/btn'
import { ACard, useCardProps } from '@/components/card'
import { AInput } from '@/components/input'
import { ASelect } from '@/components/select'
import { ATypography } from '@/components/typography'
import type { CustomFilter } from '@/composables/useSearch'
import { useSearch } from '@/composables/useSearch'
import type { CustomSort, typeSortBy } from '@/composables/useSort'
import { useSort } from '@/composables/useSort'
import { useOffsetPagination } from '@vueuse/core'
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
    pageSize: {
      type: Number,
      default: 5,
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

    // TODO(v0.2.0) Try to use _columns for sorting
    const sortedCols = ref <TableColumn[]>([])

    // 👉 Filtered Rows
    const { results: filteredRows } = useSearch(
      _search,
      toRef(props, 'rows'),
      searchableCols
        .map(col => col.filterBy
          ? { name: col.name, filterBy: col.filterBy }
          : col.name),
    )

    // TODO: If we sort second col after selecting any first and set order to desc on first clicked row then its err
    // 👉 Sorted Rows
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

    const fetchData = () => {}

    // 👉 Paginated Rows
    const currentPageSize = ref(props.pageSize)
    const {
      currentPage,

      // currentPageSize,
      // pageCount,
      isFirstPage,
      isLastPage,
      prev: goToPreviousPage,
      next: goToNextPage,
    } = useOffsetPagination({
      total: computed(() => sortedRows.value.length),
      page: 1,
      pageSize: currentPageSize,
      onPageChange: fetchData,
      onPageSizeChange: fetchData,
    })
    const paginatedRows = computed(() => {
      const start = (currentPage.value - 1) * currentPageSize.value
      const end = currentPage.value * currentPageSize.value

      return sortedRows.value.slice(start, end)
    })

    // 👉 Handle header click
    const handleHeaderClick = (col: TableColumn) => {
      const index = sortedCols.value.findIndex(c => c.name === col.name)

      console.log('index :>> ', index)

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
        if (col.shallSortByAsc)
          sortedCols.value.push(col)
        else
          sortedCols.value.splice(index, 1, { ...col })
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

    const getShallSortByAsc = computed(() => (col: TableColumn) => {
      const _col = sortedCols.value.find(sortedCol => sortedCol.name === col.name)

      if (!_col)
        return null
      else return _col.shallSortByAsc
    })

    return () => {
      // 👉 No results
      const noResultsTr = <tr>
        <td colspan={_columns.value.length} class="em:px-[1.15rem] em:h-14 whitespace-nowrap text-center font-medium">
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
                class="select-none em:px-[1.15rem] em:h-14 text-left whitespace-nowrap cursor-pointer"
                onClick={() => handleHeaderClick(column)}
              >
                <div class="inline-flex items-center">
                    <span>{column.name}</span>
                  <div v-show={getShallSortByAsc.value(column) === true} class="i-bx-up-arrow-alt"></div>
                  <div v-show={getShallSortByAsc.value(column) === false} class="i-bx-down-arrow-alt"></div>
                  </div>
              </th>,
            )}
          </tr>
        </thead>

        {/* 👉 tbody */}
        <tbody>
          {
            paginatedRows.value.length
              ? paginatedRows.value.map(row => {
                return <tr>
                  {Object.entries(row).map(([_, columnValue]) => {
                    return <td class="em:px-[1.15rem] em:h-14 whitespace-nowrap">{columnValue}</td>
                  })}
                </tr>
              })
              : noResultsTr
          }
        </tbody>
      </table>

      const searchInput = () => <AInput prepend-inner-icon="i-bx-search" placeholder="search..." class="max-w-48" v-model={_search.value}></AInput>

      // 👉 Footer
      // TODO: create PR for useOffsetPagination metadata
      // TODO: currentPage is 0 when total is 0 => bug in vueuse
      const tableFooter = <div class="em:px-[1.15rem] em:h-14 flex items-center gap-x-4">
        <ATypography class="text-size-[inherit]" v-slots={{
          subtitle: () => <>
            {(currentPage.value - 1) * currentPageSize.value + 1} - {sortedRows.value.length - currentPage.value * currentPageSize.value > 0 ? currentPage.value * currentPageSize.value : sortedRows.value.length} of {sortedRows.value.length}
          </>,
        }}></ATypography>
        <div class="flex-grow"></div>
        <div class="em:text-sm flex items-center gap-x-2">
          <span>per page</span>
          {/* <ABtn class="text-sm" onClick={() => { currentPageSize.value = 10 }}>10</ABtn> */}
          <ASelect class="text-sm w-16 text-xs" inputWrapperClasses="em:h-9 rounded-0 !border-transparent !border-b-(thin [hsla(var(--base-color),var(--border-opacity))])" v-model={currentPageSize.value} v-slots={{
            default: ({ attrs }: any) => [5, 10, 15, 20].map(perPageOption => <li class="em:text-sm" {...attrs} onClick={() => { currentPageSize.value = perPageOption }}>{perPageOption}</li>,
            ),
          }}></ASelect>
        </div>
        <div>
          <ABtn icon-only class="rounded-full text-xs me-2" icon="i-bx-left-arrow-alt" variant="default" onClick={goToPreviousPage} {...(isFirstPage.value && { disabled: true })}></ABtn>
          <ABtn icon-only class="rounded-full text-xs" icon="i-bx-right-arrow-alt" variant="default" onClick={goToNextPage} {...(isLastPage.value && { disabled: true })}></ABtn>
        </div>
      </div>

      const x = <pre>{String(isFirstPage.value)} - {String(isLastPage.value)} - {String(currentPage.value)}</pre>

      // TODO: noresultstext is represented as attrs of card
      // 💡 Here we are passing all the slots to card except default which gets overridden for merging provided default slot with table
      return <ACard
        {...cardProps}
        class="overflow-auto"
        v-slots={{
          ...slots,
          default: () => [slots.default?.(), table, tableFooter],
          headerRight: typeof props.search === 'boolean' && props.search ? searchInput : null,
        }}
      />
    }
  },
})

export type ATable = InstanceType<typeof ATable>

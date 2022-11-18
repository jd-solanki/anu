import { computedEager, useOffsetPagination } from '@vueuse/core'
import type { ComputedRef, PropType, Ref, ToRefs } from 'vue'
import { computed, defineComponent, reactive, ref, toRaw, toRef, toRefs, watch } from 'vue'
import { ABtn } from '@/components/btn'
import { ACard, useCardProps } from '@/components/card'
import { AInput } from '@/components/input'
import { ASelect } from '@/components/select'
import { ATypography } from '@/components/typography'
import type { CustomFilter } from '@/composables/useSearch'
import { useSearch } from '@/composables/useSearch'
import type { CustomSort, typeSortBy } from '@/composables/useSort'
import { useSort } from '@/composables/useSort'
import { spacingProp, useSpacing } from '@/composables/useSpacing'

export type ShallSortByAsc = boolean | null

export interface PropColumn {
  name: string
  isFilterable?: boolean

  // TODO(TS): Improve typing
  filterBy?: CustomFilter<any>
  isSortable?: boolean
  sortBy?: CustomSort
  formatter?: (val: unknown) => unknown
}

export interface TableColumn extends PropColumn {
  shallSortByAsc: ShallSortByAsc
}

export interface ItemsFunctionParams {
  q: string
  currentPage: number
  rowsPerPage: number
  sortedCols: TableColumn[]
}

export interface ItemsFunction {
  (props: ItemsFunctionParams): Promise<{ rows: unknown[]; total: number }>
}

const tableProps = {
  /**
   * Table rows. Can be static array or function that returns resolves array. Visit [Server side table](#server-side-table) demo to understand how to use function as `rows` prop.
   */
  rows: {
    type: [Array, Function] as PropType<Object[] | ItemsFunction>,
    required: true,
  },

  /**
   * By default table will infer the column definition from first row. You can also manually provide the column definition for more control.
   */
  columns: {
    type: [Array] as PropType<PropColumn[]>,
    default: () => [],
  },

  /**
   * Enable filtering/searching in table
   */
  search: {
    type: [Boolean, String],
    default: false,
  },

  /**
   * Text to render when no row is available
   */
  noResultsText: {
    type: String,
    default: 'No matching results found!!',
  },

  /**
   * Enable/Disable sorting table
   */
  isSortable: {
    type: Boolean,
    default: true,
  },

  /**
   * By default you can only sort single column. You can enable sorting multiple columns at the same time using this prop.
   */
  multiSort: {
    type: Boolean,
    default: false,
  },

  /**
   * Set rows to show per page
   */
  pageSize: {
    type: Number,
    default: 10,
  },
}

export const ATable = defineComponent({
  name: 'ATable',
  props: {
    spacing: spacingProp,
    ...useCardProps(),
    ...tableProps,
  },
  setup(props, { slots }) {
    const spacing = useSpacing(toRef(props, 'spacing'))

    // ℹ️ I used destructing to extract card props from table props. Moreover,I didn't wanted to use destructured props hence I omitted them

    const cardProps = computed<Partial<ToRefs<typeof props>>>(() => {
      const tablePropsNames = Object.keys(tableProps)

      const cardPropsEntries = Object.entries(props).map(([propName, propValue]) => {
        if (!tablePropsNames.includes(propName))
          return [propName, propValue]

        return null
      }).filter(i => i) as [keyof typeof props, typeof props[keyof typeof props]][]

      return toRefs(reactive(Object.fromEntries(cardPropsEntries)))
    })

    // 👉 isSST
    const isSST = computedEager(() => !Array.isArray(props.rows))

    // 👉 _rows
    // If rows prop is array directly set it else table data comes from server hence we will assign blank array as initial rows data
    const _rows = computed(() => isSST.value ? [] : props.rows)

    // 👉 Server rows
    const _serverRows = ref<Object[]>([])
    const _serverTotal = ref(0)

    const fetchRows = () => {
      // _search.value, currentPage.value, currentPageSize.value, sortedCols.value
      if (typeof props.rows !== 'function')
        return

      (props.rows as ItemsFunction)({
        /* eslint-disable @typescript-eslint/no-use-before-define */
        q: _search.value,
        currentPage: currentPage.value,
        rowsPerPage: currentPageSize.value,
        sortedCols: toRaw(sortedCols.value),
        /* eslint-enable @typescript-eslint/no-use-before-define */
      })
        .then(data => {
          const { rows, total } = data
          _serverRows.value = rows as Object[]
          _serverTotal.value = total
        })
    }

    // 👉 Search
    // TODO: Check using custom input for SST
    const _search = ref('')

    // 👉 Column defaults
    const columnDefaults = {
      isFilterable: true,
      isSortable: true,
      shallSortByAsc: null,
    }

    // 👉 Paginated Rows
    const paginatedRows = ref<any[]>([])

    // 👉 rowsToRender
    const rowsToRender = computed(() => isSST.value ? _serverRows.value : paginatedRows.value)

    // 👉 _columns
    // TODO: Improve _columns computation
    // If columns are provided via prop
    const _columns: Ref<TableColumn[]> = computed(() => props.columns.length

      // Inject column defaults by iterating over each col
      ? props.columns.map(c => ({ ...columnDefaults, ...c }))

      // Else generate columns from first row
      : isSST.value

        ? (rowsToRender.value.length
            ? Object.keys(rowsToRender.value[0])
              .map(k => ({
                ...columnDefaults,
                name: k,
              }))
            : [])
        : props.rows?.length
          ? Object.keys((props.rows as Object[])[0])
            .map(k => ({
              ...columnDefaults,
              name: k,
            }))
          : [],
    )

    // console.log('_columns :>> ', _columns.value)

    // Filter out columns that is searchable based on isFilterable property
    const searchableCols = _columns.value.filter(col => col.isFilterable || col.filterBy)

    // 👉 sortedCols
    // TODO(v0.2.0) Try to use _columns for sorting
    const sortedCols = ref<TableColumn[]>([])

    // 👉 Filtered Rows
    const { results: filteredRows } = useSearch(
      _search,

      // TODO(TS): Improve typing
      (_rows as ComputedRef<Object[]>),
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

    // TODO: Check passing toRef(props, 'pageSize') to useOffsetPagination and use returned `currentPageSize` for reactive pgeSize prop
    const currentPageSize = ref(props.pageSize)
    const paginateRows = ({ currentPage, currentPageSize }: { currentPage: number; currentPageSize: number }) => {
      const start = (currentPage - 1) * currentPageSize
      const end = currentPage * currentPageSize

      paginatedRows.value = sortedRows.value.slice(start, end)
    }

    // paginateRows({ currentPage: 1, currentPageSize: currentPageSize.value })
    const total = computed(() => isSST.value ? _serverTotal.value : sortedRows.value.length)

    // 👉 useOffsetPagination
    const {
      currentPage,

      // currentPageSize,
      // pageCount,
      isFirstPage,
      isLastPage,
      prev: goToPreviousPage,
      next: goToNextPage,
    } = useOffsetPagination({
      total,
      page: 1,
      pageSize: currentPageSize,

      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      onPageChange: () => { recalculateCurrentPageData() },
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      onPageSizeChange: () => { recalculateCurrentPageData() },
    })

    const recalculateCurrentPageData = () => {
      if (isSST.value)
        fetchRows()
      else
        paginateRows({ currentPage: currentPage.value, currentPageSize: currentPageSize.value })
    }

    watch([_search, sortedCols, sortedRows], recalculateCurrentPageData, { deep: true, immediate: true })

    // 👉 onRequest
    // watch([_search, currentPage, sortedCols], fetchRows, { deep: true, immediate: true })

    // 👉 Handle header click
    const handleHeaderClick = (col: TableColumn) => {
      // If table is not sortable don't sort the table
      if (!props.isSortable)
        return

      const index = sortedCols.value.findIndex(c => c.name === col.name)

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
          sortedCols.value.splice(index, 1)
        }
      }

      // Not sorted
      else {
        col.shallSortByAsc = true
      }

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
    }

    const getShallSortByAsc = computed(() => (col: TableColumn) => {
      const _col = sortedCols.value.find(sortedCol => sortedCol.name === col.name)

      return !_col ? null : _col?.shallSortByAsc
    })

    return () => {
      // TODO: There should be no data as well and it should be rendered only when data is filtered and there's no resulting rows
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
      const table = <div class="overflow-x-auto">
        <table class="a-table-table overflow-x-auto w-full max-w-full">
          {/* 👉 thead */}
          <thead>
            <tr>
              {_columns.value.map(column =>
                <th
                  class={['a-table-table-th whitespace-nowrap', props.isSortable && 'cursor-pointer select-none']}
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
              rowsToRender.value.length
                ? rowsToRender.value.map((row, _) => {
                  return <tr>
                    {
                        _columns.value.map(col => <td class="a-table-table-td whitespace-nowrap">
                            {
                              slots[`row-${col.name}`]
                                ? slots[`row-${col.name}`]?.({ row })
                                : col.formatter
                                  ? <span class="a-table-td-text">{col.formatter?.(row)}</span>

                                  // TODO(TS): Improve typing
                                  : <span class="a-table-td-text">{row[col.name as keyof Object]}</span>
                            }
                          </td>,
                        )
                    }
                  </tr>
                })
                : noResultsTr
            }
          </tbody>
        </table>
      </div>

      const searchInput = () => <AInput prepend-inner-icon="i-bx-search" placeholder="search..." class="max-w-48 text-sm" v-model={_search.value}></AInput>

      // 👉 Footer
      // TODO: create PR for useOffsetPagination metadata
      const tableFooter = <div class="a-table-footer flex items-center">
        <ATypography class="a-table-pagination-meta">
          {/* TODO: Remove this text-xs usage as we have text-xs in default theme's styles once we resolve the card font size issue */}
          <span class="text-xs">{rowsToRender.value.length ? (currentPage.value - 1) * currentPageSize.value + 1 : 0} - {isLastPage.value
            ? isSST.value
              ? _serverTotal.value
              : filteredRows.value.length
            : currentPage.value * currentPageSize.value} of {total.value}</span>
        </ATypography>
        <div class="flex-grow"></div>
        <div class="a-table-footer-per-page-container flex items-center">
          <span class="sm:inline hidden">per page</span>
          <ASelect
            class="a-table-footer-per-page-select"
            spacing={80}
            inputWrapperClasses="a-table-footer-per-page-select--input-wrapper-classes"
            optionsWrapperClasses="a-table-footer-per-page-select--options-wrapper-classes"
            v-model={currentPageSize.value}
            options={Array.from(new Set([props.pageSize, 5, 10, 15, 20])).sort((a, b) => a - b)}>
          </ASelect>
        </div>
        <div>
          <ABtn icon-only class="a-table-footer-previous-page-btn" icon="i-bx-left-arrow-alt" variant="default" onClick={goToPreviousPage} {...(isFirstPage.value && { disabled: true })}></ABtn>
          <ABtn icon-only class="a-table-footer-next-page-btn" icon="i-bx-right-arrow-alt" variant="default" onClick={goToNextPage} {...(isLastPage.value && { disabled: true })}></ABtn>
        </div>
      </div>

      // TODO: noresultstext is represented as attrs of card
      // 💡 Here we are passing all the slots to card except default which gets overridden for merging provided default slot with table
      return <ACard
      style={{ '--a-spacing': spacing.value / 100 }}
        class="a-table"
        {...reactive(cardProps.value)}
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

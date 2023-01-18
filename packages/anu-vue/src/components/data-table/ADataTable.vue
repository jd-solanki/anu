<script lang="ts" setup>
import { defu } from 'defu'
import type { ExtractPropTypes, Ref } from 'vue'
import type { DataTablePropColumn, ItemsFunction } from './props'
import { dataTableColDefaults, dataTableProps } from './props'
import { ABtn, AInput, ASelect, ATable } from '@/components'
import { tableProps } from '@/components/table'
import { useSearch } from '@/composables/useSearch'
import type { typeSortBy } from '@/composables/useSort'
import { useSort } from '@/composables/useSort'

const props = defineProps(dataTableProps)

// TODO: Check usage with usedebouncefn. Can we limit the # of req to server?
const emit = defineEmits<{

  // TODO: Duplicated from `ATable` because of import interface issue
  (e: 'click:header', col: Exclude<(ExtractPropTypes<typeof props>)['cols'], undefined>): void

  // ---

  (e: 'update:search', q: string): void
}>()

defineOptions({
  name: 'ADataTable',
})

// TODO: https://twitter.com/mattpocockuk/status/1606656367078539264
const _tableProps = reactivePick(props, Object.keys(tableProps).filter(k => !['rows', 'cols'].includes(k)) as Array<keyof typeof tableProps>)

const _rows = ref<Record<string, unknown>[]>(typeof props.rows !== 'function' ? props.rows : [])
const _total = ref(typeof props.rows === 'function' ? 0 : props.rows.length)

// SECTION Calculate column
/*
  ❗ Order of the code written for calculating column headers is important.
  It is optimized as well so that it doesn't do any unwanted calculation
*/

// We are initializing with empty array to for calculating column headers manually
const cols: Ref<DataTablePropColumn[]> = ref([])

// This will handle assigning defaults to column on render & further prop updates
watch(() => props.cols, _cols => {
  cols.value = _cols.map(col => defu(col, dataTableColDefaults))
}, { immediate: true })

// Little helper utility to generate columns from column names applying column defaults
const genColsFromNames = (names: string[]) => names.map(rowProperty => {
  return defu({ ...dataTableColDefaults, name: rowProperty }) as DataTablePropColumn
})

/*
  This is where we component optimization starts.

  - Don't calculate column headers if provided via prop
*/
// Run only if columns props isn't provided
if (!props.cols.length) {
  // If we have rows via prop => Get columns from first row.
  if (Array.isArray(props.rows) && props.rows.length) {
    cols.value = genColsFromNames(Object.keys(props.rows[0]))
  }

  /*
    We are processing this block means => cols prop isn't provided + dev passed rows as function => Server side table

    We will process this block if dev is using server side table & didn't provided any columns
  */
  else {
    // Optimization: Eagerly evaluate
    const numOfRows = computedEager(() =>
      typeof props.rows === 'function'
        ? _rows.value.length
        : props.rows.length,
    )

    /*
      Optimization: Only watch once for num of rows.

      Because when server side table is used we want to get headers when we get rows in _rows array after async request.
    */
    watchOnce(numOfRows, () => {
      cols.value = genColsFromNames(
        Object.keys((typeof props.rows === 'function' ? _rows.value : props.rows)[0]),
      )
    })
  }
}

// !SECTION

// 👉 Search query
const q = ref(typeof props.search === 'boolean' ? '' : props.search)
watch(q, value => {
  emit('update:search', value)
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  fetchRows()
})

// 👉 Sorted cols computed
const sortedCols = computed(() => cols.value.filter(col => col.isSortable && col.sortBy !== undefined))

// 👉 fetch rows
const fetchRows = () => {
  // Use type check instead of isSST to prevent type aliases further
  if (typeof props.rows === 'function') {
    (props.rows as ItemsFunction)({
      q: q.value,
      /* eslint-disable @typescript-eslint/no-use-before-define */
      currentPage: currentPage.value,
      rowsPerPage: currentPageSize.value,
      /* eslint-enable */
      sortedCols: sortedCols.value,
    })
      .then(data => {
        const { rows, total } = data
        _rows.value = rows
        _total.value = total
      })
  }
  else {
    // Search
    const { results: filteredRows } = useSearch(
      q,
      props.rows,
      cols.value.map(col => col.filterFunc
        ? { name: col.name, filterBy: col.filterFunc }
        : col.name),
    )

    // Update total
    _total.value = filteredRows.value.length

    // Sort
    const { results: sortedRows } = useSort(
      filteredRows,
      computed(() => {
        const colsSortBy: typeSortBy = []

        sortedCols.value.forEach(col => {
          if (col.sortFunc)
            colsSortBy.push({ name: col.name, sortBy: col.sortFunc })
          else if (col.sortBy !== undefined)
            colsSortBy.push({ name: col.name, isAsc: col.sortBy === 'asc' })
        })

        return colsSortBy
      }),
    )

    // Paginate
    /* eslint-disable @typescript-eslint/no-use-before-define */
    const start = (currentPage.value - 1) * currentPageSize.value
    const end = currentPage.value * currentPageSize.value
    /* eslint-enable */

    _rows.value = sortedRows.value.slice(start, end)
  }
}

// 👉 useOffsetPagination
const {
  currentPage,
  currentPageSize,
  pageCount,
  isFirstPage,
  isLastPage,
  prev: goToPreviousPage,
  next: goToNextPage,
} = useOffsetPagination({
  total: _total,
  page: 1,
  pageSize: props.pageSize,
  onPageChange: fetchRows,
  onPageSizeChange: fetchRows,
})

// ℹ️ fetchRows must be called after `useOffsetPagination`
fetchRows()

// 👉 Handle header click
const handleHeaderClick = (clickedCol: any) => {
  // TODO: Remove this and fix handler type error
  clickedCol = clickedCol as DataTablePropColumn
  const tableCol = cols.value.find(_col => clickedCol.name === _col.name)

  // If we can't find clicked column in table columns
  if (!tableCol) {
    console.warn(`Clicked col ${clickedCol.name} doesn't exist in table cols: ${cols.value.map(c => c.name).join(', ')}`)

    return
  }

  // If column is not sorted => Don't do anything
  if (!tableCol.isSortable)
    return

  /**
   * If table col sortBy is undefined => col isn't sorted => sort by asc
   * Else if sortBy is asc => change sort direction to desc
   * Else sortBy must be desc => remove sorting on that column
   */

  if (tableCol.sortBy === undefined)
    tableCol.sortBy = 'asc'

  else if (tableCol.sortBy === 'asc')
    tableCol.sortBy = 'desc'

  else
    tableCol.sortBy = undefined

  /*
    ℹ️ Handle multi sort

    If only single column sorting is allowed (multi sort is disabled) => disable sorting of cols except clicked col
  */
  if (!props.multiSort) {
    // Loop over all table columns
    cols.value.forEach((_col, index) => {
      // If iterating column is other than clicked column
      if (_col.name !== clickedCol.name) {
        // Remove sorting
        _col.sortBy = undefined
      }
    })
  }

  emit('click:header', clickedCol)
  if (clickedCol.isSortable)
    fetchRows()
}

const slots = useSlots()
const renderHeaderRightSlot = (typeof props.search === 'boolean' && props.search)
  || props.search
  || slots['before-search']
  || slots['after-search']

// 👉 Pagination meta
const paginationMeta = computed(() => {
  const from = _rows.value.length
    ? (currentPage.value - 1) * currentPageSize.value + 1
    : 0

  const to = isLastPage.value
    ? _total.value
    : currentPage.value * currentPageSize.value

  return `${from} - ${to} of ${_total.value}`
})
</script>

<template>
  <ATable
    v-bind="_tableProps"
    :cols="cols"
    :rows="_rows"
    class="a-data-table"
    @click:header="handleHeaderClick"
  >
    <!-- 👉 Search -->
    <template
      v-if="renderHeaderRightSlot"
      #header-right
    >
      <!-- 👉 Slot: before-search -->
      <slot name="before-search" />
      <!-- 👉 search -->
      <AInput
        v-if="(typeof props.search === 'boolean' && props.search) || props.search"
        v-model="q"
        placeholder="search..."
        class="max-w-48 text-sm"
        prepend-inner-icon="i-bx-search"
      />
      <!-- 👉 Slot: after-search -->
      <slot name="after-search" />
    </template>

    <!-- 👉 Header slot -->
    <template
      v-for="col in cols"
      :key="col.name"
      #[`header-${col.name}`]
    >
      <slot
        :name="`header-${col.name}`"
        v-bind="{ col }"
      >
        <span>{{ col.name }}</span>
      </slot>
      <i
        v-show="col.sortBy === 'asc'"
        class="i-bx-up-arrow-alt"
      />
      <i
        v-show="col.sortBy === 'desc'"
        class="i-bx-down-arrow-alt"
      />
    </template>

    <!-- 👉 Pagination -->
    <template #after-table>
      <div class="a-data-table-pagination flex items-center w-full">
        <span class="a-subtitle a-data-table-pagination-meta">{{ paginationMeta }}</span>
        <div class="flex-grow" />
        <div class="a-data-table-per-page flex items-center">
          <span class="sm:inline hidden">per page</span>
          <ASelect
            v-model="currentPageSize"
            :options="Array.from(new Set([props.pageSize, 5, 10, 15, 20])).sort((a, b) => a - b)"
            :spacing="80"
            options-wrapper-classes="a-data-table-per-page-select--options-wrapper-classes"
          />
        </div>
        <div class="a-data-table-pagination-navigation">
          <ABtn
            class="a-data-table-paginate-previous"
            icon="i-bx-left-arrow-alt"
            icon-only
            variant="default"
            :disabled="isFirstPage"
            @click="goToPreviousPage"
          />
          <ABtn
            class="a-data-table-paginate-next"
            icon="i-bx-right-arrow-alt"
            icon-only
            variant="default"
            :disabled="isLastPage"
            @click="goToNextPage"
          />
        </div>
      </div>
    </template>

    <!-- TODO: If you are using child component props in component => Filter them out -->
    <!-- ℹ️ Recursively pass down slots to child -->
    <template
      v-for="name in Object.keys($slots).filter(slotName => !slotName.startsWith('header-'))"
      #[name]="slotProps"
    >
      <slot
        :name="name"
        v-bind="slotProps || {}"
      />
    </template>
  </ATable>
</template>

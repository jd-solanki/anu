<script lang="ts" setup>
import { defu } from 'defu'
import type { ExtractPropTypes } from 'vue'
import type { ServerTablePropColumn } from './props'
import { serverTableProps } from './props'
import { defuProps } from '@/composables/useProps'
import { tableProps } from '@/components/table'
import { ABtn, AInput, ASelect, ATypography } from '@/components'

const props = defineProps(defuProps(serverTableProps, tableProps))

// TODO: Check usage with usedebouncefn. Can we limit the # of req to server?

// q: _q.value,
// currentPage: currentPage.value,
// rowsPerPage: currentPageSize.value,
// sortedCols: sortedCols.value,
const emit = defineEmits<{

  // TODO: Duplicated from `ATable` because import interface issue
  (e: 'click:header', col: Exclude<(ExtractPropTypes<typeof props>)['cols'], undefined>): void

  // ---

  (e: 'update:search', q: string): void
}>()

defineOptions({
  name: 'AServerTable',
})

const colDefaults: Partial<ServerTablePropColumn> = {
  isSortable: true,
  headerClasses: (col: ServerTablePropColumn) => col.isSortable && 'cursor-pointer select-none',
  sortBy: undefined,
}

// ℹ️ We must return reactive: https://github.com/vuejs/docs/issues/849#issuecomment-775057101
// Thanks: @skirtle. Discord conversation: https://discord.com/channels/325477692906536972/568037134968160256/1055173143423107142
const _cols = computed<ServerTablePropColumn[]>(() => props.cols.map(colProp => reactive(defu(colProp, colDefaults))))

const _tableProps = reactivePick(props, Object.keys(tableProps).filter(k => !['rows', 'cols'].includes(k)) as Array<keyof typeof tableProps>)

const _rows = ref<unknown[]>([])
const _total = ref(0)

const q = ref(typeof props.query === 'boolean' ? '' : props.query)
watch(q, val => {
  emit('update:search', q.value)
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  fetchRows()
})

const sortedCols = computed(() => _cols.value.filter(col => col.isSortable && col.sortBy !== undefined))

const fetchRows = () => {
  // _search.value, currentPage.value, currentPageSize.value, sortedCols.value
  if (typeof props.rows !== 'function')
    throw new Error('\'rows\' prop must be function')

  props.rows({
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

const handleHeaderClick = (clickedCol: ServerTablePropColumn) => {
  const tableCol = _cols.value.find(_col => clickedCol.name === _col.name)

  // console.log('_cols.value :>> ', _cols.value)
  // console.log('clicked', clickedCol, tableCol.value)

  // If we can't find clicked column in table columns
  if (!tableCol) {
    console.warn(`Clicked col ${clickedCol.name} doesn't exist in table cols: ${_cols.value.map(c => c.name).join(', ')}`)

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
    _cols.value.forEach((_col, index) => {
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
const renderHeaderRightSlot = (typeof props.query === 'boolean' && props.query)
  || props.query
  || slots['before-search']
  || slots['after-search']

const paginationMeta = computed(() => {
  const from = _rows.value.length ? (currentPage.value - 1) * currentPageSize.value + 1 : 0
  const to = isLastPage.value ? _total.value : currentPage.value * currentPageSize.value

  return `${from} - ${to} of ${_total.value}`
})
</script>

<template>
  <ATable
    v-bind="{
      ..._tableProps,
      cols: _cols,
      rows: _rows,
    }"
    class="[&>.a-card-typography-wrapper_.a-base-input-root]-max-w-48 [&>.a-card-typography-wrapper_.a-base-input-root]-text-sm"
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
      <!-- input-wrapper-classes="max-w-48 text-sm" -->
      <AInput
        v-if="(typeof props.query === 'boolean' && props.query) || props.query"
        v-model="q"
        placeholder="search..."
        prepend-inner-icon="i-bx-search"
      />
      <!-- 👉 Slot: after-search -->
      <slot name="after-search" />
    </template>

    <!-- 👉 Header slot -->
    <template
      v-for="col in _cols"
      :key="col.name"
      #[`header-${col.name}`]
    >
      <slot
        :name="`header-${col.name}`"
        v-bind="{ col }"
      >
        <div>
          <span>{{ col.name }}</span>
          <i
            v-show="col.sortBy === 'asc'"
            class="i-bx-up-arrow-alt"
          />
          <i
            v-show="col.sortBy === 'desc'"
            class="i-bx-down-arrow-alt"
          />
        </div>
      </slot>
    </template>

    <!-- 👉 Pagination -->
    <template #after-table>
      <div class="a-server-table-pagination flex items-center w-full">
        <ATypography
          class="a-server-table-pagination-meta"
          :subtitle="paginationMeta"
        />
        <div class="flex-grow" />
        <div class="a-server-table-per-page flex items-center">
          <span class="sm:inline hidden">per page</span>
          <ASelect
            v-model="currentPageSize"
            :options="Array.from(new Set([props.pageSize, 5, 10, 15, 20])).sort((a, b) => a - b)"
            :spacing="80"
            options-wrapper-classes="a-server-table-per-page-select--options-wrapper-classes"
          />
        </div>
        <div class="a-server-table-pagination-navigation">
          <ABtn
            class="a-server-table-paginate-previous"
            icon="i-bx-left-arrow-alt"
            icon-only
            variant="default"
            :disabled="isFirstPage"
            @click="goToPreviousPage"
          />
          <ABtn
            class="a-server-table-paginate-next"
            icon="i-bx-right-arrow-alt"
            icon-only
            variant="default"
            :disabled="isLastPage"
            @click="goToNextPage"
          />
        </div>
      </div>
    </template>

    <!-- ℹ️ Recursively pass down slots to child -->
    <template
      v-for="(_, name) in $slots"
      #[name]="slotProps"
    >
      <slot
        :name="name"
        v-bind="slotProps || {}"
      />
    </template>
  </ATable>
</template>

<script lang="ts" setup>
import { defu } from 'defu'
import type { ExtractPropTypes } from 'vue'
import type { DataTablePropColumn } from './props'
import { dataTableProps } from './props'
import { AServerTable } from '@/components'
import type { ItemsFunction } from '@/components/server-table'
import { serverTableColDefaults, serverTableProps } from '@/components/server-table'
import { getComputedCols, getSortedCols } from '@/components/table/useTable'
import { useSearch } from '@/composables/useSearch'
import type { typeSortBy } from '@/composables/useSort'
import { useSort } from '@/composables/useSort'

const props = defineProps(dataTableProps)

const emit = defineEmits<{

  // TODO: Duplicated from `ATable` because of import interface issue
  (e: 'click:header', col: Exclude<(ExtractPropTypes<typeof props>)['cols'], undefined>): void
}>()

defineOptions({
  name: 'ADataTable',
})

const _serverTableProps = reactivePick(props, Object.keys(serverTableProps).filter(k => !['rows', 'cols'].includes(k)) as Array<keyof typeof serverTableProps>)

const dataTableColDefaults: Partial<DataTablePropColumn> = defu({
  isFilterable: true,
  isSortable: true,
}, serverTableColDefaults)

// ℹ️ We must return reactive: https://github.com/vuejs/docs/issues/849#issuecomment-775057101
// Thanks: @skirtle. Discord conversation: https://discord.com/channels/325477692906536972/568037134968160256/1055173143423107142
const computedCols = getComputedCols(
  toRef(props, 'rows'),
  toRef(props, 'cols'),
)
const _cols = computed<DataTablePropColumn[]>(() => computedCols.value.map(
  colProp => reactive(defu(colProp, dataTableColDefaults)),
))

const fetchRows: ItemsFunction = ({ q, currentPage, rowsPerPage, sortedCols }) => new Promise(resolve => {
  const { results: filteredRows } = useSearch(
    q,
    props.rows,
    _cols.value.map(col => col.filterFunc
      ? { name: col.name, filterBy: col.filterFunc }
      : col.name),
  )

  const { results: sortedRows } = useSort(
    filteredRows,
    computed(() => {
      const colsSortBy: typeSortBy = []

      console.log('_cols :>> ', _cols.value)

      getSortedCols(_cols).value.forEach((col: DataTablePropColumn) => {
        if (col.sortFunc)
          colsSortBy.push({ name: col.name, sortBy: col.sortFunc })
        else if (col.sortBy !== undefined)
          colsSortBy.push({ name: col.name, isAsc: col.sortBy === 'asc' })
      })

      return colsSortBy
    }),
  )

  resolve({ rows: sortedRows.value, total: props.rows.length })
})
</script>

<template>
  <AServerTable
    v-bind="_serverTableProps"
    :rows="fetchRows"
    :cols="_cols"
  />
</template>

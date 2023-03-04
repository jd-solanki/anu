import type { ExtractPropTypes, PropType } from 'vue'
import type { PropColumn as TablePropColumn } from '@/components/table'
import { tableProps } from '@/components/table'
import { defuProps } from '@/composables/useProps'
import type { CustomFilter } from '@/composables/useSearch'
import type { CustomSort } from '@/composables/useSort'

export type SortBy = 'asc' | 'desc' | undefined

export interface DataTablePropColumn extends TablePropColumn {
  isSortable?: boolean
  sortBy?: SortBy
  isFilterable: Boolean
  filterFunc?: CustomFilter<any>
  sortFunc?: CustomSort
}

export interface ItemsFunctionParams {
  q: string
  currentPage: number
  rowsPerPage: number
  sortedCols: DataTablePropColumn[]
}

export interface ItemsFunction {
  (props: ItemsFunctionParams): Promise<{ rows: Record<string, unknown>[]; total: number }>
}

export const dataTableProps = defuProps({
  /**
   * Function that returns resolves array.
   */
  rows: {
    type: [Array, Function] as PropType<ItemsFunction | Record<string, unknown>[]>,
    required: true,
  },

  /**
   * By default table will infer the column definition from first row. You can also manually provide the column definition for more control.
   */
  cols: {
    type: [Array] as PropType<DataTablePropColumn[]>,
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
   * Enable/Disable sorting table
   */
  isSortable: {
    type: Boolean,
    default: true,
  },

  /**
   * By default you can only sort single column. You can enable sorting multiple columns at the same time using this prop.
   */
  multiSort: Boolean,

  /**
   * Set rows to show per page
   */
  pageSize: {
    type: Number,
    default: 10,
  },

  // ℹ️ Does anyone need prop initialPage?
}, tableProps)

export const dataTableColDefaults: Partial<DataTablePropColumn> = {
  isSortable: true,
  headerClasses: (col: DataTablePropColumn) => col.isSortable && 'cursor-pointer select-none',
  sortBy: undefined,
  isFilterable: true,
}

export type DataTableProps = ExtractPropTypes<typeof dataTableProps>

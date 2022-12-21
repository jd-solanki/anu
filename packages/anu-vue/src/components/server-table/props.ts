import type { PropType } from 'vue'
import type { PropColumn as TablePropColumn } from '@/components/table'

export type SortBy = 'asc' | 'desc' | undefined

export interface ServerTablePropColumn extends TablePropColumn {
  isSortable?: boolean
  sortBy?: SortBy
}

export interface ItemsFunctionParams {
  q: string
  currentPage: number
  rowsPerPage: number
  sortedCols: ServerTablePropColumn[]
}

export interface ItemsFunction {
  (props: ItemsFunctionParams): Promise<{ rows: unknown[]; total: number }>
}

export const serverTableProps = {
  /**
   * Function that returns resolves array.
   */
  rows: {
    type: Function as PropType<ItemsFunction>,
    required: true,
  },

  /**
   * By default table will infer the column definition from first row. You can also manually provide the column definition for more control.
   */
  cols: {
    type: [Array] as PropType<ServerTablePropColumn[]>,
    default: () => [],
  },

  /**
   * Enable filtering/searching in table
   */
  query: {
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
}

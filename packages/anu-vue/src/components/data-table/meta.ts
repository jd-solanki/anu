import type { ComponentObjectPropsOptions } from 'vue'
import type { ATableEvents, ATablePropColumn, ATableProps } from '@/components/table'
import { aTableProps } from '@/components/table'
import type { CustomFilter } from '@/composables/useSearch'
import type { CustomSort } from '@/composables/useSort'
import type { NoUndefined } from '@/utils/typescripts'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
export type SortBy = 'asc' | 'desc' | undefined

export interface ADataTablePropColumn extends ATablePropColumn {
  isSortable?: boolean
  sortBy?: SortBy
  isFilterable?: Boolean
  filterFunc?: CustomFilter<any>
  sortFunc?: CustomSort
}

export interface ADataTableItemsFunctionParams {
  q: string
  currentPage: number
  rowsPerPage: number
  sortedCols: ADataTablePropColumn[]
}

export interface ADataTableItemsFunction {
  (props: ADataTableItemsFunctionParams): Promise<{ rows: Record<string, unknown>[]; total: number }>
}

export interface ADataTableProps extends Omit<ATableProps, 'rows'> {

  /**
   * Function that returns resolves array.
   */
  rows: ADataTableItemsFunction | Record<string, unknown>[]

  /**
   * By default table will infer the column definition from first row. You can also manually provide the column definition for more control.
   */
  cols?: ADataTablePropColumn[]

  /**
   * Enable filtering/searching in table
   */
  search?: boolean | string

  /**
   * Enable/Disable sorting table
   */
  isSortable?: boolean

  /**
   * By default you can only sort single column. You can enable sorting multiple columns at the same time using this prop.
   */
  multiSort?: boolean

  /**
   * Set rows to show per page
   */
  pageSize?: number
}

export const aDataTableProps = ({
  ...aTableProps,
  rows: {
    type: [Array, Function] as PropType<ADataTableProps['rows']>,
    required: true,
  },
  cols: {
    type: [Array] as PropType<NoUndefined<ADataTableProps['cols']>>,
    default: () => [],
  },
  search: {
    type: [Boolean, String] as PropType<NoUndefined<ADataTableProps['search']>>,
    default: false,
  },
  isSortable: {
    type: Boolean,
    default: true,
  },
  multiSort: Boolean,
  pageSize: {
    type: Number,
    default: 10,
  },
} as const) satisfies Required<ComponentObjectPropsOptions<ADataTableProps>>

export const aDataTableColDefaults: Partial<ADataTablePropColumn> = {
  isSortable: true,
  headerClasses: (col: ADataTablePropColumn) => col.isSortable && 'cursor-pointer select-none',
  sortBy: undefined,
  isFilterable: true,
}

// 👉 Slots
export const aDataTableSlots = {}

// 👉 Events
export interface ADataTableEvents extends ATableEvents<ADataTableProps> {
  (e: 'update:search', q: string): void
}

import type { ExtractPublicPropTypes } from 'vue'
import type { ATableEvents, ATablePropColumn, RowKey } from '@/components/table'
import { aTableProps, aTableSlots } from '@/components/table'
import type { CustomFilter } from '@/composables/useSearch'
import type { CustomSort } from '@/composables/useSort'
import { omitObjKeys } from '@/utils/helpers'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
export type SortBy = 'asc' | 'desc' | undefined

export interface ADataTablePropColumn<Row extends Record<string, unknown>> extends ATablePropColumn<Row> {
  isSortable?: boolean
  sortBy?: SortBy
  isFilterable?: boolean
  filterFunc?: CustomFilter<any>
  sortFunc?: CustomSort
}

export interface ADataTableItemsFunctionParams<Row extends Record<string, unknown>> {
  q: string
  currentPage: number
  rowsPerPage: number
  sortedCols: ADataTablePropColumn<Row>[]
}

export interface ADataTableItemsFunction<Row extends Record<string, unknown>> {
  (props: ADataTableItemsFunctionParams<Row>): Promise<{ rows: Row[]; total: number }>
}

export function aDataTableProps<Row extends Record<string, unknown>>() {
  const { rows: _, ...aTableRestProps } = aTableProps<Row>()

  return {
    ...aTableRestProps,

    /**
   * Function that returns resolves array.
   */
    rows: {
      type: [Array, Function] as PropType<ADataTableItemsFunction<Row> | Row[]>,
      required: true,
    },

    /**
   * By default table will infer the column definition from first row. You can also manually provide the column definition for more control.
   */
    cols: {
      type: [Array] as PropType<ADataTablePropColumn<Row>[]>,
      default: () => [],
    },

    /**
   * Enable filtering/searching in table
   */
    search: {
      type: [Boolean, String] as PropType<boolean | string>,
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
  } as const
}
export type ADataTableProps = ExtractPublicPropTypes<ReturnType<typeof aDataTableProps>>

export function aDataTableColDefaults<Row extends Record<string, unknown>>(): Partial<ADataTablePropColumn<Row>> {
  return {
    isSortable: true,
    headerClasses: (col: ADataTablePropColumn<Row>) => col.isSortable && 'cursor-pointer select-none',
    sortBy: undefined,
    isFilterable: true,
  }
}

// 👉 Slots
export function aDataTableTableSlots<Row extends Record<string, unknown>>(colKeys: RowKey<Row>[]) {
  /*
    Slot we consumed in ADataTable and aren't forwarding:
    - after-table
    - header-right
  */
  return omitObjKeys(aTableSlots<Row>(colKeys), ['after-table', 'header-right'])
}

export const aDataTableOwnSlots = {
  'before-search': (_: any) => null as any,
  'after-search': (_: any) => null as any,
} as const

export function aDataTableSlots<Row extends Record<string, unknown>>(colKeys: RowKey<Row>[]) {
  return {
    ...aDataTableTableSlots<Row>(colKeys),
    ...aDataTableOwnSlots,
  }
}

// 👉 Events
export interface ADataTableEvents extends ATableEvents<ADataTableProps> {
  (e: 'update:search', q: string): void
}

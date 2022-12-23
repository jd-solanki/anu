import type { PropType } from 'vue'
import type { ServerTablePropColumn } from '@/components/server-table'
import { serverTableProps } from '@/components/server-table'
import { defuProps } from '@/composables/useProps'
import type { CustomFilter } from '@/composables/useSearch'
import type { CustomSort } from '@/composables/useSort'

export interface DataTablePropColumn extends ServerTablePropColumn {
  isFilterable: Boolean
  filterFunc?: CustomFilter<any>
  sortFunc?: CustomSort
}

export const dataTableProps = defuProps({
  /**
   * Function that returns resolves array.
   */
  rows: {
    type: Array as PropType<unknown[]>,
    required: true,
  },

  /**
   * By default table will infer the column definition from first row. You can also manually provide the column definition for more control.
   */
  cols: {
    type: [Array] as PropType<DataTablePropColumn[]>,
    default: () => [],
  },
}, serverTableProps)

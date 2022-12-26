import type { PropType } from 'vue'
import { spacing } from '@/composables/useProps'

export interface PropColumn {
  name: string
  classes?: any
  formatter?: (val: unknown) => unknown
  headerClasses?: any
}

export const tableProps = {
  /**
    * Table rows
    */
  rows: {
    type: Array as PropType<any[]>,
    default: () => [],
  },

  /**
   * By default table will infer the column definition from first row. You can also manually provide the column definition for more control.
   */
  cols: {
    type: [Array] as PropType<PropColumn[]>,
    default: () => [],
  },

  /**
   * Text to render when no row is available
   */
  noDataText: {
    type: String,
    default: 'No records found!',
  },

  /**
   * Component spacing
   */
  spacing,
}

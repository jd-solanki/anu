import type { ComponentObjectPropsOptions } from 'vue'
import type { NoUndefined } from './../../utils/typescripts'
import type { ACardProps } from '@/components/card'
import { aCardProps, aCardSlots } from '@/components/card'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
export interface ATablePropColumn {
  name: string
  classes?: any
  formatter?: (val: unknown) => unknown
  headerClasses?: ((col: ATablePropColumn) => any) | any
}

export interface ATableProps extends ACardProps {

  /**
    * Table rows
    */
  rows?: Record<string, unknown>[]

  /**
   * By default table will infer the column definition from first row. You can also manually provide the column definition for more control.
   */
  cols?: ATablePropColumn[]

  /**
   * Text to render when no row is available
   */
  noDataText?: string
}

export const aTableProps = ({
  ...aCardProps,
  rows: {
    type: Array as PropType<NoUndefined<ATableProps['rows']>>,
    default: () => [],
  },
  cols: {
    type: [Array] as PropType<NoUndefined<ATableProps['cols']>>,
    default: () => [],
  },
  noDataText: {
    type: String,
    default: 'No records found!',
  },
} as const) satisfies Required<ComponentObjectPropsOptions<ATableProps>>

// 👉 Slots
const { default: _, ...aTableCardSlots } = aCardSlots

export { aTableCardSlots }
export const aTableSlots = {
  ...aTableCardSlots,

  /**
   * Render content before table
   */
  'before-table': {},

  // TODO: How to get type of dynamic col?
  /**
   * Render custom header for column.
   */
  // 'header-<col>': {},

  // TODO: How to get type of dynamic col?
  /**
   * Render custom content for column cell for each row
   */
  // 'col-<col>': {},

  /**
   * Render custom content in table footer
   */
  'footer': {},

  /**
   * Render custom content after table
   */
  'after-table': {},
} as const

// 👉 Events
export interface ATableEvents<T extends Omit<ATableProps, 'rows'> = ATableProps> {
  (e: 'click:header', col: NoUndefined<T['cols']>): void
}

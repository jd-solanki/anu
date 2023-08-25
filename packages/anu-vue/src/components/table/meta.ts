import type { LiteralUnion } from 'type-fest'
import type { ExtractPublicPropTypes } from 'vue'
import type { NoUndefined } from './../../utils/typescripts'
import { aCardProps, aCardSlots } from '@/components/card'

// ℹ️ Make sure to checkout meta definition rules

export type RowKey<Row extends Record<string, unknown>> = keyof Row & string

// 👉 Props
export interface ATablePropColumn<Row extends Record<string, unknown>> {
  name: LiteralUnion<RowKey<Row>, string>
  title?: string
  classes?: any
  formatter?: (val: unknown) => unknown

  // TODO: Do we need to pass col as param?
  headerClasses?: ((col: ATablePropColumn<Row>) => any) | any
}

export function aTableProps<Row extends Record<string, unknown>>() {
  return {
    ...aCardProps,

    /**
   * Table rows
   */
    rows: {
      type: Array as PropType<Row[]>,
      default: () => [],
    },

    /**
   * By default table will infer the column definition from first row. You can also manually provide the column definition for more control.
   */
    cols: {
      type: Array as PropType<ATablePropColumn<Row>[]>,
      default: () => [],
    },

    /**
   * Text to render when no row is available
   */
    noDataText: {
      type: String,
      default: 'No records found!',
    },
  } as const
}

export type ATableProps = ExtractPublicPropTypes<ReturnType<typeof aTableProps>>

// 👉 Slots
const { default: _, ...aTableCardSlots } = aCardSlots

export { aTableCardSlots }
export function aTableSlots<Row extends Record<string, unknown>>(colKeys: RowKey<Row>[]) {
  return {
    ...aTableCardSlots,

    /**
     * Render content before table
     */
    'before-table': (_: any) => null as any,

    /**
     * Render custom header for column.
     */
    ...colKeys.reduce((a, colKey) => (
      { ...a, [`header-${colKey}`]: Function } as const
    ), {} as Readonly<Record<`header-${RowKey<Row>}`, (_: { col: ATablePropColumn<Row> }) => any>>),

    // TODO: How to get type of dynamic col?
    /**
     * Render custom content for column cell for each row
     */
    ...colKeys.reduce((a, colKey) => (
      { ...a, [`col-${colKey}`]: Function } as const
    ), {} as Readonly<Record<`col-${RowKey<Row>}`, (_: { row: Row; colIndex: number }) => any>>),

    /**
     * Render custom content in table footer
     */
    'footer': (_: any) => null as any,

    /**
     * Render custom content after table
     */
    'after-table': (_: any) => null as any,
  } as const
}

// 👉 Events
export interface ATableEvents<T extends Omit<ATableProps, 'rows'> = ATableProps> {
  (e: 'click:header', col: NoUndefined<T['cols']>): void
}

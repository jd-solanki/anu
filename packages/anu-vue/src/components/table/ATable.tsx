import { ACard, useCardProps } from '@/components/card';
import { defineComponent, PropType } from 'vue';

export const ATable = defineComponent({
  name: 'ATable',
  props: {
    ...useCardProps(),
    rows: {
      type: [Array] as PropType<object[]>,
      required: true,
    },
    columns: Array,
  },
  setup(props, { slots, emit, attrs }) {

    // const columnDefaults = () => {}

    // TODO: Handle empty row data
    const _columns = props.columns || props.rows.length ? Object.keys(props.rows[0]) : []

    return () =>
      <ACard class="overflow-auto">
        {/* TODO(refactor): Use variant group here */}
        <table class="w-full max-w-full all-[tr]-border-b all-[tr]-border-[hsla(var(--base-color),var(--border-opacity))]">
          {/* 👉 thead */}
          <thead>
            <tr>
              {_columns.map(column => <th class="px-4 h-12 text-left whitespace-nowrap">{column}</th>)}
            </tr>
          </thead>

          {/* 👉 tbody */}
          <tbody>
            {props.rows.map(row => {
              return <tr>
                {Object.entries(row).map(([columnName, columnValue]) => {
                  return <td class="px-4 h-12 whitespace-nowrap">{columnValue}</td>
                })}
              </tr>
            })}
          </tbody>
        </table>
      </ACard>
  },
})

export type ATable = InstanceType<typeof ATable>

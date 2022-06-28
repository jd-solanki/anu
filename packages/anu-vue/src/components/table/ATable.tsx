import { ACard, useCardProps } from '@/components/card';
import { defineComponent } from 'vue';

export const ATable = defineComponent({
  name: 'ATable',
  props: {
    ...useCardProps(),
    rows: {
      type: Array,
      required: true,
    },
    columns: Array,
  },
  setup(props, { slots, emit, attrs }) {

    // const columnDefaults = () => {}

    // TODO: Handle empty row data
    // const _columns = props.columns || props.rows[0]

    return () =>
      <ACard>
        <table>

        </table>
      </ACard>
  },
})

export type ATable = InstanceType<typeof ATable>

import { ACard, useCardProps } from '@/components/card';
import { AInput } from '@/components/input';
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
    search: {
      type: [Boolean, String],
      default: false,
    },
  },
  setup(props, { slots, emit, attrs }) {

    const { columns, rows, search, ...cardProps } = props

    const columnDefaults = {
      isFilterable: true
    }

    const _columns = props.columns || props.rows.length ? Object.keys(props.rows[0]).map(k => ({ name: k, ...columnDefaults })) : []


    const handleInputSearch = (e: InputEvent) => {
      console.log('event :>> ', e);
    }


    return () => {
      /*
         ℹ️ We need to assign table to const because card have default slots which render table and we also want to allow rendering
            text via default text just above the table

            Later on, we will merge both default slots and will pass as single slot content to card
      */
      {/* TODO(refactor): Use variant group here */ }
      const table = <table class="w-full max-w-full all-[tr]-border-b all-[tr]-border-[hsla(var(--base-color),var(--border-opacity))]">
        {/* 👉 thead */}
        <thead>
          <tr>
            {_columns.map(column => <th class="px-4 h-12 text-left whitespace-nowrap">{column.name}</th>)}
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

      const searchInput = () => <AInput prepend-inner-icon="i-bx-search" placeholder="search..." class="max-w-48" onInput={handleInputSearch}></AInput>

      // 💡 Here we are passing all the slots to card except default which gets overridden for merging provided default slot with table
      return <ACard class="overflow-auto" {...cardProps} v-slots={{ ...slots, default: [slots.default?.(), table], headerRight: typeof props.search === 'boolean' && props.search ? searchInput : null }} />
    }
  },
})

export type ATable = InstanceType<typeof ATable>

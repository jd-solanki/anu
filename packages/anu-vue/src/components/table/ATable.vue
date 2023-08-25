<script lang="ts" setup generic="Row extends Record<string, unknown>">
import type { ATableEvents, ATablePropColumn } from './meta'
import { aTableCardSlots, aTableProps, aTableSlots } from './meta'
import type { ACardProps } from '@/components/card'
import { aCardProps } from '@/components/card'
import { useDefaults } from '@/composables/useDefaults'
import { objectKeys } from '@/utils/typescripts'
import { filterUsedSlots } from '@/utils/vue'

// SECTION Meta
const _props = defineProps(aTableProps<Row>())

// TODO: We aren't getting type error for click:header
defineEmits<ATableEvents>()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _slots = aTableSlots<Row>(
  objectKeys(_props.rows[0] || {}),
)

// TODO: (types) Without any we get type error: https://github.com/vuejs/language-tools/issues/3141
defineSlots<any>()

defineOptions({
  name: 'ATable',
})
const { props, defaultsClass, defaultsStyle, defaultsAttrs } = useDefaults(_props)

// !SECTION

const _cardProps = reactivePick(props, Object.keys(aCardProps) as Array<keyof ACardProps>)

const _cols = computed<ATablePropColumn<Row>[]>(() => {
  // If custom cols are provided => Use them
  if (props.cols.length)
    return props.cols

  // if there's no rows => Don't generate col definition
  const firstRow = props.rows[0]
  if (!firstRow)
    return []

  // Else generate cols from first row
  return Object.keys(firstRow).map(rowObjProperty => ({ name: rowObjProperty }))
})
</script>

<template>
  <ACard
    v-bind="{ ..._cardProps, ...defaultsAttrs }"
    :style="defaultsStyle"
    class="a-table"
    :class="defaultsClass"
  >
    <slot name="before-table" />
    <div class="overflow-x-auto">
      <table class="a-table-table overflow-x-auto w-full max-w-full">
        <!-- 👉 thead -->
        <thead>
          <tr>
            <th
              v-for="(col, index) in _cols"
              :key="index"
              class="a-table-table-th whitespace-nowrap"
              :class="typeof col.headerClasses === 'function' ? col.headerClasses(col) : col.headerClasses"
              @click="$emit('click:header', col)"
            >
              <slot
                :name="`header-${col.name}`"
                v-bind="{ col }"
              >
                <span>{{ col.title ?? col.name }}</span>
              </slot>
            </th>
          </tr>
        </thead>

        <!-- 👉 tbody -->
        <tbody>
          <!-- If there's rows to render => Render them -->
          <template v-if="props.rows.length">
            <tr
              v-for="(row, rowIndex) in props.rows"
              :key="rowIndex"
            >
              <td
                v-for="(col, colIndex) in _cols"
                :key="colIndex"
                class="a-table-table-td whitespace-nowrap"
                :class="typeof col.classes === 'function' ? col.classes(row) : col.classes"
              >
                <slot
                  :name="`col-${col.name}`"
                  v-bind="{ row, colIndex }"
                >
                  <span class="a-table-td-text">{{ col.formatter ? col.formatter(row) : row[col.name] }}</span>
                </slot>
              </td>
            </tr>
          </template>

          <!-- If there's not rows to render => Show no data text -->
          <tr v-else>
            <td
              class="em:px-[1.15rem] em:h-14 whitespace-nowrap text-center font-medium"
              :colspan="props.cols.length"
            >
              {{ props.noDataText }}
            </td>
          </tr>
        </tbody>

        <tfoot
          v-if="$slots.footer"
          class="a-table-footer"
        >
          <slot name="footer" />
        </tfoot>
      </table>
    </div>
    <slot name="after-table" />

    <!-- ℹ️ Recursively pass down slots to child -->
    <template
      v-for="name in filterUsedSlots(aTableCardSlots)"
      #[name]="slotProps"
    >
      <slot
        :name="name"
        v-bind="slotProps"
      />
    </template>
  </ACard>
</template>

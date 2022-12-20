<script lang="ts" setup>
import { defu } from 'defu'
import type { ExtractPropTypes } from 'vue'
import type { PropColumn } from './props'
import { tableProps } from './props'
import { useSpacing } from '@/composables/useSpacing'
import { ACard, cardProps } from '@/components/card'

const props = defineProps(defu(tableProps, cardProps))

// TODO: We aren't getting type error for click:header
const emit = defineEmits<{
  (e: 'click:header', column: Exclude<(ExtractPropTypes<typeof props>)['cols'], undefined>): void
}>()

defineOptions({
  name: 'ATable',
})

// TODO: What about spacing? Table & Card both support spacing 🤔
const _cardProps = reactivePick(props, Object.keys(cardProps) as Array<keyof typeof cardProps>)

const spacing = useSpacing(toRef(props, 'spacing'))

const _cols = computed<PropColumn[]>(() => {
  // If custom cols are provided => Use them
  if (props.cols.length)
    return props.cols

  // if there's no rows => Don't generate col definition
  if (!props.rows.length)
    return []

  // Else generate cols from first row
  return Object.keys(props.rows[0]).map(rowObjProperty => ({ name: rowObjProperty }))
})
</script>

<template>
  <ACard
    v-bind="_cardProps"
    class="a-table"
    :style="{ '--a-spacing': spacing / 100 }"
  >
    <div class="overflow-x-auto">
      <table class="a-table-table overflow-x-auto w-full max-w-full">
        <!-- 👉 thead -->
        <thead>
          <tr>
            <th
              v-for="(col, index) in _cols"
              :key="index"
              class="a-table-table-th whitespace-nowrap"
              @click="$emit('click:header', col)"
            >
              <slot
                :name="`header-${col.name}`"
                v-bind="{ col }"
              >
                <span>{{ col.name }}</span>
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
            <span
              class="a-table-no-data-text"
            >{{ props.noDataText }}</span>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ℹ️ Recursively pass down slots to child -->
    <template
      v-for="(_, name) in $slots"
      #[name]="slotProps"
    >
      <!-- ℹ️ v-if condition will omit passing slots. Here, we don't want to pass default slot. -->
      <slot
        v-if="name !== 'default'"
        :name="name"
        v-bind="slotProps || {}"
      />
    </template>
  </ACard>
</template>

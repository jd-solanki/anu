<script lang="ts" setup>
import type { Placement } from '@floating-ui/vue'
import { useCycleList } from '@vueuse/core'

const placementOptions: Placement[] = [
  'top',
  'top-start',
  'top-end',
  'right',
  'right-start',
  'right-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
]

const { state: tooltipPlacement, next: selectNext } = useCycleList(placementOptions)
</script>

<template>
  <div class="flex items-center flex-wrap gap-4 mb-38">
    <ABtn>
      <ATooltip
        :model-value="true"
        :placement="tooltipPlacement"
        text="Cotton candy"
      />
      Button
    </ABtn>

    <!-- 👉 Options -->
    <ASelect
      v-model="tooltipPlacement"
      :options="placementOptions"
      class="w-24 grow-0 ms-auto"
    />
    <ABtn
      variant="text"
      @click="selectNext"
    >
      Next
    </ABtn>
  </div>
</template>

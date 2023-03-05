<script lang="ts" setup>
import { ref } from 'vue'

const tooltipPlacement = ref('bottom')

const placementOptions = [
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

const selectNext = () => {
  const index = placementOptions.findIndex(o => o === tooltipPlacement.value)

  const nextIndex = (index === placementOptions.length - 1) ? 0 : index + 1

  tooltipPlacement.value = placementOptions[nextIndex] as string
}
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

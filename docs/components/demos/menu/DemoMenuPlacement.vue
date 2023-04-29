<script lang="ts" setup>
import type { Placement } from '@floating-ui/vue'
import { useCycleList } from '@vueuse/core'

const items = [
  { text: 'Donut jujubes' },
  { text: 'Sesame snaps' },
  { text: 'I love jelly' },
  { text: 'Cake gummi', disabled: true },
]

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
const { state: menuPlacement, next: selectNext } = useCycleList(placementOptions)
</script>

<template>
  <div class="flex items-center flex-wrap gap-4 mb-38">
    <ABtn>
      <AMenu
        :model-value="true"
        :placement="menuPlacement"
      >
        <AList :items="items" />
      </AMenu>
      Open Menu
    </ABtn>

    <!-- 👉 Options -->
    <ASelect
      v-model="menuPlacement"
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

<script lang="ts" setup>
import { ref } from 'vue'

const items = [
  { text: 'Donut jujubes' },
  { text: 'Sesame snaps' },
  { text: 'I love jelly' },
  { text: 'Cake gummi', disable: true },
]

const menuPlacement = ref('bottom-start')

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
  const index = placementOptions.findIndex(o => o === menuPlacement.value)

  const nextIndex = (index === placementOptions.length - 1) ? 0 : index + 1

  menuPlacement.value = placementOptions[nextIndex]
}
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

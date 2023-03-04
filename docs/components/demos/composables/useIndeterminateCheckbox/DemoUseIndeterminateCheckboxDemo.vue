<script setup lang="ts">
import { useIndeterminateCheckbox } from 'anu-vue'
import { ref } from 'vue'

const options = [
  'Apple',
  'Banana',
  'Watermelon',
]

const fruits = ref<string[]>([])
const { vModel } = useIndeterminateCheckbox(fruits, options)
</script>

<template>
  <div class="grid gap-y-3">
    <ACheckbox
      disabled
      :model-value="null"
    >
      Vegetables
    </ACheckbox>

    <ACheckbox v-model="vModel">
      Fruits
    </ACheckbox>

    <ACheckbox
      v-for="item of options"
      :key="item"
      v-model="fruits"
      :value="item"
      class="ms-7"
    >
      {{ item }}
    </ACheckbox>
  </div>
</template>

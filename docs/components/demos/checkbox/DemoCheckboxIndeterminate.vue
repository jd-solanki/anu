<script setup lang="ts">
import { computed, ref } from 'vue'

const items = [
  'Apple',
  'Banana',
  'Watermelon',
]

const fruits = ref<Array<String>>([])
const value = computed({
  get() {
    return fruits.value.length > items.length - 1
  },
  set(val) {
    fruits.value = val ? items : []
  },
})
</script>

<template>
  <div class="grid gap-y-3">
    <ACheckbox
      disabled
      indeterminate
    >
      Vegetables
    </ACheckbox>

    <ACheckbox
      v-model="value"
      :indeterminate="!!fruits.length && fruits.length < items.length"
    >
      Fruits
    </ACheckbox>

    <ACheckbox
      v-for="item of items"
      :key="item"
      v-model="fruits"
      :value="item"
      class="ms-7"
    >
      {{ item }}
    </ACheckbox>
  </div>
</template>

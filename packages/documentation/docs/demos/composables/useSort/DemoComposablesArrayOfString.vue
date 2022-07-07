<script lang="ts" setup>
import { useSort } from 'anu-vue'
import { ref } from 'vue'

const fruits = ref(['banana', 'apple', 'watermelon', 'orange'])
const { results } = useSort(fruits)

const toggleMango = () => {
  const mangoIndex = fruits.value.findIndex(f => f === 'mango')
  if (mangoIndex < 0)
    fruits.value.push('mango')
  else fruits.value.splice(mangoIndex, 1)
}
</script>

<template>
  <ABtn @click="toggleMango">
    Toggle Mango
  </ABtn>
  <p>Original: {{ fruits }}</p>
  <p>Sorted: {{ results }}</p>
</template>

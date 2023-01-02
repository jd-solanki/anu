<script lang="ts" setup>
import { useSort } from 'anu-vue'
import { ref } from 'vue'

const isAsc = ref(false)

const fruits = ref(['banana', 'apple', 'watermelon', 'orange'])

// Filter by is not required for array of string so we are passing undefined
const { results } = useSort(fruits, undefined, isAsc)

const toggleMango = () => {
  const mangoIndex = fruits.value.findIndex(f => f === 'mango')
  if (mangoIndex < 0)
    fruits.value.push('mango')
  else fruits.value.splice(mangoIndex, 1)
}
</script>

<template>
  <div class="flex gap-4">
    <ABtn @click="toggleMango">
      Toggle Mango
    </ABtn>
    <ABtn @click="isAsc = !isAsc">
      Toggle Asc ({{ isAsc }})
    </ABtn>
  </div>
  <br>
  <p>Original: {{ fruits }}</p>
  <br>
  <p>Sorted: {{ results }}</p>
</template>

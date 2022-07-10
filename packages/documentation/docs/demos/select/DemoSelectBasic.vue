<script setup lang="ts">
import { ref } from 'vue'

// Fruits
const selectedFruit = ref()
const fruits = ['banana', 'apple', 'watermelon', 'orange']

// Framework
const selectedFramework = ref()
const frameworks = [
  { label: 'VueJS', value: 'vue' },
  { label: 'ReactJS', value: 'react' },
  { label: 'AngularJS', value: 'angular' },
  { label: 'SolidJS', value: 'solid' },
  { label: 'AlpineJS', value: 'alpine' },
]
</script>

<template>
  <div class="grid-row grid-cols-2 justify-items-stretch">
    <ASelect
      v-model="selectedFruit"
      :options="fruits"
      :hint="`value: ${selectedFruit}`"
    />
    <ASelect
      v-model="selectedFramework"
      :options="frameworks"
      :hint="`value: ${JSON.stringify(selectedFramework)}`"
    />
  </div>
</template>

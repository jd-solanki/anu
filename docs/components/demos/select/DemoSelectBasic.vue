<script setup lang="ts">
import { ref } from 'vue'

// Fruit
const selectedFruit = ref()
const fruits = ['banana', 'apple', 'watermelon', 'orange']

// Framework
const selectedFramework = ref()
const frameworks = [
  { text: 'VueJS', value: 'vue' },
  { text: 'ReactJS', value: 'react' },
  { text: 'AngularJS', value: 'angular' },
  { text: 'SolidJS', value: 'solid' },
  { text: 'AlpineJS', value: 'alpine' },
]
</script>

<template>
  <div class="grid-row sm:grid-cols-2 justify-items-stretch">
    <!-- Fruits -->
    <ASelect
      v-model="selectedFruit"
      :options="fruits"
      :hint="`value: ${selectedFruit}`"
    />

    <!-- Framework -->
    <ASelect
      v-model="selectedFramework"
      :options="frameworks"
      :hint="`value: ${JSON.stringify(selectedFramework)}`"
    />
  </div>
</template>

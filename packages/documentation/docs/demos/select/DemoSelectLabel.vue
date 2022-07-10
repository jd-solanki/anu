<script setup lang="ts">
import { ref } from 'vue'

const selected = ref()
const fruits = ['banana', 'apple', 'watermelon', 'orange']
</script>

<template>
  <ASelect
    v-model="selected"
    label="Favorite Fruit"
    :options="fruits"
  />
</template>

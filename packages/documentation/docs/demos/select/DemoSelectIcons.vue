<script setup lang="ts">
import { ref } from 'vue'

const selected = ref()
const fruits = ['banana', 'apple', 'watermelon', 'orange']
</script>

<template>
  <div class="grid-row sm:grid-cols-2 justify-items-stretch">
    <ASelect
      v-model="selected"
      prepend-inner-icon="i-bx-heart"
      :options="fruits"
    />
    <ASelect
      v-model="selected"
      append-inner-icon="i-bx-chevrons-down"
      :options="fruits"
    />
  </div>
</template>

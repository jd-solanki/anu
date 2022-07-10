<script setup lang="ts">
import { ref } from 'vue'

const selected = ref()
const fruits = ['banana', 'apple', 'watermelon', 'orange']
</script>

<template>
  <div class="grid grid-cols-2 gap-6">
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

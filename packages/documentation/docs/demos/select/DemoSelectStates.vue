<script setup lang="ts">
import { ref } from 'vue'

const selected = ref('banana')
const fruits = ['banana', 'apple', 'watermelon', 'orange']
</script>

<template>
  <div class="grid grid-cols-2 gap-6">
    <ASelect
      v-model="selected"
      disabled
      :hint="`value: ${selected}`"
      :options="fruits"
    />
    <ASelect
      v-model="selected"
      readonly
      :hint="`value: ${selected}`"
      :options="fruits"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selected = ref('banana')
const fruits = ['banana', 'apple', 'watermelon', 'orange']
</script>

<template>
  <div class="grid-row sm:grid-cols-2 justify-items-stretch">
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

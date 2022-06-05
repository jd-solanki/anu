<script setup lang="ts">
import { ref } from 'vue'
const name = ref('JD Solanki')
</script>

<template>
  <div class="grid grid-cols-2 gap-6">
    <AInput
      v-model="name"
      disabled
      label="Disabled"
    />
    <AInput
      v-model="name"
      readonly
      label="Readonly"
    />
  </div>
</template>

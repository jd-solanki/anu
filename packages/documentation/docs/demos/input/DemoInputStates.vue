<script setup lang="ts">
import { ref } from 'vue'
const name = ref('JD Solanki')
</script>

<template>
  <div class="grid-row sm:grid-cols-2 place-items-stretch">
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

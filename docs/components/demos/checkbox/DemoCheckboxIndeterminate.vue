<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<boolean | null>(null)
</script>

<template>
  <div class="grid gap-y-3">
    <ACheckbox
      v-model="value"
      cycle-indeterminate
    >
      {{ String(value) }}
    </ACheckbox>
  </div>
</template>

<script setup lang="ts">
const variants = ['fill', 'outline'] as const
const colors = ['primary', 'success', 'info', 'warning', 'danger'] as const
</script>

<template>
  <div
    v-for="variant in variants"
    :key="variant"
    class="flex flex-wrap gap-2 mb-4"
  >
    <AChip
      v-for="color in colors"
      :key="color"
      :color="color"
      :variant="variant"
    >
      {{ color }}
    </AChip>
  </div>
</template>

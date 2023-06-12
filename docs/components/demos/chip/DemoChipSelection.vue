<script lang="ts" setup>
import { useSelection } from 'anu-vue'

const { options, select, value } = useSelection({
  items: [
    'VueJS',
    'Pinia',
    'Vue Router',
    'Vitest',
    'VueUse',
  ],
  multi: true,
})
</script>

<template>
  <div class="flex mb-4 gap-2">
    <AChip
      v-for="option in options"
      :key="option.value"
      :variant="option.isSelected ? 'fill' : 'light'"
      @click="select(option.value)"
    >
      {{ option.value }}
    </AChip>
  </div>
</template>

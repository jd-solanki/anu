<script lang="ts" setup>
import { useGroupModel } from 'anu-vue'

const { options, select } = useGroupModel({
  options: [
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

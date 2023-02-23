<script lang="ts" setup>
import { useGroupModel } from 'anu-vue'
const { options, select, selected } = useGroupModel({
  options: 3,
})
</script>

<template>
  <div class="flex flex-wrap gap-8 mb-4">
    <ABtn
      v-for="option in options"
      :key="option.value"
      :variant="option.isSelected ? 'fill' : 'light'"
      @click="select(option.value)"
    >
      Index: {{ option.value }}
    </ABtn>
  </div>
  <small>Selected: {{ String(selected) }}</small>
</template>

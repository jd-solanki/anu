<script setup lang="ts">
import { useSelection } from 'anu-vue'

const { options, select, value } = useSelection({
  items: ['apple', 'banana', 'orange', 'watermelon'],
  initialValue: 'banana', // [!code hl]
})
</script>

<template>
  <div>
    <div class="flex flex-wrap gap-6 mb-4">
      <ABtn
        v-for="option in options"
        :key="option.value"
        :variant="option.isSelected ? 'fill' : 'light'"
        @click="select(option.value)"
      >
        {{ option.value }}
      </ABtn>
    </div>
    <small class="block">Selected: {{ value }}</small>
  </div>
</template>

<script setup lang="ts">
import { useGroupModel } from 'anu-vue'

const { options, select, value } = useGroupModel<string>({
  options: ['banana', 'apple', 'watermelon', 'orange'],
})
</script>

<template>
  <div>
    <div class="flex gap-6 mb-4">
      <ABtn
        v-for="option in options"
        :key="option.value"
        :variant="option.isSelected ? 'fill' : 'light'"
        @click="select(option.value)"
      >
        {{ option.value }}
      </ABtn>
    </div>
    <small>Selected: {{ value ? value : 'Nothing is selected' }}</small>
  </div>
</template>

<script setup lang="ts">
import { useGroupModel } from 'anu-vue'
import { ref } from 'vue'

const isMultiEnabled = ref(false)
const { options, select, selected } = useGroupModel({
  options: ['apple', 'banana', 'orange', 'watermelon'],
  multi: isMultiEnabled,
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
    <ACheckbox
      v-model="isMultiEnabled"
      label="Multiple Selection"
      class="mb-3"
    />
    <small class="block">Selected: {{
      isMultiEnabled
        ? selected ? [...selected].join(', ') : String(selected)
        : String(selected)
    }}</small>
  </div>
</template>

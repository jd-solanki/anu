<script lang="ts" setup>
import { useSelection } from 'anu-vue'

const { options, select, value } = useSelection({
  items: [
    { title: 'Home', icon: 'i-bx-home' },
    { title: 'Categories', icon: 'i-bx-category' },
    { title: 'Cart', icon: 'i-bx-basket' },
    { title: 'Profile', icon: 'i-bx-user-circle' },
  ],
})
</script>

<template>
  <div class="flex flex-wrap gap-6 mb-4">
    <div
      v-for="option in options"
      :key="option.value.title"
      class="flex flex-col gap-1 items-center cursor-pointer"
      :class="option.isSelected && 'text-primary'"
      @click="select(option.value)"
    >
      <i
        :class="option.value.icon"
        class="text-lg"
      />
      <span>{{ option.value.title }}</span>
    </div>
  </div>
  <small>Selected: {{ JSON.stringify(value) }}</small>
</template>

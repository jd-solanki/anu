<script lang="ts" setup>
/*eslint-disable */
import { useGroupModel } from 'anu-vue'

const { options, select, value } = useGroupModel({
  options: [
    { title: 'User', icon: 'i-bx-user' },
    { title: 'Charging', icon: 'i-bx-bxs-battery-charging' },
    { title: 'Options', icon: 'i-bx-wrench' },
    { title: 'Traffic', icon: 'i-bx-car' },
    { title: 'Remove', icon: 'i-bx-trash' },
  ],
})
</script>

<template>
<div class="flex mb-4 gap-2">
  <AChip
    v-for="option in options"
    :key="option.value.title"
    :icon="option.value.icon"
    @click="select(option.value)"
    :variant="value === option.value ? 'fill' : 'light'"
  >
    {{ option.value.title }}
  </AChip>
</div>
</template>

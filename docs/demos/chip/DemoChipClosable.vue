<script setup lang="ts">
import { computed, ref } from 'vue'

const chips = ref([
  { title: 'Primary', color: 'primary', isOpen: true },
  { title: 'Success', color: 'success', isOpen: true },
  { title: 'Info', color: 'info', isOpen: true },
  { title: 'Warning', color: 'warning', isOpen: true },
  { title: 'Danger', color: 'danger', isOpen: true },
])

const allChipsClosed = computed(() => chips.value.every(chip => !chip.isOpen))
const reset = () => chips.value.forEach(chip => chip.isOpen = true)
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <AChip
      v-for="chip in chips"
      :key="chip.title"
      v-model="chip.isOpen"
      :color="chip.color"
      closable
    >
      {{ chip.title }}
    </AChip>

    <div class="w-full">
      <ABtn
        v-if="allChipsClosed"
        @click="reset"
      >
        Reset Chips
      </ABtn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defaultThemeColors } from 'anu-vue'
import { computed, ref } from 'vue'

const chips = ref(defaultThemeColors.map(c => ({
  color: c,
  isClosed: false,
})))

const allChipsClosed = computed(() => chips.value.every(chip => !chip.isClosed))
const reset = () => chips.value.forEach(chip => chip.isClosed = true)
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <AChip
      v-for="chip in chips"
      :key="chip.color"
      v-model="chip.isClosed"
      :color="chip.color"
      closable
      class="capitalize"
    >
      {{ chip.color }}
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

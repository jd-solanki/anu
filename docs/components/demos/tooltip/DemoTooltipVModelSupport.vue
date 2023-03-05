<script lang="ts" setup>
import { ref } from 'vue'

const isTooltipVisible = ref(false)
</script>

<template>
  <div class="flex flex-wrap gap-12">
    <ABtn>
      <ATooltip
        v-model="isTooltipVisible"
        text="Cotton candy"
      />

      Button
    </ABtn>

    <div class="flex flex-wrap gap-4">
      <ABtn
        variant="light"
        @click="isTooltipVisible = true"
      >
        Show tooltip
      </ABtn>
      <ABtn
        variant="light"
        @click="isTooltipVisible = false"
      >
        Hide tooltip
      </ABtn>
    </div>
  </div>
</template>

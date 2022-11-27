<script setup lang="ts">
import { ref } from 'vue'

const isLightOn = ref(true)
</script>

<template>
  <div class="h-8">
    <AChip
      :icon="isLightOn ? 'i-bx-bxs-moon' : 'i-bx-bxs-sun'"
      :variant="isLightOn ? 'outline' : 'fill'"
      :color="isLightOn ? 'primary' : 'warning'"
      @click="isLightOn = !isLightOn"
    >
      {{ isLightOn ? 'Turn off light' : 'Turn on light' }}
    </AChip>
  </div>
</template>

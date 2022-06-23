<script setup lang="ts">
import { ref } from 'vue'

const isVisible = ref(true)
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <AAlert v-model="isVisible">
      <span>Fruitcake I love liquorice apple pie croissant.</span>
    </AAlert>

    <ABtn @click="isVisible = !isVisible">
      Toggle visibility
    </ABtn>
  </div>
</template>

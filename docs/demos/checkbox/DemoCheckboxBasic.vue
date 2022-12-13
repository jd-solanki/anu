<script lang="ts" setup>
import { ref } from 'vue'

const isAgreed = ref(false)
</script>

<template>
  <div class="flex flex-col mt-6">
    <ACheckbox v-model="isAgreed">
      I am agreed to terms and conditions
    </ACheckbox>
    <small class="mt-2">value: {{ isAgreed }}</small>
  </div>
</template>

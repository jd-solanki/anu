<script setup>
import { ref } from 'vue'
const showCode = ref(false)
</script>

<template>
  <slot />

  <div
    class="flex items-center justify-end mt-6 text-gray-300 dark:text-gray-600"
    :class="{ '!text-primary': showCode }"
  >
    <div
      class="i-bx-code cursor-pointer"
      @click="showCode = !showCode"
    />
  </div>

  <div
    v-show="showCode"
    class="mt-2"
  >
    <slot name="code" />
  </div>
</template>

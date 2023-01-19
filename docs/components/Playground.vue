<script lang="ts" setup>
import { ref } from 'vue'
const loading = ref(false)
</script>

<template>
  <div class="flex gap-4 items-center">
    <ABtn
      color="red"
      variant="light"
      icon-only
      icon="i-bx-home"
      v-bind="{ loading }"
      class="text-xl"
      @click="loading = !loading"
    />
    <ABtn
      icon="i-bx-home"
      v-bind="{ loading }"
      @click="loading = !loading"
    >
      button
    </ABtn>
  </div>
</template>

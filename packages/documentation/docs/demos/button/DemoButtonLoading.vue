<script setup lang="ts">
import { useTimeoutFn } from '@vueuse/core'

const { start, isPending } = useTimeoutFn(
  () => {}, 2000, { immediate: false },
)
</script>

<template>
  <ABtn
    :loading="isPending"
    icon="i-bx-send"
    @click="start()"
  >
    <span>Send</span>
  </ABtn>
</template>

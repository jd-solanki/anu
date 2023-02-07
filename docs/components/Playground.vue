<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(false)
</script>

<template>
  <ABtn @click="loading = !loading">
    <ALoadingIcon
      icon="i-bx-cloud-upload"
      :loading="loading"
    />
    Button
  </ABtn>
</template>

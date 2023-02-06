<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(false)
</script>

<template>
  <ABtn @click="loading = !loading">
    Loading in full page mode
  </ABtn>

  <ALoader
    :loading="loading"
    full-page
    title="Full page loading"
    subtitle="Click anywhere to stop loading"
    class="text-4xl"
    @click="loading = false"
  />
</template>

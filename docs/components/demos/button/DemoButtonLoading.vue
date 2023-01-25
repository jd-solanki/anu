<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(false)
</script>

<template>
  <div class="flex flex-wrap gap-6">
    <ABtn
      :loading="loading"
      color="danger"
      @click="loading = !loading"
    >
      Click to load
    </ABtn>
    <ABtn
      :loading="loading"
      variant="outline"
      @click="loading = !loading"
    >
      Click to load
    </ABtn>
    <ABtn
      :loading="loading"
      color="success"
      variant="light"
      @click="loading = !loading"
    >
      Click to load
    </ABtn>
    <ABtn
      :loading="loading"
      class="flex-1"
      @click="loading = !loading"
    >
      Click to load
    </ABtn>
    <ABtn
      :loading="loading"
      icon="i-bx-wink-smile"
      @click="loading = !loading"
    >
      Loading icon button
    </ABtn>

    <ABtn
      :loading="loading"
      color="info"
      variant="light"
      class="text-2xl"
      icon-only
      icon="i-bx-dollar-circle"
      @click="loading = !loading"
    />
  </div>
</template>

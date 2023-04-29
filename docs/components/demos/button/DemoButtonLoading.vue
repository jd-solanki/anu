<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(false)
const loadingIcon = ref(false)
const iconOnlyLoading = ref(false)
</script>

<template>
  <div class="flex gap-4">
    <ABtn
      :loading="loading"
      @click="loading = !loading"
    >
      Click to load
    </ABtn>
    <ABtn @click="iconOnlyLoading = !iconOnlyLoading">
      <ALoadingIcon
        icon="i-bx-cloud-upload"
        :loading="iconOnlyLoading"
      />
      <span>Upload</span>
    </ABtn>
    <ABtn
      :loading="loadingIcon"
      icon-only
      icon="i-bx-heart"
      @click="loadingIcon = !loadingIcon"
    />
  </div>
</template>

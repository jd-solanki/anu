<script lang="ts" setup>
import { ref } from 'vue'

const val = ref('')
const loading = ref(false)
</script>

<template>
  <AInput
    v-model="val"
    class="w-300px m-4"
    @input="loading = !loading"
  >
    <template #prepend-inner>
      <ALoadingIcon
        icon="i-bx-search"
        :loading="loading"
      />
    </template>
  </AInput>
</template>

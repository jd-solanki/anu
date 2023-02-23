<script lang="ts" setup>
import { useDebounceFn, useTimeout } from '@vueuse/core'
import { ref } from 'vue'

const { ready: btnLoaded, start: startBtnLoading } = useTimeout(1500, { controls: true })

const q = ref('')
const { ready: inputLoaded, start: startInputLoading } = useTimeout(1000, { controls: true })
const debouncedStartInputLoading = useDebounceFn(startInputLoading, 500)
</script>

<template>
  <div class="grid-row gap-4 grid-flow-row">
    <!-- 👉 Button -->
    <ABtn @click="startBtnLoading">
      <ALoadingIcon
        icon="i-bx-cloud-upload"
        :loading="!btnLoaded"
      />
      <span>Upload</span>
    </ABtn>

    <!-- 👉 Input -->
    <AInput
      v-model="q"
      @input="debouncedStartInputLoading"
    >
      <template #prepend-inner>
        <ALoadingIcon
          icon="i-bx-search"
          :loading="!inputLoaded"
        />
      </template>
    </AInput>
  </div>
</template>

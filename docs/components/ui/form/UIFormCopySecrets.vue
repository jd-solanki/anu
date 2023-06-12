<script lang="ts" setup>
import { useClipboard } from '@vueuse/core'
import { ref } from 'vue'

// Fetch secret from API
const mySecret = ref('7PDyLiPNRu58nhJe2DxK')

const { copy, copied } = useClipboard({ source: mySecret })
</script>

<template>
  <!-- ℹ️ Secret shouldn't be directly editable. Hence, we aren't using v-model. -->
  <AInput
    type="password"
    readonly
    :model-value="mySecret"
  >
    <template #append-inner>
      <div
        class="flex items-center gap-x-2 pointer-events-auto"
        :class="copied ? '' : 'cursor-pointer'"
        @click.stop="copy(mySecret)"
      >
        <i :class="copied ? 'i-bx-check' : 'i-bx-clipboard'" />
      </div>
    </template>
  </AInput>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isIndeterminate = ref(true)
</script>

<template>
  <div class="grid-row">
    <ACheckbox
      :indeterminate="isIndeterminate"
      :model-value="true"
    >
      I have read the documentation
    </ACheckbox>

    <ABtn
      @click="isIndeterminate = !isIndeterminate"
    >
      Toggle indeterminate
    </ABtn>
  </div>
</template>

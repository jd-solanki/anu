<script lang="ts" setup>
import { ref } from 'vue'

const documentation = ref()
const gifts = ref()
</script>

<template>
  <div class="grid grid-rows-2 gap-y-3">
    <ACheckbox
      v-model="documentation"
      icon="i-bx-x"
    >
      I have read the documentation
    </ACheckbox>

    <ACheckbox
      v-model="gifts"
      icon="i-bx-check-double"
    >
      Yes, send me gifts
    </ACheckbox>
  </div>
</template>

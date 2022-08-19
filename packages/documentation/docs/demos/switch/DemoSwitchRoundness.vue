<script lang="ts" setup>
import { ref } from 'vue'

const md = ref(true)
const full = ref(true)
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <ASwitch
      v-model="md"
      class="rounded-md"
    />
    <ASwitch
      v-model="full"
      class="rounded-full"
    />
  </div>
</template>

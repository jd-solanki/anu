<script lang="ts" setup>
import { ref } from 'vue'

const xs = ref(false)
const sm = ref(false)
const base = ref(false)
const lg = ref(false)
const xl = ref(false)
const xxl = ref(false)
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <ASwitch
      v-model="xs"
      class="text-xs"
    />
    <ASwitch
      v-model="sm"
      class="text-sm"
    />
    <ASwitch v-model="base" />
    <ASwitch
      v-model="lg"
      class="text-lg"
    />
    <ASwitch
      v-model="xl"
      class="text-xl"
    />
    <ASwitch
      v-model="xxl"
      class="text-2xl"
    />
  </div>
</template>

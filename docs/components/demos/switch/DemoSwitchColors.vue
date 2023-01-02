<script lang="ts" setup>
import { ref } from 'vue'

const primary = ref(true)
const success = ref(true)
const info = ref(true)
const warning = ref(true)
const danger = ref(true)
</script>

<template>
  <div class="flex flex-wrap gap-6">
    <ASwitch
      v-model="primary"
      color="primary"
    />
    <ASwitch
      v-model="success"
      color="success"
    />
    <ASwitch
      v-model="info"
      color="info"
    />
    <ASwitch
      v-model="warning"
      color="warning"
    />
    <ASwitch
      v-model="danger"
      color="danger"
    />
  </div>
</template>

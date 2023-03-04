<script lang="ts" setup>
import { ref } from 'vue'

const status = ref('enabled')
</script>

<template>
  <div class="grid-row">
    <ASwitch
      v-model="status"
      on-value="enabled"
      off-value="disabled"
    />
    <span>Status: "{{ status }}"</span>
  </div>
</template>

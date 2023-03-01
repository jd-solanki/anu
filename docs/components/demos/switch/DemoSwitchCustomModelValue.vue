<script lang="ts" setup>
import { ref } from 'vue'

const status = ref('enabled')
const onValue = ref('enabled')
const offValue = ref('disabled')
</script>

<template>
  <div class="grid-row">
    <ASwitch
      v-model="status"
      :on-value="onValue"
      :off-value="offValue"
    />
    <span>Status: "{{ status }}"</span>
  </div>
</template>

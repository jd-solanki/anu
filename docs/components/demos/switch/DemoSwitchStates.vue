<script lang="ts" setup>
import { ref } from 'vue'

const on = ref(true)
const off = ref(false)
const onDisable = ref(true)
const offDisable = ref(false)
</script>

<template>
  <div class="grid-row place-items-stretch">
    <ASwitch
      v-model="on"
      :label="on ? 'On' : 'Off'"
    />
    <ASwitch
      v-model="off"
      :label="off ? 'On' : 'Off'"
    />
    <ASwitch
      v-model="onDisable"
      label="On Disable"
      disabled
    />
    <ASwitch
      v-model="offDisable"
      label="Off Disable"
      disabled
    />
  </div>
</template>

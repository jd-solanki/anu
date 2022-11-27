<script lang="ts" setup>
import { ref } from 'vue'

const notifications = ref(true)
const value = ref(true)
const volume = ref(true)
const isMicOff = ref(false)
const threat = ref(false)
</script>

<template>
  <div class="flex flex-wrap gap-6">
    <ASwitch
      v-model="notifications"
      on-icon="i-bx-bell"
      off-icon="i-bx-bell-off"
    />
    <ASwitch
      v-model="value"
      on-icon="i-bx-check"
      off-icon="i-bx-x"
      color="success"
    />
    <ASwitch
      v-model="volume"
      on-icon="i-bx-volume-full"
      off-icon="i-bx-volume-mute"
      color="info"
    />
    <ASwitch
      v-model="isMicOff"
      on-icon="i-bx-microphone-off"
      off-icon="i-bx-microphone"
      color="warning"
    />
    <ASwitch
      v-model="threat"
      on-icon="i-bx-bug"
      off-icon="i-bx-check-shield"
      color="danger"
    />
  </div>
</template>

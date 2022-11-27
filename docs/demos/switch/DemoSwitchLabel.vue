<script lang="ts" setup>
import { ref } from 'vue'

const emailNotifications = ref(false)
const pushNotifications = ref(false)
const mobileNotifications = ref(false)
</script>

<template>
  <div class="grid-row place-items-stretch">
    <ASwitch
      v-model="emailNotifications"
      label="Email notifications"
    />
    <ASwitch
      v-model="pushNotifications"
      label="Push notifications"
    />
    <ASwitch
      v-model="mobileNotifications"
      label="Mobile notifications"
    />
  </div>
</template>

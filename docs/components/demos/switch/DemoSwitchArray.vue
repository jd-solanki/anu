<script lang="ts" setup>
import { ref } from 'vue'

const enabledNotifications = ref([])
</script>

<template>
  <div class="grid-row place-items-stretch">
    <ASwitch
      v-model="enabledNotifications"
      value="accountActivity"
      label="accountActivity"
    />
    <ASwitch
      v-model="enabledNotifications"
      value="comment"
      label="comment"
    />
    <ASwitch
      v-model="enabledNotifications"
      value="like"
      label="like"
    />
    <ASwitch
      v-model="enabledNotifications"
      value="mention"
      label="mention"
    />
    <ASwitch
      v-model="enabledNotifications"
      value="follow"
      label="follow"
    />

    <p>Enabled Notifications: {{ enabledNotifications }}</p>
  </div>
</template>

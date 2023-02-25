<script lang="ts" setup>
import { ref } from 'vue'

const on = ref('100')
const onValue = ref('100')
const offValue = ref('0')
</script>

<template>
  <div class="grid-row">
    <ASwitch
      v-model="on"
      :active-value="onValue"
      :inactive-value="offValue"
    />
  </div>
</template>

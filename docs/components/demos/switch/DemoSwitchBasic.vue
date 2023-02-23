<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(false)
</script>

<template>
  <ASwitch v-model="value" />
</template>

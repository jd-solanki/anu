<script setup lang="ts">
import { ref } from 'vue'

const isDrawerShown = ref(false)
</script>

<template>
  <ADrawer
    v-model="isDrawerShown"
    title="Drawer title"
    subtitle="Chocolate cake tiramisu donut"
  />

  <ABtn @click="isDrawerShown = true">
    Show drawer
  </ABtn>
</template>

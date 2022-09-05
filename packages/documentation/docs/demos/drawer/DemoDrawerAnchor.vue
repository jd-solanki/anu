<script setup lang="ts">
import { ref } from 'vue'

const isDrawerLeftShown = ref(false)
const isDrawerRightShown = ref(false)
</script>

<template>
  <ABtn
    class="mr-4"
    @click="isDrawerLeftShown = true"
  >
    Left
  </ABtn>
  <ABtn @click="isDrawerRightShown = true">
    Right
  </ABtn>

  <!-- 👉 Left drawer -->
  <ADrawer
    v-model="isDrawerLeftShown"
    anchor="left"
    title="Drawer title"
    subtitle="Chocolate cake tiramisu donut"
  />

  <!-- 👉 Right drawer -->
  <ADrawer
    v-model="isDrawerRightShown"
    anchor="right"
    title="Drawer title"
    subtitle="Chocolate cake tiramisu donut"
  />
</template>

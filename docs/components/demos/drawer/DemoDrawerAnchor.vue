<script setup lang="ts">
import { ref } from 'vue'

const isDrawerLeftShown = ref(false)
const isDrawerRightShown = ref(false)
const isDrawerTopShown = ref(false)
const isDrawerBottomShown = ref(false)
</script>

<template>
  <ABtn
    class="mr-4"
    @click="isDrawerLeftShown = true"
  >
    Left
  </ABtn>
  <ABtn
    class="mr-4"
    @click="isDrawerRightShown = true"
  >
    Right
  </ABtn>
  <ABtn
    class="mr-4"
    @click="isDrawerTopShown = true"
  >
    Top
  </ABtn>
  <ABtn @click="isDrawerBottomShown = true">
    Bottom
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

  <!-- 👉 Top drawer -->
  <ADrawer
    v-model="isDrawerTopShown"
    anchor="top"
    title="Drawer title"
    subtitle="Chocolate cake tiramisu donut"
  />

  <!-- 👉 Bottom drawer -->
  <ADrawer
    v-model="isDrawerBottomShown"
    anchor="bottom"
    title="Drawer title"
    subtitle="Chocolate cake tiramisu donut"
  />
</template>

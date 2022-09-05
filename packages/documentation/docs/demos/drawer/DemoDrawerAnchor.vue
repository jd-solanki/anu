<script setup lang="ts">
import { ref } from 'vue'

const isDrawerShown = ref(false)

const selectedAnchor = ref('left')
const drawerAnchors = ['left', 'right']
</script>

<template>
  <ASelect
    v-model="selectedAnchor"
    :options="drawerAnchors"
    label="Anchor"
  />

  <br>

  <ADrawer
    v-model="isDrawerShown"
    :anchor="selectedAnchor"
    title="Drawer title"
    subtitle="Chocolate cake tiramisu donut"
    text="Ice cream sweet pie pie dessert sweet danish. Jelly jelly beans cupcake jelly-o chocolate bonbon chocolate bar."
  />

  <ABtn @click="isDrawerShown = true">
    Show drawer
  </ABtn>
</template>

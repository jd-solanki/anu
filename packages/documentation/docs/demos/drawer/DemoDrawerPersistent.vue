<script setup lang="ts">
import { ref } from 'vue'

const isDrawerShown = ref(false)
</script>

<template>
  <ADrawer
    v-model="isDrawerShown"
    title="Drawer title"
    subtitle="Chocolate cake tiramisu donut"
    text="Ice cream sweet pie pie dessert sweet danish. Jelly jelly beans cupcake jelly-o chocolate bonbon chocolate bar."
    persistent
  >
    <div class="a-card-body">
      <ABtn
        variant="light"
        class="text-sm"
        @click="isDrawerShown = false"
      >
        Close
      </ABtn>
    </div>
  </ADrawer>

  <ABtn @click="isDrawerShown = true">
    Show drawer
  </ABtn>
</template>

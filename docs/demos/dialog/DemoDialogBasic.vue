<script setup lang="ts">
import { ref } from 'vue'

const isDialogShown = ref(false)
</script>

<template>
  <ADialog
    v-model="isDialogShown"
    title="Dialog title"
    subtitle="Chocolate cake tiramisu donut"
    text="Ice cream sweet pie pie dessert sweet danish. Jelly jelly beans cupcake jelly-o chocolate bonbon chocolate bar."
  />

  <ABtn @click="isDialogShown = true">
    Show dialog
  </ABtn>
</template>

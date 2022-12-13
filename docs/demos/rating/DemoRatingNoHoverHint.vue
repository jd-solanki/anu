<script setup lang="ts">
import { ref } from 'vue'

const rating = ref(0)
</script>

<template>
  <ARating
    v-model="rating"
    halve
    no-hover-hint
  />
</template>

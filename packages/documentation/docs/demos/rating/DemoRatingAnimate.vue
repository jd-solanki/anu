<script setup lang="ts">
import { ref } from 'vue'

const rating = ref(0)
</script>

<template>
  <ARating
    v-model="rating"
    animate
    empty-icon="i-bx:heart"
    full-icon="i-bx:bxs-heart"
    color="danger"
  />
</template>

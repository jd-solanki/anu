<script setup lang="ts">
import { ref } from 'vue'

const rating = ref(0)
</script>

<template>
  <div class="flex">
    <ARating v-model="rating" />
    <span class="ml-2">Value: {{ rating }}</span>
  </div>
</template>

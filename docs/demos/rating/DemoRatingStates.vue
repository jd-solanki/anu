<script setup lang="ts">
import { ref } from 'vue'

const rating = ref(3)
</script>

<template>
  <ARating
    v-model="rating"
    readonly
  />
  <ARating
    v-model="rating"
    disabled
  />
</template>

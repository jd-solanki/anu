<script setup lang="ts">
import { ref } from 'vue'

const rating = ref(0)
</script>

<template>
  <div class="flex flex-col gap-2">
    <ARating
      v-model="rating"
      length="3"
    />
  </div>
</template>

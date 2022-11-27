<script setup lang="ts">
import { ref } from 'vue'

const rating = ref(0)
</script>

<template>
  <div class="flex flex-col gap-2">
    <ARating
      v-model="rating"
      class="text-sm"
    />
    <ARating
      v-model="rating"
      class="text-base"
    />
    <ARating
      v-model="rating"
      class="text-lg"
    />
    <ARating v-model="rating" />
    <ARating
      v-model="rating"
      class="text-2xl"
    />
  </div>
</template>

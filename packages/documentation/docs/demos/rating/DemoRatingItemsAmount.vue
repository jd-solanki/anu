<script setup lang="ts">
import { ref } from 'vue'

const rating = ref(0)
</script>

<template>
  <div class="flex flex-col gap-2">
    <ARating
      v-model="rating"
      items-amount="3"
      halving
    />
    <ARating
      v-model="rating"
      items-amount="4"
      halving
    />
    <ARating v-model="rating" />
    <ARating
      v-model="rating"
      items-amount="6"
      halving
    />
  </div>
</template>

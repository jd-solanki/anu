<script setup lang="ts">
import { ref } from 'vue'

const rating = ref(0)
</script>

<template>
  <div class="flex gap4 flex-wrap">
    <ARating v-model="rating" />
    <ARating
      v-model="rating"
      color="success"
    />
    <ARating
      v-model="rating"
      color="info"
    />
    <ARating
      v-model="rating"
      color="warning"
    />
    <ARating
      v-model="rating"
      color="danger"
    />
  </div>
</template>

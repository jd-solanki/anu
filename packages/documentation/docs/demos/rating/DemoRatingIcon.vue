<script setup lang="ts">
import { ref } from 'vue'

const rating = ref(0)
</script>

<template>
  <div class="flex flex-col gap-2">
    <ARating v-model="rating" />
    <ARating
      v-model="rating"
      icon-empty="i-bx:like"
      icon-full="i-bx:bxs-like"
      color="success"
    />
    <ARating
      v-model="rating"
      icon-empty="i-bx:coffee"
      icon-full="i-bx:bxs-coffee"
      color="info"
    />
    <ARating
      v-model="rating"
      icon-empty="i-bx:bowl-hot"
      icon-full="i-bx:bxs-bowl-hot"
      color="warning"
    />
    <ARating
      v-model="rating"
      icon-empty="i-bx:heart"
      icon-full="i-bx:bxs-heart"
      color="danger"
    />
  </div>
</template>

<script setup lang="ts">
import { rows } from './data'
</script>

<template>
  <div class="cards-demo-container">
    <ATable :rows="rows" />
  </div>
</template>

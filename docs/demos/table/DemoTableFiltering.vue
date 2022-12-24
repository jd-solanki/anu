<script setup lang="ts">
import { rows } from './data'
</script>

<template>
  <div class="cards-demo-container">
    <ADataTable
      :rows="rows"
      search
    />
  </div>
</template>

<script setup lang="ts">
import { rows } from './data'

const cols = [
  { name: 'name' },
  { name: 'username', formatter: row => `@${row.username}` },
  { name: 'website' },
]
</script>

<template>
  <div class="cards-demo-container">
    <ATable
      :rows="rows"
      :cols="cols"
    />
  </div>
</template>

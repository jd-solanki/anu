<script setup lang="ts">
import { rows } from './data'

const cols = [
  { name: 'name' },
  { name: 'username' },
  { name: 'website', isSortable: false },
]
</script>

<template>
  <div class="cards-demo-container">
    <!-- Columns inferred from rows will have sorting enabled by default -->
    <ADataTable
      :cols="cols"
      :rows="rows"
    />
  </div>
</template>

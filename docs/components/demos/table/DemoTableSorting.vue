<script setup lang="ts">
import { rows } from './data'

const cols = [
  { name: 'name' },
  { name: 'username' },
  { name: 'website', isSortable: false },
]
</script>

<template>
  <!-- Columns inferred from rows will have sorting enabled by default -->
  <ADataTable
    :cols="cols"
    :rows="rows"
  />
</template>

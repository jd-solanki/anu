<script setup lang="ts">
import { rows } from './data'
</script>

<template>
  <ADataTable
    :rows="rows"
    search
  />
</template>

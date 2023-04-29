<script setup lang="ts">
import { rows } from './data'
</script>

<template>
  <ATable :rows="rows">
    <!-- Header: Name -->
    <template #header-name="{ col }">
      <i
        v-once
        class="i-bx-user me-1"
      /> {{ col.name }}
    </template>

    <!-- Column: Name -->
    <template #col-name="{ row }">
      <a
        :href="row.website"
        class="text-primary hover:underline"
      >{{ row.name }}</a>
    </template>
  </ATable>
</template>

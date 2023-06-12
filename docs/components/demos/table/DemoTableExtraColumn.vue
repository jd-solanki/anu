<script setup lang="ts">
import type { ATablePropColumn } from 'anu-vue';
import { rows } from './data';

const cols: ATablePropColumn<typeof rows[number]>[] = [
  { name: 'name' },
  { name: 'username' },
  { name: 'actions' },
]
</script>

<template>
  <ATable
    :rows="rows"
    :cols="cols"
  >
    <template #col-actions>
      <div class="flex items-center">
        <ABtn
          class="text-xs"
          icon="i-bx-link-external"
          icon-only
          color="inherit"
          variant="text"
        />
        <ABtn
          class="text-xs"
          icon="i-bx-edit-alt"
          icon-only
          variant="text"
          color="inherit"
        />
        <ABtn
          class="text-xs"
          icon="i-bx-trash"
          icon-only
          variant="text"
          color="inherit"
        />
      </div>
    </template>
  </ATable>
</template>

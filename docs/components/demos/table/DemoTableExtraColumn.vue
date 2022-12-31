<script setup lang="ts">
import { rows } from './data'

const cols = [
  { name: 'name' },
  { name: 'username' },
  { name: 'actions' },
]
</script>

<template>
  <div class="cards-demo-container">
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
            color="default"
            variant="text"
          />
          <ABtn
            class="text-xs"
            icon="i-bx-edit-alt"
            icon-only
            variant="text"
            color="default"
          />
          <ABtn
            class="text-xs"
            icon="i-bx-trash"
            icon-only
            variant="text"
            color="default"
          />
        </div>
      </template>
    </ATable>
  </div>
</template>

<script setup lang="ts">
import type { ADataTableProps } from 'anu-vue'
import { rows } from './data'

const cols: ADataTableProps['cols'] = [
  { name: 'name' },
  { name: 'username', formatter: row => `@${(row as (typeof rows)[number]).username}` },
  { name: 'website' },
]
</script>

<template>
  <ATable
    :rows="rows"
    :cols="cols"
  />
</template>

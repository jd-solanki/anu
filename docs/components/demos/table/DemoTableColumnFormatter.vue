<script setup lang="ts">
import type { ATableProps } from 'anu-vue'
import { rows } from './data'

const cols: ATableProps['cols'] = [
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

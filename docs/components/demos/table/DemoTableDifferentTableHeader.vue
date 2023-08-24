<script setup lang="ts">
import { ref } from 'vue';
import { rows } from './data';

const cols = ref([
  { name: 'name' },
  { name: 'username', title: 'User\'s ID' },
  { name: 'website', title: 'Website Address' },
])
</script>

<template>
  <ATable
    :rows="rows"
    :cols="cols"
  />
</template>

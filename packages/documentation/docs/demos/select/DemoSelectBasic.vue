<script setup lang="ts">
import { ref } from 'vue';
const fruits = ['banana', 'apple', 'watermelon', 'orange']
const selected = ref()
</script>

<template>
  <ASelect
    v-slot="{ attrs }"
    v-model="selected"
    :hint="`value: ${selected}`"
  >
    <li
      v-for="fruit in fruits"
      v-bind="attrs"
      :key="fruit"
      @click="selected = fruit"
    >
      {{ fruit }}
    </li>
  </ASelect>
</template>

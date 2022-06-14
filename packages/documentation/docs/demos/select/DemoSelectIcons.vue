<script setup lang="ts">
import { ref } from 'vue';
const fruits = [
  'banana',
  'apple',
  'watermelon',
  'orange',
]
const selected = ref()
</script>

<template>
  <div class="grid grid-cols-2 gap-6">
    <ASelect
      v-slot="{ attrs }"
      v-model="selected"
      prepend-inner-icon="i-bx-heart"
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
    <ASelect
      v-slot="{ attrs }"
      v-model="selected"
      append-inner-icon="i-bx-chevrons-down"
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
  </div>
</template>

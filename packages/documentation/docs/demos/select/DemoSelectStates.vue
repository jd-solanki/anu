<script setup lang="ts">
import { ref } from 'vue'
const fruits = ['banana', 'apple', 'watermelon', 'orange']
const selected = ref('banana')
</script>

<template>
  <div class="grid grid-cols-2 gap-6">
    <ASelect
      v-slot="{ attrs }"
      v-model="selected"
      disabled
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
    <ASelect
      v-slot="{ attrs }"
      v-model="selected"
      readonly
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selected = ref()
const fruits = ['banana', 'apple', 'watermelon', 'orange']
</script>

<template>
  <ASelect
    v-model="selected"
    hint="We will deliver it shortly"
    :options="fruits"
  />
</template>

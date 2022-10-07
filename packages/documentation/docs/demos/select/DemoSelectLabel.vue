<script setup lang="ts">
import { ref } from 'vue'

const selected = ref()
const fruits = ['banana', 'apple', 'watermelon', 'orange']
</script>

<template>
  <div class="grid-row sm:grid-cols-2 justify-items-stretch">
    <div>
      <ASelect
        v-model="selected"
        label="Favorite Fruit"
        :options="fruits"
      />
    </div>
  </div>
</template>

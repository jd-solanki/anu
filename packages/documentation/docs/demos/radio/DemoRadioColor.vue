<script lang="ts" setup>
import { ref } from 'vue'

const favoriteFruit = ref()
const colors = ['primary', 'success', 'info', 'warning', 'danger']
</script>

<template>
  <div class="flex flex-col gap-y-3 mt-6">
    <ARadio
      v-for="color in colors"
      :key="color"
      v-model="favoriteFruit"
      name="radio-color"
      :color="color"
      :value="color"
      :label="color"
      class="capitalize"
    />
  </div>
</template>

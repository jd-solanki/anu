<script lang="ts" setup>
import { ref } from 'vue'

const favoriteFruit1 = ref()
const favoriteFruit2 = ref()
const colors = ['primary', 'success', 'info', 'warning', 'danger']
</script>

<template>
  <div class="flex flex-col gap-y-3 mt-6">
    <h1>first group</h1>
    <ARadio
      v-for="color in colors"
      :key="color"
      v-model="favoriteFruit1"
      name="radio-color"
      :color="color"
      :value="color"
      :label="color"
      class="capitalize"
    />
    <h1>second group</h1>
    <ARadio
      v-for="color in colors"
      :key="color"
      v-model="favoriteFruit2"
      name="radio-color"
      :color="color"
      :value="color"
      :label="color"
      class="capitalize"
    />
  </div>
</template>

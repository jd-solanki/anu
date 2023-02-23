<script lang="ts" setup>
import { ref } from 'vue'

const favoriteFruit = ref(null)
</script>

<template>
  <div class="flex flex-col gap-y-3 mt-6">
    <ARadio
      v-model="favoriteFruit"
      name="fruit"
      value="banana"
      label="Banana"
    />
    <ARadio
      v-model="favoriteFruit"
      name="fruit"
      value="apple"
      label="Apple"
    />
    <ARadio
      v-model="favoriteFruit"
      name="fruit"
      value="mango"
      label="Mango"
    />
    <ARadio
      v-model="favoriteFruit"
      name="fruit"
      value="orange"
      label="Orange"
      disabled
    />
    <small>Selected: {{ favoriteFruit }}</small>
  </div>
</template>

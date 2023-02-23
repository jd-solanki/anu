<script lang="ts" setup>
import { defaultThemeColors } from 'anu-vue'
import { ref } from 'vue'

const favoriteFruit = ref()
</script>

<template>
  <div class="flex flex-col gap-y-3 mt-6">
    <ARadio
      v-for="color in defaultThemeColors"
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

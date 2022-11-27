<script lang="ts" setup>
import { ref } from 'vue'

const data = ref([])
</script>

<template>
  <div class="grid grid-rows-2 gap-y-3">
    <ACheckbox
      v-model="data"
      value="apple"
      label="Apple"
    />

    <ACheckbox
      v-model="data"
      value="banana"
      label="Banana"
    />

    <ACheckbox
      v-model="data"
      value="watermelon"
      label="Watermelon"
    />

    <ACheckbox
      v-model="data"
      value="orange"
      disabled
      label="Orange"
    />

    <p>Selected: {{ data }}</p>
  </div>
</template>

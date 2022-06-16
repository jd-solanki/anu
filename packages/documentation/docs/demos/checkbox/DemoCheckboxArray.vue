<script lang="ts" setup>
import { ref } from 'vue'

const data = ref([])
</script>

<template>
  <div class="grid grid-rows-2 gap-y-3">
    <ACheckbox
      v-model="data"
      value="apple"
    >
      Apple
    </ACheckbox>

    <ACheckbox
      v-model="data"
      value="banana"
    >
      Banana
    </ACheckbox>

    <ACheckbox
      v-model="data"
      value="watermelon"
    >
      Watermelon
    </ACheckbox>

    <p>Selected: {{ data }}</p>
  </div>
</template>

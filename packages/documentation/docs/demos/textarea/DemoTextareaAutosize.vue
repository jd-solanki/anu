<script setup lang="ts">
import { ref } from 'vue'

const aaa = ref(
`200px max
.
.
.
.
.
.
.
.
.
.`,
)
</script>

<template>
  <div class="grid gap-y-3">
    <ATextarea
      autosize
    />

    <ATextarea
      v-model="aaa"
      :autosize="200"
    />
  </div>
</template>

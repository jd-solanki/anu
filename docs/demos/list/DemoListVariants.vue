<script lang="ts" setup>
import { ref } from 'vue'

const items = [
  { text: 'Donut jujubes' },
  { text: 'Sesame snaps' },
  { text: 'I love jelly' },
  { text: 'Cake gummi', disable: true },
]

const selected = ref(0)
</script>

<template>
  <div class="cards-demo-container">
    <ACard>
      <AList
        v-model="selected"
        :items="items"
        variant="light"
        class="a-list-items-pill"
      />
    </ACard>
  </div>
</template>

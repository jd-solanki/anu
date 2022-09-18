<script lang="ts" setup>
import { ref } from 'vue'

const items = [
  { title: 'Donut jujubes' },
  { title: 'Sesame snaps' },
  { title: 'I love jelly' },
  { title: 'Cake gummi', disable: true },
]

const selected = ref(0)
</script>

<template>
  <div class="cards-demo-container">
    <ACard>
      <AList
        v-model="selected"
        :items="items"
        class="[--a-list-gap:0.25rem]"
      >
        <template #after>
          <hr class="my-2">
          <AList :items="[{ text: `Selected: ${selected}` }]" />
        </template>
      </AList>
    </ACard>
  </div>
</template>

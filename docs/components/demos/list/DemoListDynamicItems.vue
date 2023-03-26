<script lang="ts" setup>
import { ref } from 'vue'

const items = ref([
  { text: 'Donut jujubes' },
  { text: 'Sesame snaps' },
  { text: 'I love jelly' },
  { text: 'Cake gummi', disabled: true },
])

const addItem = () => {
  const id = Math.floor(Math.random() * 100)
  items.value.push({ text: `added item ${id}` })
}
const selected = ref(null)
</script>

<template>
  <ABtn
    variant="light"
    @click="addItem"
  >
    Add Item
  </ABtn>

  <div class="cards-demo-container">
    <ACard>
      <AList
        v-model="selected"
        :items="items"
      />
    </ACard>
  </div>
</template>

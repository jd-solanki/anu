<script lang="ts" setup>
import { ref } from 'vue'

const items = [
  { title: 'Donut jujubes' },
  { title: 'Sesame snaps' },
  { title: 'I love jelly' },
  { title: 'Cake gummi', disable: true },
]

const isMenuVisible = ref(false)
</script>

<template>
  <div class="flex flex-wrap gap-12">
    <ABtn>
      <AMenu v-model="isMenuVisible">
        <AList :items="items" />
      </AMenu>

      Button
    </ABtn>

    <div class="flex flex-wrap gap-4">
      <ABtn
        variant="light"
        @click="isMenuVisible = true"
      >
        Open Menu
      </ABtn>
      <ABtn
        variant="light"
        @click="isMenuVisible = false"
      >
        Close Menu
      </ABtn>
    </div>
  </div>
</template>

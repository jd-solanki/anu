<script lang="ts" setup>
const items = [
  { text: 'Donut jujubes' },
  { text: 'Sesame snaps' },
  { text: 'I love jelly' },
  { text: 'Cake gummi', disabled: true },
]
</script>

<template>
  <div class="cards-demo-container">
    <ACard>
      <AList :items="items" />
    </ACard>
  </div>
</template>

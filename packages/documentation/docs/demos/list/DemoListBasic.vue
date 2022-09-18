<script lang="ts" setup>
const items = [
  { title: 'Donut jujubes' },
  { title: 'Sesame snaps' },
  { title: 'I love jelly' },
  { title: 'Cake gummi', disable: true },
]
</script>

<template>
  <div class="cards-demo-container">
    <ACard>
      <AList :items="items" />
    </ACard>
  </div>
</template>

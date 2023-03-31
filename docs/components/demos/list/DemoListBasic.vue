<script lang="ts" setup>
const items = [
  { text: 'Donut jujubes' },
  { text: 'Sesame snaps' },
  { text: 'I love jelly' },
  { text: 'Cake gummi', disabled: true },
]
</script>

<template>
  <ACard>
    <AList :items="items" />
  </ACard>
</template>

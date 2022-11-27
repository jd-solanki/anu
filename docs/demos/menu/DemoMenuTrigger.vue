<script lang="ts" setup>
const items = [
  { title: 'Donut jujubes' },
  { title: 'Sesame snaps' },
  { title: 'I love jelly' },
  { title: 'Cake gummi', disable: true },
]
</script>

<template>
  <ABtn>
    <AMenu trigger="hover">
      <AList :items="items" />
    </AMenu>

    Open Menu
  </ABtn>
</template>

<script lang="ts" setup>
const items = [
  { text: 'Donut jujubes' },
  { text: 'Sesame snaps' },
  { text: 'I love jelly' },
  { text: 'Cake gummi', disable: true },
]
</script>

<template>
  <ABtn>
    <AMenu strategy="fixed">
      <AList :items="items" />
    </AMenu>

    Open Fixed Menu
  </ABtn>
</template>

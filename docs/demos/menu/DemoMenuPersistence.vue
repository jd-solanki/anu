<script lang="ts" setup>
const items = [
  { text: 'Donut jujubes' },
  { text: 'Sesame snaps' },
  { text: 'I love jelly' },
  { text: 'Cake gummi', disable: true },
]
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <ABtn>
      <AMenu persist>
        <AList :items="items" />
      </AMenu>
      Persist
    </ABtn>

    <ABtn>
      <AMenu persist="content">
        <AList :items="items" />
      </AMenu>
      Content Persist
    </ABtn>
  </div>
</template>

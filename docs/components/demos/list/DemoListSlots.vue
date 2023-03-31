<script lang="ts" setup>
const items = [
  { text: 'Donut jujubes' },
  { text: 'Sesame snaps' },
  { text: 'I love jelly' },
  { text: 'Cake gummi' },
]
</script>

<template>
  <ACard>
    <AList
      :items="items"
      class="[--a-list-item-margin:0_1rem]"
    >
      <!-- 👉 Slot: Before -->
      <template #before>
        <AInput class="my-2 mx-4" />
      </template>

      <!-- 👉 Slot: Append -->
      <template #item-append="{ index }">
        <span class="kbd">
          &#8984; {{ index + 1 }}
        </span>
      </template>

      <!-- 👉 Slot: After -->
      <template #after>
        <hr class="my-2">
        <AList
          :items="[{ subtitle: '4 items found' }]"
          class="my-0 opacity-75"
        />
      </template>
    </AList>
  </ACard>
</template>

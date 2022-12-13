<script setup lang="ts">
const rows = [
  {
    name: 'Leanne Graham',
    username: 'Bret',
    website: 'hildegard.org',
  },
  {
    name: 'Ervin Howell',
    username: 'Antonette',
    website: 'anastasia.net',
  },
  {
    name: 'Clementine Bauch',
    username: 'Samantha',
    website: 'ramiro.info',
  },
  {
    name: 'Patricia Lebsack',
    username: 'Karianne',
    website: 'kale.biz',
  },
  {
    name: 'Chelsey Dietrich',
    username: 'Kamren',
    website: 'demarco.info',
  },
]
</script>

<template>
  <div class="cards-demo-container">
    <ATable :rows="rows">
      <!-- Name -->
      <template #row-name="{ row }">
        <span class="text-primary">
          {{ row.name }}
        </span>
      </template>

      <!-- Website -->
      <template #row-website="{ row }">
        <div class="flex gap-1 items-center">
          <div class="i-bx-globe" />
          {{ row.website }}
        </div>
      </template>
    </ATable>
  </div>
</template>

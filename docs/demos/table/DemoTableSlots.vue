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
      <!-- Header: Name -->
      <template #header-name="{ col }">
        <i class="i-bx-user me-1" /> {{ col.name }}
      </template>

      <!-- Column: Name -->
      <template #col-name="{ row }">
        <a
          :href="row.website"
          class="text-primary hover:underline"
        >{{ row.name }}</a>
      </template>
    </ATable>
  </div>
</template>

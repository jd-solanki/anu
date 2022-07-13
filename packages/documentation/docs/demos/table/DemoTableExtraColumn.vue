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

const columns = [
  { name: 'name' },
  { name: 'username' },
  { name: 'website', isFilterable: false, isSortable: false },
  { name: 'actions' },
]
</script>

<template>
  <ATable
    :rows="rows"
    :columns="columns"
  >
    <template #row-actions>
      <ABtn>Update</ABtn>
    </template>
  </ATable>
</template>

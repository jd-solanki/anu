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
  { name: 'actions' },
]
</script>

<template>
  <ATable
    :rows="rows"
    :columns="columns"
  >
    <template #row-actions>
      <div class="flex items-center">
        <ABtn
          class="text-xs"
          icon="i-bx-link-external"
          icon-only
          color="default"
          variant="text"
        />
        <ABtn
          class="text-xs"
          icon="i-bx-edit-alt"
          icon-only
          variant="text"
          color="default"
        />
        <ABtn
          class="text-xs"
          icon="i-bx-trash"
          icon-only
          variant="text"
          color="default"
        />
      </div>
    </template>
  </ATable>
</template>

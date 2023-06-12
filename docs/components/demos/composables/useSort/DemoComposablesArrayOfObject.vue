<script lang="ts" setup>
import { useSort } from 'anu-vue';
import { ref } from 'vue';

const data = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    website: 'hildegard.org',
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    website: 'anastasia.net',
  },
  {
    id: 3,
    name: 'Clementine Bauch',
    username: 'Samantha',
    website: 'ramiro.info',
  },
  {
    id: 4,
    name: 'Patricia Lebsack',
    username: 'Karianne',
    website: 'kale.biz',
  },
  {
    id: 5,
    name: 'Chelsey Dietrich',
    username: 'Kamren',
    website: 'demarco.info',
  },
  {
    id: 6,
    name: 'Mrs. Dennis Schulist',
    username: 'Leopoldo_Corkery',
    website: 'ola.org',
  },
  {
    id: 7,
    name: 'Kurtis Weissnat',
    username: 'Elwyn.Skiles',
    website: 'elvis.io',
  },
  {
    id: 8,
    name: 'Nicholas Runolfsdottir V',
    username: 'Maxime_Nienow',
    website: 'jacynthe.com',
  },
  {
    id: 9,
    name: 'Glenna Reichert',
    username: 'Delphine',
    website: 'conrad.com',
  },
  {
    id: 10,
    name: 'Clementina DuBuque',
    username: 'Moriah.Stanton',
    website: 'ambrose.net',
  },
  {
    id: 11,
    name: 'Leanne Graham',
    username: 'awesome_Leanne',
    website: 'meetleanne.me.',
  },
]

const isAsc = ref(false)

const sortBy = ref<any>('name')
const sortByOptions = [
  undefined,
  'name',
  'id',
  ['name', 'username'],
  [{ name: 'name', isAsc: true }, { name: 'username', isAsc: true }],
  [
    {
      name: 'id',
      sortBy: (a: number, b: number) => {
        return a - b
      },
    },
    'username',
  ],
]

const { results } = useSort(data, sortBy, isAsc)
</script>

<template>
  <ASelect
    v-model="sortBy"
    :hint="`value: ${sortBy}`"
    label="Sort by"
  >
    <li
      v-for="op in sortByOptions"
      :key="JSON.stringify(op)"
      @click="sortBy = op"
    >
      {{ JSON.stringify(op) || typeof op }}
    </li>
  </ASelect>
  <ACheckbox
    v-model="isAsc"
    class="mb-6 mt-2"
  >
    is ascending
  </ACheckbox>
  <ATable :rows="results" />
</template>

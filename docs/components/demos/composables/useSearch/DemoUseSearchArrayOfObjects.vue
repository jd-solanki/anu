<script lang="ts" setup>
import { useSearch } from 'anu-vue';
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
]

const filterBy = ref<any>('name')
const filterByOptions = [
  undefined,
  (q: string, item: any) => item.name.startsWith(q),
  'name',
  ['name', 'username'],
  [
    {
      name: 'name',
      filterBy: (val: string, q: string) => val.startsWith(q),
    },
    'username',
    {
      name: 'website',
      filterBy: (val: string, q: string) => val.endsWith(q),
    },
  ],
]

const q = ref('')
const isSearchStrict = ref(false)
const { results } = useSearch(q, data, filterBy, isSearchStrict)
</script>

<template>
  <ASelect
    v-model="filterBy"
    :hint="`value: ${filterBy}`"
  >
    <li
      v-for="op in filterByOptions"
      :key="JSON.stringify(op)"
      @click="filterBy = op"
    >
      {{ JSON.stringify(op) || typeof op }}
    </li>
  </ASelect>
  <div class="flex items-center gap-6">
    <AInput v-model="q" />
    <ACheckbox
      v-model="isSearchStrict"
      label="strict"
    />
  </div>
  <ATable :rows="results" />
</template>

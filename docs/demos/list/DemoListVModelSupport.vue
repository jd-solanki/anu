<script lang="ts" setup>
import { ref } from 'vue'

const items = [
  { title: 'Donut jujubes' },
  { title: 'Sesame snaps' },
  { title: 'I love jelly' },
  { title: 'Cake gummi', disable: true },
]

const itemsPropSelection = ref(0)
const slotSelection = ref(0)
</script>

<template>
  <div class="cards-demo-container flex gap-12 all:flex-grow">
    <!-- 👉 Using `items` prop -->
    <ACard>
      <AList
        v-model="itemsPropSelection"
        :items="items"
        class="[--a-list-gap:0.25rem]"
      >
        <template #after>
          <hr class="my-2">
          <AList :items="[{ text: `Selected: ${itemsPropSelection}` }]" />
        </template>
      </AList>
    </ACard>

    <!-- 👉 Using AListItem in default slot -->
    <ACard>
      <AList
        v-model="slotSelection"
        :items="items"
        class="[--a-list-gap:0.25rem]"
      >
        <template #default="{ handleListItemClick }">
          <AListItem
            v-for="(item, index) in items"
            :key="item.title"
            :title="item.title"
            :value="index"
            :disable="item.disable"
            :is-active="slotSelection === index"
            @click="item => handleListItemClick(item)"
          />
        </template>
        <template #after>
          <hr class="my-2">
          <AList :items="[{ text: `Selected: ${slotSelection}` }]" />
        </template>
      </AList>
    </ACard>
  </div>
</template>

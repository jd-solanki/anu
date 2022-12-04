<script lang="ts" setup>
import { ref } from 'vue'

const items = [
  { text: 'Donut jujubes' },
  { text: 'Sesame snaps' },
  { text: 'I love jelly' },
  { text: 'Cake gummi', disable: true },
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
          <AList
            class="mb-0"
            :items="[{ subtitle: `Selected: ${itemsPropSelection}` }]"
          />
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
            :key="item.text"
            :text="item.text"
            :value="index"
            :disable="item.disable"
            :is-active="slotSelection === index"
            @click="item => handleListItemClick(item)"
          />
        </template>
        <template #after>
          <hr class="my-2">
          <AList
            class="mb-0"
            :items="[{ subtitle: `Selected: ${slotSelection}` }]"
          />
        </template>
      </AList>
    </ACard>
  </div>
</template>

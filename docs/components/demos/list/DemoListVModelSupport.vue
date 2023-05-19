<script lang="ts" setup>
import { ref } from 'vue';

const items = [
  { text: 'Donut jujubes' },
  { text: 'Sesame snaps' },
  { text: 'I love jelly' },
  { text: 'Cake gummi', disabled: true },
]

const itemsPropSelection = ref<typeof items[number] | null>(null)
const slotSelection = ref<typeof items[number] | null>(null)
</script>

<template>
  <div class="grid-row grid-cols-2 place-items-stretch all:flex-grow">
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
            :items="[{ subtitle: `Selected: ${itemsPropSelection && itemsPropSelection.text}` }]"
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
            :disabled="item.disabled"
            :is-active="slotSelection?.text === item.text"
            @click="handleListItemClick(item)"
          />
        </template>
        <template #after>
          <hr class="my-2">
          <AList
            class="mb-0"
            :items="[{ subtitle: `Selected: ${slotSelection && slotSelection.text}` }]"
          />
        </template>
      </AList>
    </ACard>
  </div>
</template>

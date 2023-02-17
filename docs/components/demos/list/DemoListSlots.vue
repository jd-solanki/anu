<script lang="ts" setup>
const items = [
  { text: 'Donut jujubes' },
  { text: 'Sesame snaps' },
  { text: 'I love jelly' },
  { text: 'Cake gummi' },
]
</script>

<template>
  <div class="cards-demo-container">
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
        <template #append="{ index }">
          <ABtn
            variant="outline"
            class="text-sm opacity-35 min-h-[24px] spacing-50"
            color="default"
            :states="false"
          >
            &#8984; {{ index + 1 }}
          </ABtn>
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
  </div>
</template>

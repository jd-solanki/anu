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
          <AInput class="m-$a-list-item-padding" />
        </template>

        <!-- 👉 Slot: Append -->
        <template #append="{ itemIndex }">
          <ABtn
            variant="outline"
            class="text-[0.6rem] font-semibold opacity-50"
            color="default"
            :states="false"
          >
            Shift + {{ itemIndex + 1 }}
          </ABtn>
        </template>

        <!-- 👉 Slot: After -->
        <template #after>
          <hr class="my-2">
          <AList
            :items="[{ text: '4 items found' }]"
            class="my-0 opacity-75"
          />
        </template>
      </AList>
    </ACard>
  </div>
</template>

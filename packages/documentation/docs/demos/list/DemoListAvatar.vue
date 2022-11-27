<script lang="ts" setup>
const items = [
  {
    icon: 'i-bx-mobile-alt',
    title: 'Electronics',
    subtitle: 'Mobile, Earbuds, TV',
    $avatar: { class: 'text-xl' },
  },
  {
    icon: 'i-bx-closet',
    title: 'Fashion',
    subtitle: 'T-shirt, Jeans, Shoes',
    $avatar: { class: 'text-xl' },
  },
  {
    icon: 'i-bx-home',
    title: 'Decor',
    subtitle: 'Fine Art, Dining',
    $avatar: { class: 'text-xl' },
  },
  {
    icon: 'i-bx-football',
    title: 'Sports',
    subtitle: 'Football, Cricket Kit',
    $avatar: { class: 'text-xl' },
  },
]
</script>

<template>
  <div class="cards-demo-container">
    <ACard>
      <AList
        :items="items"
        class="[--a-list-item-gap:1rem]"
      />
    </ACard>
  </div>
</template>

<script lang="ts" setup>
const items = [
  {
    icon: 'i-bx-link-external text-sm cursor-pointer',
    title: 'Electronics',
    subtitle: 'Mobile, Earbuds, TV',
    $avatar: { icon: 'i-bx-mobile-alt' },
  },
  {
    icon: 'i-bx-link-external text-sm cursor-pointer',
    title: 'Fashion',
    subtitle: 'T-shirt, Jeans, Shoes',
    $avatar: { icon: 'i-bx-closet' },
  },
  {
    icon: 'i-bx-link-external text-sm cursor-pointer',
    title: 'Decor',
    subtitle: 'Fine Art, Dining',
    $avatar: { icon: 'i-bx-home' },
  },
  {
    icon: 'i-bx-link-external text-sm cursor-pointer',
    title: 'Sports',
    subtitle: 'Football, Cricket Kit',
    $avatar: { icon: 'i-bx-football' },
  },
]
</script>

<template>
  <div class="cards-demo-container">
    <ACard>
      <AList
        :items="items"
        icon-append
        class="[--a-list-item-gap:1rem]"
      />
    </ACard>
  </div>
</template>

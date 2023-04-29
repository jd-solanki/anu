<script lang="ts" setup>
const items = [
  {
    icon: 'i-bx-link-external text-sm cursor-pointer',
    title: 'Electronics',
    subtitle: 'Mobile, Earbuds, TV',
    avatarProps: { icon: 'i-bx-mobile-alt' },
  },
  {
    icon: 'i-bx-link-external text-sm cursor-pointer',
    title: 'Fashion',
    subtitle: 'T-shirt, Jeans, Shoes',
    avatarProps: { icon: 'i-bx-closet' },
  },
  {
    icon: 'i-bx-link-external text-sm cursor-pointer',
    title: 'Decor',
    subtitle: 'Fine Art, Dining',
    avatarProps: { icon: 'i-bx-home' },
  },
  {
    icon: 'i-bx-link-external text-sm cursor-pointer',
    title: 'Sports',
    subtitle: 'Football, Cricket Kit',
    avatarProps: { icon: 'i-bx-football' },
  },
]
</script>

<template>
  <ACard>
    <AList
      :items="items"
      icon-append
      class="[--a-list-item-gap:1rem]"
    />
  </ACard>
</template>

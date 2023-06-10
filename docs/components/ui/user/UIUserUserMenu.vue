<script lang="ts" setup>
const items = [
  {
    title: 'Profile',
    icon: 'i-bx-user',
  },
  {
    title: 'Settings',
    icon: 'i-bx-cog',
  },
  {
    title: 'Billing',
    icon: 'i-bx-credit-card',
  },
  {
    title: 'Activity Log',
    icon: 'i-bx-pulse',
  },
  {
    title: 'Logout',
    icon: 'i-bx-log-out',
  },
]
</script>

<template>
  <AAvatar>
    <img
      src="/images/demo/portrait-1.jpg"
      alt="avatar"
      class="cursor-pointer"
    >
    <AMenu>
      <AList
        :model-value="null"
        :items="items"
      />
    </AMenu>
  </AAvatar>
</template>

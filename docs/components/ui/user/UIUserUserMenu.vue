<script lang="ts" setup>
const items = [
  {
    text: 'Profile',
    icon: 'i-bx-user',
  },
  {
    text: 'Settings',
    icon: 'i-bx-cog',
  },
  {
    text: 'Billing',
    icon: 'i-bx-credit-card',
  },
  {
    text: 'Activity Log',
    icon: 'i-bx-pulse',
  },
  {
    text: 'Logout',
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
      <!-- ℹ️ `model-value="null"` will be all list items clickable -->
      <AList
        :model-value="null"
        :items="items"
      />
    </AMenu>
  </AAvatar>
</template>

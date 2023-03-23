<script lang="ts" setup>
const tabs = [
  { title: 'Account', icon: 'i-bx-user' },
  { title: 'Notifications', icon: 'i-bx-bell' },
  { title: 'Security', icon: 'i-bx-lock' },
  { title: 'Connections', icon: 'i-bx-link' },
  { title: 'Billing', icon: 'i-bx-credit-card' },
  { title: 'Settings', icon: 'i-bx-cog' },
]
</script>

<template>
  <ATabs
    class="a-tabs-bordered"
    :tabs="tabs"
  />
</template>

<script lang="ts" setup>
const tabs = [
  { title: 'Account', icon: 'i-bx-user' },
  { title: 'Notifications', icon: 'i-bx-bell' },
  { title: 'Settings', icon: 'i-bx-cog' },
]
</script>

<template>
  <ATabs
    class="a-tabs-bordered"
    :tabs="tabs"
    vertical
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const tabs = ref([
  { title: 'Account', icon: 'i-bx-user' },
  { title: 'Notifications', icon: 'i-bx-bell' },
  { title: 'Settings', icon: 'i-bx-cog' },
])

const activeTab = ref(2)
</script>

<template>
  <ATabs
    v-model="activeTab"
    class="a-tabs-bordered"
    :tabs="tabs"
  />
</template>

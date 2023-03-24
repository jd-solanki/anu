<script lang="ts" setup>
import { ref } from 'vue'

const tabs = [
  { title: 'Account', icon: 'i-bx-user' },
  { title: 'Notifications', icon: 'i-bx-bell' },
  { title: 'Settings', icon: 'i-bx-cog' },
]

const active = ref(1)
</script>

<template>
  <button
    v-for="i in 2"
    :key="i"
    :class="{
      'bg-primary': active === i - 1,
    }"
    class="p-3"
    @click="active = i - 1"
  >
    {{ i }}
  </button>
  <AViews v-model="active">
    <AView>Awesome</AView>
    <AView>Cool</AView>
    <p>SOmething else</p>
  </AViews>
</template>

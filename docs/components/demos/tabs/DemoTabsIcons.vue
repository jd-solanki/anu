<script lang="ts" setup>
import { computed, ref } from 'vue'

const defaultTabs = [
  { title: 'Account', icon: 'i-bx-user' },
  { title: 'Notifications', icon: 'i-bx-bell' },
  { title: 'Settings', icon: 'i-bx-cog' },
]

const iconTypes = ['default', 'stacked', 'icon-only'] as const
const iconsType = ref<typeof iconTypes[number]>('default')

const tabs = computed(() => {
  if (iconsType.value === 'default' || iconsType.value === 'stacked')
    return defaultTabs

  return defaultTabs.map(tab => ({ ...tab, title: '' }))
})
</script>

<template>
  <!-- ℹ️ `min-h-118px` class is to avoid height jerk  -->
  <div class="min-h-118px">
    <div class="flex gap-4 mb-4">
      <ARadio
        v-for="iconType in iconTypes"
        :key="iconType"
        v-model="iconsType"
        :value="iconType"
        :name="iconType"
        :label="iconType"
      />
    </div>
    <ATabs
      :key="iconsType"
      class="a-tabs-bordered"
      :tabs="tabs"
      :stacked-tabs="iconsType === 'stacked'"
    />
  </div>
</template>

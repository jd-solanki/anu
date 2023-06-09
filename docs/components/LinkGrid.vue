<script setup lang="ts">
import type { Integration } from '../.vitepress/integrations'

defineProps<{
  items: Integration[]
}>()
</script>

<template>
  <!-- Thanks: // Thanks: https://github.com/unocss/unocss/blob/main/docs/.vitepress/theme/components/LinkGrid.vue -->
  <div class="flex flex-wrap gap-4">
    <a
      v-for="item of items"
      :key="item.name"
      :href="item.link"
      :target="item.target"
      class="Link w-30 h-30 text-center text-inherit flex flex-col items-center justify-center"
    >
      <div
        v-if="item.icon.startsWith('i')"
        :class="item.icon"
        class="w-10 h-10 mb2"
      />
      <img
        v-else
        :src="item.icon"
        class="w-10 h-10 mb-2"
      >
      <span class="text-sm">{{ item.name }}</span>
      <span class="text-xs opacity-50">{{ item.secondary }}</span>
    </a>
  </div>
</template>

<style scoped>
.Link {
  color: inherit !important;
  text-decoration: none !important;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  background-color: hsl(var(--a-surface-c));
  transition: border-color 0.25s, background-color 0.25s;
}
.Link:hover {
  color: var(--vp-c-brand) !important;
  border-color: var(--vp-c-brand) !important;
}
</style>

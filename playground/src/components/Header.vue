<script setup lang="ts">
import { ASelect } from 'anu-vue'
import type { ComputedRef } from 'vue'
import AnuLogo from '@/assets/logo.svg'
import {
  getSupportedAnuVersions,
  getSupportedVueVersions,
} from '@/utils/dependency'
import type { ReplStore, VersionKey } from '@/composables/store'

const { store } = defineProps<{
  store: ReplStore
}>()
const dark = useDark()
const toggleDark = useToggle(dark)
const message = useMessage()

interface Version {
  text: string
  published: ComputedRef<{ text: string; value: string }[]>
  active: string
}

const versions = reactive<Record<VersionKey, Version>>({
  anuVue: {
    text: 'Anu',
    published: getSupportedAnuVersions(),
    active: store.versions.anuVue,
  },
  vue: {
    text: 'Vue',
    published: getSupportedVueVersions(),
    active: store.versions.vue,
  },
})

async function setVersion(key: VersionKey, v: string) {
  versions[key].active = 'loading...'
  await store.setVersion(key, v)
  versions[key].active = v
}

async function copyLink() {
  await navigator.clipboard.writeText(location.href)
  message({
    content: 'Sharable URL has been copied to clipboard.',
    color: 'success',
  })
}
</script>

<template>
  <nav class="navbar">
    <div class="m-0 flex items-center font-medium">
      <div class="lt-sm-hidden items-center">
        <div class="text-xl flex items-center cursor-pointer">
          <img
            :src="AnuLogo"
            alt="anu logo"
            class="w-8"
          >
          <span class="ml-3">
            Anu Play
          </span>
        </div>
      </div>
    </div>

    <div class="flex flex-gap-2 items-center">
      <div
        v-for="(v, key) of versions"
        :key="key"
        class="flex flex-gap-2 items-center lt-lg-hidden"
      >
        <span>{{ v.text }} Version:</span>
        <ASelect
          :model-value="v.active"
          :options="v.published"
          @update:model-value="setVersion(key, $event)"
        />
      </div>

      <div class="flex flex-gap-4">
        <button
          class="text-lg i-ri-share-line"
          @click="copyLink"
        />
        <button
          class="text-lg i-ri-sun-line dark:i-ri-moon-line"
          @click="toggleDark()"
        />
        <a
          href="https://github.com/jd-solanki/anu"
          target="_blank"
          class="flex"
        >
          <button
            title="View on GitHub"
            class=" text-lg i-ri-github-fill"
          />
        </a>
      </div>
    </div>
  </nav>
</template>

<style>
.navbar {
  --nav-bg: #fff;
  --nav-border: rgba(60, 60, 67, .12);
  --at-apply: 'box-border flex justify-between px-4 z-999 relative';

  border-bottom: 1px solid var(--nav-border);
  height: var(--nav-height);
  background-color: var(--nav-bg);
}

.dark .navbar {
  --nav-bg: #1a1a1a;
  --nav-border: #383838;

  --at-apply: 'shadow-none';
  border-bottom: 1px solid var(--nav-border);
}
</style>

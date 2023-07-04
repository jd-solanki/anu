<script setup lang="ts">
import { Repl } from '@vue/repl'
import { ALoader } from 'anu-vue'
import Monaco from '@vue/repl/monaco-editor'
import Header from '@/components/Header.vue'

const loading = ref(true)
const dark = useDark()
const store = useStore({
  serializedState: location.hash.slice(1),
})

store.init().then(() => (loading.value = false))

// eslint-disable-next-line no-console
console.log('Store:', store)

// persist state
watchEffect(() =>
  history.replaceState({}, '', `#${store.serialize()}`),
)
</script>

<template>
  <div v-if="!loading">
    <Header :store="store" />
    <div class="repl-container">
      <Repl
        ref="repl"
        :theme="dark ? 'dark' : 'light'"
        :editor="Monaco"
        :store="store"
        :show-compile-output="true"
        :auto-resize="true"
        :clear-console="false"
      />
    </div>
  </div>
  <template v-else>
    <ALoader
      :loading="loading"
      full-page
    />
    <div class="h-100vh" />
  </template>
</template>

<style>
body {
  --at-apply: m-none text-14px;
}

.repl-container {
  height: calc(100vh - var(--nav-height));
}

.vue-repl {
  --color-branding: rgb(155, 85, 253)!important;
  --color-branding-dark: rgb(155, 85, 253)!important;
}
</style>

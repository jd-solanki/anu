<script setup lang="ts">
import { Repl } from '@vue/repl'
import {ALoader} from "anu-vue";
import useMessage from "@/composables/useMessage";
import Header from '@/components/Header.vue'
import { IS_DEV } from './constants'
import { genCdnLink } from './utils/dependency'

import type { UserOptions } from '@/composables/store'
import type { BuiltInParserName, format } from 'prettier'
import type { SFCOptions } from '@vue/repl'
import type { Fn } from '@vueuse/core'
import type { default as parserHtml } from 'prettier/parser-html'
import type { default as parserTypescript } from 'prettier/parser-typescript'
import type { default as parserBabel } from 'prettier/parser-babel'
import type { default as parserPostcss } from 'prettier/parser-postcss'

const loading = ref(true)

// enable experimental features
const sfcOptions: SFCOptions = {
  script: {
    reactivityTransform: true,
  },
}

const initialUserOptions: UserOptions = {}

const store = useStore({
  serializedState: location.hash.slice(1),
  userOptions: initialUserOptions,
})

store.init().then(() => (loading.value = false))

if (!store.pr && store.userOptions.value.styleSource) {
  store.pr = store.userOptions.value.styleSource.split('-', 2)[1]
}
// eslint-disable-next-line no-console
console.log('Store:', store)

const handleKeydown = (evt: KeyboardEvent) => {
  if ((evt.ctrlKey || evt.metaKey) && evt.code === 'KeyS') {
    evt.preventDefault()
    return
  }

  if ((evt.altKey || evt.ctrlKey) && evt.shiftKey && evt.code === 'KeyF') {
    evt.preventDefault()
    formatCode()
    return
  }
}

let prettier:
  | [
    typeof format,
    typeof parserHtml,
    typeof parserTypescript,
    typeof parserBabel,
    typeof parserPostcss
  ]
  | undefined
const loadPrettier = async () => {
  const load = (path: string) =>
    import(/* @vite-ignore */ genCdnLink('prettier', '2', `/esm/${path}`))
  if (!prettier)
    prettier = await Promise.all([
      load('standalone.mjs').then((r) => r.default.format),
      load('parser-html.mjs').then((m) => m.default),
      load('parser-typescript.mjs').then((m) => m.default),
      load('parser-babel.mjs').then((m) => m.default),
      load('parser-postcss.mjs').then((m) => m.default),
    ])
  return prettier
}

const formatCode = async () => {
  let close: Fn | undefined
  if (!prettier) {
    const message = useMessage()
    close = message({content: 'Loading Prettier', duration: 0}).handler.close
  }

  const [
    format,
    parserHtml,
    parserTypeScript,
    parserBabel,
    parserPostcss
  ] = await loadPrettier()

  close?.()

  const file = store.state.activeFile
  let parser: BuiltInParserName
  if (file.filename.endsWith('.vue')) {
    parser = 'vue'
  } else if (file.filename.endsWith('.js')) {
    parser = 'babel'
  } else if (file.filename.endsWith('.ts')) {
    parser = 'typescript'
  } else if (file.filename.endsWith('.json')) {
    parser = 'json'
  } else {
    return
  }
  file.code = format(file.code, {
    parser,
    plugins: [parserHtml, parserTypeScript, parserBabel, parserPostcss],
    semi: false,
    singleQuote: true,
  })
}

// persist state
watchEffect(() => history.replaceState({}, '', `#${store.serialize()}`))
</script>

<template>
  <div v-if="!loading">
    <Header :store="store" />
    <Repl
      ref="repl"
      :store="store"
      :show-compile-output="true"
      :auto-resize="true"
      :sfc-options="sfcOptions"
      :clear-console="false"
      :show-import-map="store.userOptions.value.showHidden || IS_DEV"
      @keydown="handleKeydown"
    />
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

.vue-repl {
  --color-branding: rgb(155, 85, 253)!important;
  --color-branding-dark: rgb(155, 85, 253)!important;
  height: calc(100vh - var(--nav-height));
}
</style>

import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import type { ModuleOptions } from '@nuxt/schema'
import type { Plugin as VuePlugin } from 'vue'

import { anu } from 'anu-vue'

const plugin: VuePlugin = {
  install: (app, _options: ModuleOptions) => {
    app.use(anu)
  },
}

export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig()?.public?.anu
  nuxtApp.vueApp.use(plugin, config)
})


import { anu } from 'anu-vue'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig()?.public?.anu || {}
  nuxtApp.vueApp.use(anu, config)
})


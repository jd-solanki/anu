import { anu } from 'anu-vue'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(anu)
})
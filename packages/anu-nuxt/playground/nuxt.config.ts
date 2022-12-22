import { defineNuxtConfig } from 'nuxt/config'

import anu from '..'

export default defineNuxtConfig({
  modules: [anu, '@unocss/nuxt'],
  css: ['@anu-vue/preset-theme-default/dist/style.scss'],
})

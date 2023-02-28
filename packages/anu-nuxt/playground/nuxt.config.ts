import { defineNuxtConfig } from 'nuxt/config'

import anu from '..'

export default defineNuxtConfig({
  modules: [anu, '@unocss/nuxt', '@nuxt/devtools'],
  anu: {
    themes: {
      light: {
        colors: {
          primary: '350, 73%, 66.3%',
        },
      },
    },
  },
})

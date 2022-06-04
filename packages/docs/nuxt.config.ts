import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  vite: {
    optimizeDeps: {
      exclude: [
        '@unocss/preset-icons',
        '@unocss/preset-uno',
        '@unocss/transformer-variant-group',
        'anu-vue',
      ],
    },
  },
  modules: [
    '@unocss/nuxt',
    '@nuxt/content',
  ],
})

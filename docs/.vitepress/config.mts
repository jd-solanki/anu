import { AnuComponentResolver } from '@anu-vue/core';
import Container from 'markdown-it-container';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import VueDevTools from 'vite-plugin-vue-devtools';
import { defineConfig } from 'vitepress';

const isDev = process.env.NODE_ENV !== 'production'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Anu',
  description: 'DX focused utility based vue component library',
  head: [
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600&display=swap' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap' }],
  ],
  srcDir: 'src',
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: 'Guide', link: '/guide/components/accordion', activeMatch: '/guide/' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present JD Solanki',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/jd-solanki/anu' },
      { icon: 'discord', link: 'https://discord.gg/8MTQuasmZf' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '📦&nbsp;&nbsp; Components',
          collapsed: false,
          items: [
            { text: 'Accordion', link: '/guide/components/accordion' },
          ],
        },
      ],
    },

    // ℹ️ We'll enable this after we develop the site
    // algolia: {
    //   appId: 'ZIRXGNDXKY',
    //   apiKey: '20424a4612bfde26fb4920f451c19cbc',
    //   indexName: 'anu-vue',
    // },
    
  },
  markdown: {
    // ℹ️ We only enabled this in development so that we can highlight code lines by seeing line number without calculating it in our editor.
    lineNumbers: isDev,
    theme: {
      light: 'vitesse-light',
      dark: 'dracula',
    },
    config: md => {
      md.use(Container, 'card', {
        render: (tokens, idx) => {
          const token = tokens[idx]

          const title = token.info.trim().slice(5).trim()

          const isCardBordered = token.attrs && token.attrs.some(([key, _]) => key === 'bordered')

          const titleHtml = md.render(`## ${title}`)
          const demoContent = title ? `<template #title>${titleHtml}</template>` : ''

          return token.nesting === 1 ? `<Demo :class="[${isCardBordered} && 'vp-demo-bordered']">${demoContent}` : '</Demo>\n'
        },
      })

      md.use(Container, 'code', {
        render: (tokens, idx) => {
          const token = tokens[idx]

          // console.log('token :>> ', token)
          const demoName = token.info.trim().slice(5).trim()

          return token.nesting === 1 ? `<template #demo><${demoName} /></template><template #code>` : '</template>\n'
        },
      })

      md.use(Container, 'after-demo', {
        render: (tokens, idx) => {
          const token = tokens[idx]

          return token.nesting === 1 ? '<template #after-demo>' : '</template>\n'
        },
      })
    },
  },
  vite: {
    plugins: [
      VueDevTools(),
      Components({
        dirs: [
          path.resolve(__dirname, '../src/components/')
        ],
        deep: true,
        directoryAsNamespace: true,
        extensions: ['vue', 'md'],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: path.resolve(__dirname, '../components.d.ts'),
        resolvers: [
          AnuComponentResolver(),
        ],
      }),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
        ],
      }),
    ],
  },
})

import { fileURLToPath } from 'url'
import Container from 'markdown-it-container'
import Unocss from 'unocss/vite'
import type { DefaultTheme } from 'vitepress'
import { defineConfig } from 'vitepress'

const nav: DefaultTheme.Config['nav'] = [
  {
    text: 'Development',
    items: [
      { text: 'Contributing', link: '/development/contributing' },
    ],
  },
]

if (process.env.NODE_ENV !== 'production')
  nav.push({ text: 'Playground', link: '/playground' })

export default defineConfig({
  title: 'Anu',
  description: 'DX focused utility based vue component library',
  themeConfig: {
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present JD Solanki',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/jd-solanki/anu' },
      { icon: 'discord', link: 'https://discord.gg/8MTQuasmZf' },
    ],
    nav,
    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/getting-started/' },
            { text: 'Installation', link: '/guide/getting-started/installation' },
            { text: 'Customization', link: '/guide/getting-started/customization' },
            { text: 'Grid', link: '/guide/getting-started/grid' },
          ],
        },
        {
          text: 'Features',
          items: [
            { text: 'Presets', link: '/guide/features/presets' },
            { text: 'DX Focused', link: '/guide/features/dx-focused' },
            { text: 'Arbitrary Sizes', link: '/guide/features/arbitrary-sizes' },
            { text: 'Spacing', link: '/guide/features/spacing' },
          ],
        },
        {
          text: 'Components',
          items: [
            { text: 'Alert', link: '/guide/components/alert' },
            { text: 'Avatar', link: '/guide/components/avatar' },
            { text: 'Badge', link: '/guide/components/badge' },
            { text: 'Button', link: '/guide/components/button' },
            { text: 'Card', link: '/guide/components/card' },
            { text: 'Checkbox', link: '/guide/components/checkbox' },
            { text: 'Chip', link: '/guide/components/chip' },
            { text: 'Dialog', link: '/guide/components/dialog' },
            { text: 'Drawer', link: '/guide/components/drawer' },
            { text: 'Input', link: '/guide/components/input' },
            { text: 'List', link: '/guide/components/list' },
            { text: 'Menu', link: '/guide/components/menu' },
            { text: 'Radio', link: '/guide/components/radio' },
            { text: 'Rating', link: '/guide/components/rating' },
            { text: 'Select', link: '/guide/components/select' },
            { text: 'Switch', link: '/guide/components/switch' },
            { text: 'Table', link: '/guide/components/table' },
            { text: 'Textarea', link: '/guide/components/textarea' },
          ],
        },
        {
          text: 'Base Components',
          items: [
            // { text: 'Base Input', link: '/guide/base-components/base-input' },
            { text: 'Typography', link: '/guide/base-components/typography' },
          ],
        },
        {
          text: 'Composables',
          items: [
            // { text: 'useSearch', link: '/guide/composables/useSearch' },
            // { text: 'useSort', link: '/guide/composables/useSort' },
            { text: 'useGroupModel', link: '/guide/composables/useGroupModel' },
          ],
        },
      ],
    },
    algolia: {
      appId: 'ZIRXGNDXKY',
      apiKey: '20424a4612bfde26fb4920f451c19cbc',
      indexName: 'anu-vue',
    },
  },
  markdown: {
    theme: 'dracula',
    config: md => {
      md.use(Container, 'card', {
        render: (tokens, idx) => {
          const token = tokens[idx]

          // console.log('token :>> ', token)

          const title = token.info.trim().slice(5).trim()
          const titleHtml = md.render(`## ${title}`)

          return token.nesting === 1 ? `<Demo>${titleHtml}` : '</Demo>\n'
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
    },
  },
  vite: {
    plugins: [
      Unocss({
        configFile: '../../uno.config.ts',
      }),
    ],
    resolve: {
      alias: {
        '@anu': fileURLToPath(new URL('../../packages/anu-vue', import.meta.url)),
      },
    },
  },
})

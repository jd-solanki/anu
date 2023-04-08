import Container from 'markdown-it-container'
import { fileURLToPath } from 'node:url'
import Unocss from 'unocss/vite'
import type { DefaultTheme } from 'vitepress'
import { defineConfig } from 'vitepress'

const isDev = process.env.NODE_ENV !== 'production'

const nav: DefaultTheme.Config['nav'] = [
  { text: 'Guide', link: '/guide/getting-started/installation', activeMatch: '/guide/' },
  { text: 'Anu UI', link: '/ui/introduction', activeMatch: '/ui/' },
  {
    text: 'Development',
    items: [
      { text: 'Contributing', link: '/development/contributing' },
    ],
  },
]

if (isDev)
  nav.push({ text: 'Playground', link: '/playground' })

export default defineConfig({
  title: 'Anu',
  description: 'DX focused utility based vue component library',
  head: [
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap', rel: 'stylesheet' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap', rel: 'stylesheet' }],
  ],
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
          text: '🚀&nbsp;&nbsp; Getting Started',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/guide/getting-started/' },
            { text: 'Installation', link: '/guide/getting-started/installation' },
            { text: 'Customization', link: '/guide/getting-started/customization' },
            { text: 'Grid', link: '/guide/getting-started/grid' },
            { text: 'Edge Releases', link: '/guide/getting-started/edge-releases' },
          ],
        },
        {
          text: '✨&nbsp;&nbsp; Features',
          collapsed: false,
          items: [
            { text: 'Presets', link: '/guide/features/presets' },
            { text: 'DX Focused', link: '/guide/features/dx-focused' },
            { text: 'Arbitrary Sizes', link: '/guide/features/arbitrary-sizes' },
            { text: 'Spacing', link: '/guide/features/spacing' },
            { text: 'Theme', link: '/guide/features/theme' },
            { text: 'Transitions', link: '/guide/features/transitions' },
          ],
        },
        {
          text: '📦&nbsp;&nbsp; Components',
          collapsed: false,
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
            { text: 'Loader', link: '/guide/components/loader' },
            { text: 'Menu', link: '/guide/components/menu' },
            { text: 'Radio', link: '/guide/components/radio' },
            { text: 'Rating', link: '/guide/components/rating' },
            { text: 'Select', link: '/guide/components/select' },
            { text: 'Switch', link: '/guide/components/switch' },
            { text: 'Table', link: '/guide/components/table' },
            { text: 'Tabs', link: '/guide/components/tabs' },
            { text: 'Textarea', link: '/guide/components/textarea' },
            { text: 'Tooltip', link: '/guide/components/tooltip' },
          ],
        },
        {
          text: '🌱&nbsp;&nbsp; Base Components',
          collapsed: false,
          items: [
            // { text: 'Base Input', link: '/guide/base-components/base-input' },
            { text: 'Typography', link: '/guide/base-components/typography' },
            { text: 'Views', link: '/guide/base-components/views' },
          ],
        },
        {
          text: '🎛&nbsp;&nbsp; Composables',
          collapsed: false,
          items: [
            // { text: 'useSearch', link: '/guide/composables/useSearch' },
            // { text: 'useSort', link: '/guide/composables/useSort' },
            { text: 'useAnu', link: '/guide/composables/useAnu' },
            { text: 'useGroupModel', link: '/guide/composables/useGroupModel' },
            { text: 'useIndeterminateCheckbox', link: '/guide/composables/useIndeterminateCheckbox' },
          ],
        },
      ],
      '/ui/': [
        {
          text: '🎨&nbsp;&nbsp; UI',
          items: [
            {
              text: 'Introduction',
              link: '/ui/introduction',
            },
            {
              text: 'Cards',
              link: '/ui/cards',
            },
            {
              text: 'Form',
              link: '/ui/form',
            },
            {
              text: 'Misc',
              link: '/ui/misc',
            },
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
    // ℹ️ We only enabled this in development so that we can highlight code lines by seeing line number without calculating it in our editor.
    lineNumbers: isDev,
    theme: 'dracula',
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

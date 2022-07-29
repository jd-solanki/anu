import Unocss from 'unocss/vite'
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Anu',
  description: 'DX focused utility based vue component library',
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/jd-solanki/anu' },
    ],
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
          text: 'Components',
          items: [
            { text: 'Alert', link: '/guide/components/alert' },
            { text: 'Avatar', link: '/guide/components/avatar' },
            { text: 'Button', link: '/guide/components/button' },
            { text: 'Card', link: '/guide/components/card' },
            { text: 'Checkbox', link: '/guide/components/checkbox' },
            { text: 'Dialog', link: '/guide/components/dialog' },
            { text: 'Input', link: '/guide/components/input' },
            { text: 'Radio', link: '/guide/components/radio' },
            { text: 'Select', link: '/guide/components/select' },
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
  },
  vite: {
    plugins: [
      Unocss({
        configFile: '../../unocss.config.ts',
      }),
    ],
  },
})

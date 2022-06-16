import Unocss from 'unocss/vite'
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Anu',
  description: 'Atomic vue component library',
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/jd-solanki/anu' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Installation', link: '/guide/getting-started/installation' },
          ],
        },
        {
          text: 'Components',
          items: [
            { text: 'Alert', link: '/guide/components/alert' },
            { text: 'Button', link: '/guide/components/button' },
            { text: 'Input', link: '/guide/components/input' },
            { text: 'Select', link: '/guide/components/select' },
            { text: 'Textarea', link: '/guide/components/textarea' },
            { text: 'Checkbox', link: '/guide/components/checkbox' },
            { text: 'Radio', link: '/guide/components/radio' },
          ],
        },
        {
          text: 'Base Components',
          items: [
            { text: 'Base Input', link: '/guide/base-components/base-input' },
          ],
        },
      ],
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

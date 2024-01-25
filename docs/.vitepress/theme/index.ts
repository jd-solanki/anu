import { anu } from '@anu-vue/core'
import '@anu-vue/tailwind-skin-default/dist/styles.css'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './styles.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(anu, {
      registerComponentsGlobally: true,
      propsDefaults: {
        AAccordionItem: {
          ui: {
            accordionHeader: 'px-4 py-2 bg-gray-900 border-b border-gray-200',
            accordionContent: 'px-4 py-2',
          }
        }
      }
    })
  }
} satisfies Theme
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
            accordionHeader: 'flex',
            accordionTrigger: 'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline',
            accordionItem: 'border-b',
            accordionContent: 'overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
            accordionContentChild: 'pb-4 pt-0',
          },
        },
      },
    })
  },
} satisfies Theme

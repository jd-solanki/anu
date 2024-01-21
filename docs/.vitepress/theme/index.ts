import { anu } from '@anu-vue/core'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(anu, {
      registerComponents: true,
    })
  }
} satisfies Theme
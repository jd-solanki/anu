import '@anu-vue/preset-theme-default/dist/style.css'
import { anu } from 'anu-vue'
import 'anu-vue/dist/style.css'
import 'uno.css'
import DefaultTheme from 'vitepress/theme'
import type { App } from 'vue'
import Api from '../../components/Api.vue'
import Demo from '../../components/Demo.vue'
import { extractFileNameFromPath } from '../../utils'
import './style.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.use(anu, {
      defaults: {
        AAlert: {
          color: 'warning',
          dismissible: true,
          ABtn: {
            variant: 'text',
            class: 'text-sm',
          },
        },
        ATextarea: {
          attrs: {
            placeholder: 'Enter your message here',
          },
        },
      },
    })

    // Register demos as components
    const demos = import.meta.globEager('../../components/demos/**/*.vue')

    for (const path in demos)
      app.component(extractFileNameFromPath(path), demos[path].default)

    // Register UI as components
    const ui = import.meta.globEager('../../components/ui/**/*.vue')

    for (const path in ui)
      app.component(extractFileNameFromPath(path), ui[path].default)

    // Other component registration
    app.component('Demo', Demo)
    app.component('Api', Api)
  },
}

import '@anu-vue/preset-theme-default/dist/style.scss'
import { anu } from 'anu-vue'
import 'anu-vue/dist/style.css'
import 'uno.css'
import DefaultTheme from 'vitepress/theme'
import Api from '../../components/Api.vue'
import Demo from '../../components/Demo.vue'
import { extractFileNameFromPath } from '../../utils'
import './style.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(anu, {
      registerComponents: true,
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

import { anu } from 'anu-vue'
import 'anu-vue/dist/style.css'
import 'uno.css'
import DefaultTheme from 'vitepress/theme'
import Demo from '../../components/Demo.vue'
import { extractFileNameFromPath } from '../../utils'
import './style.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(anu)

    const demos = import.meta.globEager('../../demos/**/*.vue')

    for (const path in demos)
      app.component(extractFileNameFromPath(path), demos[path].default)

    app.component('Demo', Demo)
  },
}

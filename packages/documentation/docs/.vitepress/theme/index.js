import { anu } from 'anu-vue'
import 'anu-vue/dist/style.css'
import 'uno.css'
import DefaultTheme from 'vitepress/theme'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(anu)

    const demos = import.meta.globEager('../../demos/**/*.vue')

    for (const path in demos)
      app.component(path.split('/').at(-1).split('.')[0], demos[path].default)
  },
}

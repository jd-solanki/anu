import { createApp } from 'vue'
import '@unocss/reset/tailwind.css'
import '@vue/repl/style.css'
import { anu } from 'anu-vue'
import App from '@/App.vue'

import '@/styles/style.css'
import 'uno.css'
import 'anu-vue/dist/style.css'
import '@anu-vue/preset-theme-default/dist/style.css'

// @ts-expect-error Custom window property
window.VUE_DEVTOOLS_CONFIG = {
  defaultSelectedAppId: 'repl',
}

const app = createApp(App)
app.use(anu, { registerComponents: false })
app.mount('#app')

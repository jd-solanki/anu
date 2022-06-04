import type { App } from 'vue'
import './scss/index.scss'

declare const plugin: {
  install(app: App): void
}
export { presetCore } from './presets/core'
export { colors as defaultThemeColors, presetThemeDefault } from './presets/theme-default'
export { plugin as anu }

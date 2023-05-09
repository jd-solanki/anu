import '@/scss/index.scss'

// Components
export { AnuComponentResolver } from './componentResolver'
export * from './components'
export * as components from './components'

// Composables
export * from './composables'
export * as composables from './composables'

// Plugin
export { plugin as anu } from './plugin'
export type { PluginOptions, ThemeColors, ThemeOptions as ThemeOption } from './plugin'

// Preset
export { defaultThemeColors, presetAnu } from './preset'
export { presetIconExtraProperties } from './preset/icons'

// Other
export * from './symbols'
export { numRange } from './utils/helpers'

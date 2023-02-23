import '@/scss/index.scss'

export { AnuComponentResolver } from './componentResolver'
export * from './components'
export * from './composables'
export * as composables from './composables'
export { plugin as anu } from './plugin'
export type { PluginOptions, ThemeColors, ThemeOptions as ThemeOption } from './plugin'
export { defaultThemeColors, presetAnu } from './preset'
export * from './symbols'

export const presetIconExtraProperties = {
  'height': '1.2em',
  'width': '1.2em',

  // ℹ️ We also have to find a way to inject this without this config. (e.g. [class^=i-])
  'vertical-align': 'text-top',
  'flex-shrink': '0',
  'display': 'inline-block',
  'backface-visibility': 'hidden',
}

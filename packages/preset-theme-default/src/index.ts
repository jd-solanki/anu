import type { Preset } from '@unocss/core'
import { rules } from './rules'
import { shortcuts } from './shortcuts'
import { variants } from './variants'

interface PresetOptions {
  shortcutOverrides?: Exclude<Preset['shortcuts'], undefined>
}

export function presetThemeDefault(options: PresetOptions = {}): Preset {
  return {
    name: '@anu-vue/preset-theme-default',
    theme: {
      colors: {
        a: { border: 'hsla(var(--a-base-c),var(--a-border-opacity))' },
      },
    },
    rules,
    shortcuts: options.shortcutOverrides === undefined
      ? shortcuts
      : Array.isArray(options.shortcutOverrides)
        ? [...options.shortcutOverrides, ...shortcuts]
        : [...Object.entries(options.shortcutOverrides), ...shortcuts],
    variants,
  }
}

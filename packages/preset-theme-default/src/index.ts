import type { Preset } from '@unocss/core'
import { rules } from './rules'
import { shortcuts } from './shortcuts'
import { variants } from './variants'

export interface PresetOptions {
  shortcutOverrides?: Exclude<Preset['shortcuts'], undefined>
}

export function presetThemeDefault(options: PresetOptions = {}): Preset {
  return {
    name: '@anu-vue/preset-theme-default',
    theme: {
      colors: {
        a: { border: 'hsla(var(--a-base-c),var(--a-border-opacity))' },
      },
      boxShadow: {
        'sm': '0 1px 2px 0 hsla(0, 0%, 0%, 0.1)',
        'DEFAULT': '0 4px 24px 0 hsla(0, 0%, 0%, 0.1)',
        'md': '0 8px 16px 0 hsla(0, 0%, 0%, 0.1)',
        'lg': '0 16px 32px 0 hsla(0, 0%, 0%, 0.1)',
        'xl': '0 24px 48px 0 hsla(0, 0%, 0%, 0.1)',
        '2xl': '0 40px 64px 0 hsla(0, 0%, 0%, 0.1)',
      },
    },
    rules,
    shortcuts: options.shortcutOverrides === undefined
      ? shortcuts
      : Array.isArray(options.shortcutOverrides)
        ? [...options.shortcutOverrides, ...shortcuts]
        : [...shortcuts, ...Object.entries(options.shortcutOverrides)],
    variants,
  }
}

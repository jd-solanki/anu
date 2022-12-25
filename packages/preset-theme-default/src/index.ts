import type { Preset } from '@unocss/core'
import { defu } from 'defu'
import { rules } from './rules'
import { shortcuts } from './shortcuts'
import { variants } from './variants'

// ℹ️ We will need this import to generate the CSS file for preset-theme-default. We are just temporary disabling this.
import './scss/index.scss'

interface PresetOptions {
  shortcutOverrides?: Exclude<Preset['shortcuts'], undefined>
}

// TODO: Pass this to Anu plugin so that it can use the classes defined by theme preset
export const colors = ['primary', 'success', 'info', 'warning', 'danger'] as const
export type Colors = typeof colors

export function presetThemeDefault(options: PresetOptions = {}): Preset {
  return {
    name: '@anu-vue/preset-theme-default',
    theme: {
      colors: {
        primary: 'hsl(var(--a-primary))',
        success: 'hsl(var(--a-success))',
        info: 'hsl(var(--a-info))',
        warning: 'hsl(var(--a-warning))',
        danger: 'hsl(var(--a-danger))',
        a: { border: 'hsla(var(--a-base-color),var(--a-border-opacity))' },
      },
    },
    safelist: [
      ...colors.map(c => `[--a-layer-color:hsla(var(--a-${c}),var(--un-bg-opacity,1))]`),
      ...colors.map(c => `bg-${c}`),
      ...colors.map(c => `hover:bg-${c}`),

      ...colors.map(c => `border-${c}`),
      ...[...colors, '$a-layer-text'].map(c => `text-${c}`),
      ...colors.map(c => `shadow-${c}`),
      ...colors.map(c => `after:bg-${c}`),
      ...colors.map(c => `next:checked:bg-${c}`),
      ...colors.map(c => `next:checked:border-${c}`),

      // Typography
      ...[...colors, 'layer-text', 'white'].map(c => `typography-title-${c}`),
      ...[...colors, 'layer-text', 'white'].map(c => `typography-subtitle-${c}`),
      ...[...colors, 'layer-text', 'white'].map(c => `typography-text-${c}`),
      ...['top', 'right', 'bottom', 'left'].map(dir => `a-drawer-anchor-${dir}`),
    ],
    rules,
    shortcuts: options.shortcutOverrides
      ? defu(options.shortcutOverrides, shortcuts)
      : shortcuts,
    variants,
  }
}

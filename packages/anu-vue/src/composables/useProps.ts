import type { PropType } from 'vue'

export const themeColors = ['primary', 'success', 'info', 'warning', 'danger'] as const
export type ThemeColor = typeof themeColors[number]
export type ColorProp = ThemeColor | undefined

export const color = {
  type: String as PropType<ColorProp>,
  default: undefined,
} as const

export const disabled = {
  type: Boolean,
  default: false,
} as const

export const readonly = {
  type: Boolean,
  default: false,
} as const

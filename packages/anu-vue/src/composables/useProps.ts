import type { PropType } from 'vue'

export const themeColors = ['primary', 'success', 'info', 'warning', 'danger'] as const
export type ThemeColor = typeof themeColors[number]
export type ColorProp = ThemeColor | undefined

export const color = {
  type: String as PropType<ColorProp>,
  default: undefined,
}

export const disabled = {
  type: Boolean,
  default: false,
}

export const readonly = {
  type: Boolean,
  default: false,
}

import type { PropType } from 'vue'

export const themeColors = ['primary', 'success', 'info', 'warning', 'danger'] as const
export type ThemeColor = typeof themeColors[number]
export type ColorProp = ThemeColor | undefined

export const color = {
  type: [String, undefined] as PropType<ColorProp>,
} as const

export const disabled = { type: Boolean } as const

export const readonly = { type: Boolean } as const

export const spacing = { type: Number } as const

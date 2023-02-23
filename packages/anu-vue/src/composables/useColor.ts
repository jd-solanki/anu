import type { MaybeRef } from '@vueuse/core'
import type { ComputedRef, StyleValue } from 'vue'
import { useAnu } from '@/composables/useAnu'
import type { ColorProp } from '@/composables/useProps'

export const isThemeColor = (color: ColorProp | null): ComputedRef<boolean> => computed(() => {
  let activeThemeColors: string[] = []

  const { activeTheme } = useAnu()
  activeThemeColors = Object.keys(activeTheme.value.theme.colors)

  return !!(color && (activeThemeColors as ColorProp[]).includes(color))
})

export const useColor = (color: MaybeRef<ColorProp>, cssVarName: MaybeRef<string>, as: 'text' | 'bg' = 'text') => {
  const styles = computed(() => {
    const _color = unref(color)
    const cssVar = computed(() => `--a-${unref(cssVarName)}`)

    const property = as === 'bg' ? 'background-color' : 'color'
    const _isThemeColor = isThemeColor(_color)

    const _styles = {
      [cssVar.value]: _isThemeColor.value ? `hsl(var(--a-${_color}))` : _color,
      [property]: `var(${cssVar.value})`,
    } as StyleValue

    return _styles
  })

  return {
    styles,
  }
}

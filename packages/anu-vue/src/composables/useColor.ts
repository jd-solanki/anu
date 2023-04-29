import type { MaybeRef } from '@vueuse/core'
import type { ComputedRef, StyleValue } from 'vue'
import { useAnu } from '@/composables/useAnu'
import type { ColorProp } from '@/composables/useProps'

export function isThemeColor(color: ColorProp | null): ComputedRef<boolean> {
  return computed(() => {
    let activeThemeColors: string[] = []

    const { activeTheme } = useAnu()
    activeThemeColors = Object.keys(activeTheme.value.theme.colors)

    return !!(color && (activeThemeColors as ColorProp[]).includes(color))
  })
}

export function useColor(color: MaybeRef<ColorProp>, cssVarName: MaybeRef<string>, as: 'text' | 'bg' = 'text') {
  const styles = computed(() => {
    const _color = unref(color)
    const cssVar = computed(() => `--a-${unref(cssVarName)}`)

    const property = as === 'bg' ? 'background-color' : 'color'
    const _isThemeColor = isThemeColor(_color)

    const _styles = {
      [cssVar.value]: _isThemeColor.value ? `var(--a-${_color})` : _color,
      [property]: `hsla(var(${cssVar.value}), var(${cssVar.value}-opacity, 1))`,
    } as StyleValue

    return _styles
  })

  return {
    styles,
  }
}

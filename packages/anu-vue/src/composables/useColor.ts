import type { MaybeRef } from '@vueuse/core'
import type { StyleValue } from 'vue'
import type { ColorProp } from '@/composables/useProps'

export const useColor = (color: MaybeRef<ColorProp>, cssVarName: MaybeRef<string>, as: 'text' | 'bg' = 'text') => {
  const styles = computed(() => {
    const _color = unref(color)
    const cssVar = computed(() => `--a-${unref(cssVarName)}`)

    const property = as === 'bg' ? 'background-color' : 'color'
    const isThemeColor = ['primary', 'success', 'info', 'warning', 'danger'].includes(_color as string)

    const _styles = {
      [cssVar.value]: isThemeColor ? `hsl(var(--a-${_color}))` : _color,
      [property]: `var(${cssVar.value})`,
    } as StyleValue

    return _styles
  })

  return {
    styles,
  }
}

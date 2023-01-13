import type { MaybeComputedRef } from '@vueuse/core'
import { resolveUnref } from '@vueuse/core'
import type { ColorProp } from './useProps'
import { isThemeColor } from '@/utils/color'

export const useTypographyColor = (color: MaybeComputedRef<ColorProp | null>) => {
  const typographyClasses = computed(() => {
    const _color = resolveUnref(color)
    const _isThemeColor = isThemeColor(_color)
    console.log('_color :>> ', _color, _isThemeColor)
    if (_isThemeColor) {
      return `a-title-${_color} a-subtitle-${_color} a-subtitle-opacity-100`
    }
    else {
      if (_color === null)
        return '[--a-title-opacity:var(--a-text-emphasis-high-opacity)] [--a-title-color:var(--a-base-color)] [--a-subtitle-color:var(--a-base-color)] [--a-subtitle-opacity:var(--a-text-emphasis-light-opacity)]'
    }
  })

  return {
    typographyClasses,
  }
}

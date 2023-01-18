import type { MaybeComputedRef } from '@vueuse/core'
import { resolveUnref } from '@vueuse/core'
import type { ColorProp } from './useProps'
import { isThemeColor } from '@/utils/color'

const calculateColor = (_isThemeColor: boolean, _color: ColorProp | null) => {
  const classes = []
  const styles = []
  if (_isThemeColor) {
    classes.push(`a-title-${_color} a-subtitle-${_color} a-subtitle-opacity-100`)
  }
  else {
    const typographyColor = _color === null ? 'var(--a-base-color)' : _color

    styles.push(`--a-title-color: ${typographyColor}; --a-subtitle-color: ${typographyColor}`)
    classes.push(
      _color === null
        ? '[--a-title-opacity:var(--a-text-emphasis-high-opacity)] [--a-subtitle-opacity:var(--a-text-emphasis-light-opacity)]'
        : 'a-subtitle-opacity-100',
    )
  }

  return {
    classes,
    styles,
  }
}

export const useTypographyColor = (color: MaybeComputedRef<ColorProp | null>) => {
  const classes = ref([])
  const styles = ref([])

  const _color = resolveUnref(color)
  const _isThemeColor = isThemeColor(_color)

  // const {} = calculateColor(_isThemeColor, _color)

  return {
    classes,
    styles,

    // typographyClasses,
  }
}

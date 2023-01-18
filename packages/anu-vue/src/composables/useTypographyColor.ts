import type { MaybeComputedRef } from '@vueuse/core'
import { resolveUnref } from '@vueuse/core'
import type { ColorProp } from './useProps'
import { isThemeColor } from '@/utils/color'

const calculateColor = (_isThemeColor: boolean, _color: ColorProp | null, _variant: string) => {
  const classes = []
  const styles = []
  if (_isThemeColor) {
    classes.push('a-subtitle-opacity-100')
    if (_variant !== 'fill')
      classes.push(`a-title-${_color} a-subtitle-${_color}`)
    else
      styles.push('--a-title-color: white; --a-subtitle-color: white')
  }
  else {
    const typographyColor = _color === null ? 'var(--a-base-color)' : _color

    styles.push(`--a-title-color: ${typographyColor}; --a-subtitle-color: ${typographyColor};`)
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

export const useTypographyColor = (color: MaybeComputedRef<ColorProp | null>, variant: MaybeComputedRef<string>) => {
  const typographyClasses = ref<string[]>([])
  const typographyStyles = ref<string[]>([])

  const _color = resolveUnref(color)
  const _variant = resolveUnref(variant)
  const _isThemeColor = isThemeColor(_color)

  watch([() => color, () => variant], () => {
    const calculatedColor = calculateColor(_isThemeColor, _color, _variant)
    typographyClasses.value = calculatedColor.classes
    typographyStyles.value = calculatedColor.styles
  }, { immediate: true })

  return {
    typographyClasses,
    typographyStyles,

    // typographyClasses,
  }
}

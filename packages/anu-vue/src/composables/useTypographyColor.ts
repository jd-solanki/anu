import type { MaybeRefOrGetter } from '@vueuse/core'
import { toValue } from '@vueuse/core'
import type { ColorProp } from './useProps'
import { colord } from '@/utils/colord'
import { isThemeColor } from '@/composables/useColor'

function calculateColor(_isThemeColor: boolean, _color: ColorProp | null, _variant: string) {
  const classes = []
  const styles = []

  /**
   * If it's theme color update the color accordingly and set title & subtitle opacity to 1
   * Else
   *  If color is `undefined` => Don't do anything let typography inherit the styles from parent
   *  Color is null => Reset styling to initial => 0.87 opacity for title & .38 for subtitle
   */

  if (_isThemeColor) {
    classes.push('a-title-opacity-100 a-subtitle-opacity-100')
    if (_variant !== 'fill')
      classes.push(`a-title-${_color} a-subtitle-${_color}`)
    else
      styles.push('--a-title-c: 0, 0%, 100%; --a-subtitle-c: 0, 0%, 100%') // white
  }
  else if (_color !== undefined) {
    const typographyC = _color === null ? 'var(--a-base-c)' : colord(_color).toHslValue()

    styles.push(`--a-title-c: ${typographyC}; --a-subtitle-c: ${typographyC};`)
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

export function useTypographyColor(color: MaybeRefOrGetter<ColorProp | null>, variant: MaybeRefOrGetter<string>) {
  const typographyClasses = ref<string[]>([])
  const typographyStyles = ref<string[]>([])

  const _color = toValue(color)
  const _variant = toValue(variant)
  const _isThemeColor = isThemeColor(_color)

  watch([() => color, () => variant], () => {
    const calculatedColor = calculateColor(_isThemeColor.value, _color, _variant)
    typographyClasses.value = calculatedColor.classes
    typographyStyles.value = calculatedColor.styles
  }, { immediate: true })

  return {
    typographyClasses,
    typographyStyles,

    // typographyClasses,
  }
}

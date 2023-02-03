import type { MaybeRef } from '@vueuse/core'
import { defu } from 'defu'
import type { ComponentObjectPropsOptions } from 'vue'
import { ref, unref, watch } from 'vue'
import type { ColorProp } from '@/composables/useProps'
import { color } from '@/composables/useProps'
import { useTypographyColor } from '@/composables/useTypographyColor'
import { isThemeColor } from '@/utils/color'
import { colord } from '@/utils/colord'

export interface LayerProps {
  color: ColorProp
  variant: 'fill' | 'outline' | 'light' | 'text'
  states: boolean
}

// Thanks: https://youtu.be/a_m7jxrTlaw
// type LooseAutocomplete<T extends string> = T | Omit<string, T>

// TODO: Use `useColor` composable to removed the color calculation
export const useProps = (propOverrides?: Partial<ComponentObjectPropsOptions>) => {
  let props = {
    /**
     * Layer color
     */
    color,

    /**
     * Layer variant
     */
    variant: {
      type: String,

      // validator: (value: string) => ['fill', 'outline', 'light', 'text'].includes(value),
      default: 'text',
    },

    /**
     * Interaction states like hover & active
     */
    states: {
      type: Boolean,
      default: false,
    },
  }

  if (propOverrides)
    props = defu(propOverrides, props) as typeof props

  return props
}

interface UseLayerConfig {
  statesClass?: string
}
export const useLayer = () => {
  // TODO(TS): Improve typing
  const computeClassesStyles = (propColor: ColorProp, propVariant: string, propsStates: boolean, config: UseLayerConfig = {}) => {
    // 👉 Styles
    const styles = []

    // 👉 Classes
    const _config = defu(config, { statesClass: 'states' })
    const classes: any[] = [
      propsStates && _config.statesClass,
    ]

    // Handle typography for card
    const { typographyClasses, typographyStyles } = useTypographyColor(propColor, propVariant)

    classes.push(typographyClasses.value)
    styles.push(typographyStyles.value)

    const _isThemeColor = isThemeColor(propColor)

    /*
      ❗ Below code is intentionally not DRY.

      Frequently we are visiting useLayer composable while building new component. Hence, we made it:
        - Simple to understand
        - Easy to read
        - Quicker to update

      We also have colord as dependency for now. We might remove this in future once Anu is more popular and mature.
    */

    // ℹ️ For light variant we will keep the overlay color of `--a-layer` instead of adopting the layer color. We will add it regardless of its theme color or not.
    if (propVariant === 'light') {
      // Set loader typography's title & subtitle opacity to 1
      classes.push('[&_.a-loader-overlay]-[--a-title-opacity:1] [&_.a-loader-overlay]-[--a-subtitle-opacity:1] [--a-loader-overlay-bg-opacity:.85]')

      // Loader overlay
      styles.push({ '--a-loader-overlay-bg': 'hsla(0, 0%, 100%,var(--a-loader-overlay-bg-opacity))' })
    }

    /*
      ℹ️ Outline & Text variant
        For overlay bg, We can create use style: `background-color:hsla(var(--a-surface),var(--a-background))`,
        where `--a-background` will be body bg. Moreover, when card is used we will add new style `--a-surface:--a-layer-color` (_bg color of card_)

        With above, if component with outline variant will get correct overlay bg regardless of component is used inside card or outside of it.
        ATM, If outline component is placed on body (_gray bg_) then it will get white overlay bg
    */

    if (_isThemeColor) {
      styles.push({ '--a-layer': `var(--a-${propColor})` })

      if (propVariant === 'fill') {
        // Background
        styles.push({ background: 'hsla(var(--a-layer),var(--a-layer-opacity,var(--un-bg-opacity)))' })
        classes.push('[--un-bg-opacity:1]')

        // Text
        if (propColor !== undefined && propColor !== null)
          classes.push('text-white')

        // Loader overlay
        styles.push({ '--a-loader-overlay-bg': 'hsla(var(--a-layer),var(--a-loader-overlay-bg-opacity))' })
      }

      else if (propVariant === 'light') {
        // Background
        styles.push({ background: 'hsla(var(--a-layer),var(--a-layer-opacity,var(--un-bg-opacity)))' })
        classes.push('[--a-layer-opacity:0.15]')

        // text
        if (propColor !== undefined && propColor !== null)
          classes.push(`text-${propColor}`)

        // We have set loader overlay color above (before _isThemeColor condition)
      }

      else if (propVariant === 'outline') {
        // Border
        classes.push('border-width-1', 'border-solid')
        styles.push({ borderColor: 'hsl(var(--a-layer)' })

        // Text
        if (propColor !== undefined && propColor !== null)
          classes.push('text-[hsl(var(--a-layer))]')

        // Loader overlay
        styles.push({ '--a-loader-overlay-bg': 'inherit' })
      }

      else if (propVariant === 'text') {
        // Text
        if (propColor !== undefined && propColor !== null)
          classes.push('text-[hsl(var(--a-layer))]')

        // Loader overlay
        styles.push({ '--a-loader-overlay-bg': 'inherit' })
      }
    }
    else if (propColor) {
      const _colord = colord(propColor as string)

      styles.push({ '--a-layer': _colord.toHslString().replace(/hsla?\(([\d\s]+,[\d\s]+%,[\d\s]+%).*/gm, '$1') })

      if (propVariant === 'fill') {
        // Background
        styles.push({ background: 'hsla(var(--a-layer),var(--a-layer-opacity,var(--un-bg-opacity)))' })
        classes.push('[--un-bg-opacity:1]')

        // Text
        if (propColor !== undefined && propColor !== null)
          styles.push({ color: _colord.contrasting().toHslString() })

        // Loader overlay
        if (propColor)
          styles.push({ '--a-loader-overlay-bg': _colord.toHslString() })
      }
      else if (propVariant === 'light') {
        // Background
        const _hslaColor = _colord.toHsl()
        styles.push({ background: `hsla(${_hslaColor.h}, ${_hslaColor.s}%, ${_hslaColor.l}%, 0.15)` })

        // Text
        if (propColor !== undefined && propColor !== null)
          styles.push({ color: propColor })

        // We have set loader overlay color above (before _isThemeColor condition)
      }
      else if (propVariant === 'outline') {
        // Border
        classes.push('border-width-1', 'border-solid')
        styles.push({ borderColor: propColor })

        // Text
        if (propColor !== undefined && propColor !== null)
          styles.push({ color: propColor })

        // Loader overlay
        styles.push({ '--a-loader-overlay-bg': 'hsl(var(--a-layer))' })
      }
      else if (propVariant === 'text') {
        // Text
        if (propColor !== undefined && propColor !== null)
          styles.push({ color: propColor })

        // Loader overlay
        styles.push({ '--a-loader-overlay-bg': 'hsl(var(--a-layer))' })
      }
    }

    return {
      styles,
      classes,
    }
  }

  // TODO: Even if params are MaybeRef, we still has to pass refs. E.g. In ARating can't passing static values.
  const getLayerClasses = (propColor: MaybeRef<ColorProp>, propVariant: MaybeRef<string>, propsStates: MaybeRef<boolean>, config?: MaybeRef<UseLayerConfig>) => {
    const classes = ref<any>([])
    const styles = ref<any>([])

    watch([propColor, propVariant, propsStates, () => unref(config)], () => {
      const { classes: _classes, styles: _styles } = computeClassesStyles(unref(propColor), unref(propVariant), unref(propsStates), unref(config))
      classes.value = _classes
      styles.value = _styles
    }, { immediate: true })

    return {
      classes,
      styles,
    }
  }

  return {
    getLayerClasses,
  }
}

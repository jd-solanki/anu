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

    const _colord = colord(propColor)

    // Handle typography for card
    const { typographyClasses, typographyStyles } = useTypographyColor(propColor, propVariant)

    // console.log('typographyClasses :>> ', typographyClasses.value)
    // console.log('typographyStyles :>> ', typographyStyles.value)
    classes.push(typographyClasses.value)
    styles.push(typographyStyles.value)

    const _isThemeColor = isThemeColor(propColor)

    // const hslaColor = (() => {
    //   if (_isThemeColor)
    //     return propColor

    //   const hsla = _colord.toHsl()

    //   styles.push({ '--a-layer-hsl': `hsl(${hsla.h},${hsla.s}%,${hsla.l})%` })

    //   return `hsla(${hsla.h},${hsla.s}%,${hsla.l}%,${hsla.a * 100}%)`
    // })()

    styles.push({ '--a-layer-hsl-color': _isThemeColor ? `var(--a-${propColor})` : _colord.toHslString().replace(/hsla?\(([\d\s]+,[\d\s]+%,[\d\s]+%).*/gm, '$1') })

    /*
      ❗ Below code is intentionally not DRY.

      Frequently we are visiting useLayer composable while building new component. Hence, we made it:
        - Simple to understand
        - Easy to read
        - Quicker to update

      We also have colord as dependency for now. We might remove this in future once Anu is more popular and mature.
    */

    // 👉 Variant: Fill
    if (propVariant === 'fill') {
      if (_isThemeColor) {
        // Background
        styles.push({ background: `hsla(var(--a-${propColor}),var(--un-bg-opacity))` })
        classes.push('[--un-bg-opacity:1]')

        // Text
        if (propColor !== undefined && propColor !== null)
          classes.push('text-white')

        // Loader overlay
        styles.push({ '--a-loader-overlay-bg': `hsla(var(--a-${propColor}),var(--un-bg-opacity))` })
      }
      else {
        // Background
        styles.push({ background: propColor })

        // Text
        if (propColor !== undefined && propColor !== null)
          styles.push({ color: _colord.contrasting().toHslString() })

        // Loader overlay
        if (propColor)
          styles.push({ '--a-loader-overlay-bg': _colord.toHslString() })
      }
    }

    // 👉 Variant: Light
    // ℹ️ For light variant we will keep the overlay color of `--a-layer` instead of adopting the layer color.
    else if (propVariant === 'light') {
      // Set loader typography's title & subtitle opacity to 1
      classes.push('[&_.a-loader-overlay]-[--a-title-opacity:1] [&_.a-loader-overlay]-[--a-subtitle-opacity:1]')

      if (_isThemeColor) {
        // Background
        styles.push({ background: `hsla(var(--a-${propColor}),var(--un-bg-opacity))` })
        classes.push('[--un-bg-opacity:0.15]')

        // text
        if (propColor !== undefined && propColor !== null)
          classes.push(`text-${propColor}`)

        // Loader overlay
        styles.push({ '--a-loader-overlay-bg': 'hsla(var(--a-layer),var(--a-loader-overlay-bg-opacity))' })
      }
      else {
        // Background
        const _hslaColor = _colord.toHsl()
        styles.push({ background: `hsla(${_hslaColor.h}, ${_hslaColor.s}%, ${_hslaColor.l}%, 0.15)` })

        // Text
        if (propColor !== undefined && propColor !== null)
          styles.push({ color: propColor })

        // Loader overlay
        styles.push({ '--a-loader-overlay-bg': 'hsla(var(--a-layer),var(--a-loader-overlay-bg-opacity))' })
      }
    }

    // 👉 Variant: Outline
    /*
      ℹ️ For overlay bg, We can create use style: `background-color:hsla(var(--a-surface),var(--a-background))`,
        where `--a-background` will be body bg. Moreover, when card is used we will add new style `--a-surface:--a-layer-color` (_bg color of card_)

        With above, if component with outline variant will get correct overlay bg regardless of component is used inside card or outside of it.
        ATM, If outline component is placed on body (_gray bg_) then it will get white overlay bg
    */
    else if (propVariant === 'outline') {
      if (_isThemeColor) {
        // Border
        classes.push('border-width-1', 'border-solid')
        styles.push({ borderColor: `hsl(var(--a-${propColor})` })

        // Text
        if (propColor !== undefined && propColor !== null)
          classes.push(`text-${propColor}`)

        // Loader overlay
        styles.push({ '--a-loader-overlay-bg': 'hsl(var(--a-layer))' })
      }
      else {
        // Border
        classes.push('border-width-1', 'border-solid')
        styles.push({ borderColor: propColor })

        // Text
        if (propColor !== undefined && propColor !== null)
          styles.push({ color: propColor })

        // Loader overlay
        styles.push({ '--a-loader-overlay-bg': 'hsl(var(--a-layer))' })
      }
    }

    // 👉 Variant: Text
    // ℹ️ Same info as outline's overlay bg
    else if (propVariant === 'text') {
      if (_isThemeColor) {
        // Text
        if (propColor !== undefined && propColor !== null)
          classes.push(`text-${propColor}`)

        // Loader overlay
        styles.push({ '--a-loader-overlay-bg': 'hsl(var(--a-layer))' })
      }
      else {
        // Text
        if (propColor !== undefined && propColor !== null)
          styles.push({ color: propColor })

        // Loader overlay
        styles.push({ '--a-loader-overlay-bg': 'hsl(var(--a-layer))' })
      }
    }

    // styles.push({ '--a-layer-color': _isThemeColor ? `var(--a-${propColor})` : hslaColor })

    /*
      ℹ️ This is CSS var name

      If theme color
        If variant is fill => white
        Else => passed color
      Else
        string 'layer-text'

      Once we attach the proper class, text color will be handled by CSS variables
    */
    // const textColor = _isThemeColor
    //   ? propVariant === 'fill' ? 'white' : propColor
    //   : 'layer-text'

    // if (propColor) {
    //   // Add text color
    //   if (_isThemeColor) {
    //     if (propVariant === 'fill')
    //       classes.push('text-white')
    //     else
    //       classes.push(`text-${propColor}`)
    //   }
    //   else {
    //     styles.push({
    //       '--a-layer-text': propVariant === 'text' ? 'var(--a-layer-color)' : _colord.contrasting().toHslString(),
    //       'color': 'var(--a-layer-text)',
    //     })
    //   }

    //   // common classes
    //   // classes.push(textClasses)

    //   // Add classes based on variant
    //   if (propVariant === 'text') {
    //     classes.push('text-$a-layer-color')
    //   }
    //   else {
    //     if (propVariant === 'fill')
    //       classes.push('bg-$a-layer-color')
    //     if (propVariant === 'light')
    //       classes.push('bg-$a-layer-color bg-opacity-15')
    //     if (propVariant === 'outline')
    //       classes.push('border-width-1 border-solid border-$a-layer-color')
    //   }
    // }

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

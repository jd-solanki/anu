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

    if (propVariant === 'fill') {
      if (_isThemeColor) {
        // Background
        styles.push({ background: `hsla(var(--a-${propColor}),var(--un-bg-opacity))` })
        classes.push('[--un-bg-opacity:1]')

        // Text
        classes.push('text-white')
      }
      else {
        // Background
        styles.push({ background: propColor })

        // Text
        styles.push({ color: _colord.contrasting().toHslString() })
      }
    }
    else if (propVariant === 'light') {
      if (_isThemeColor) {
        // Background
        styles.push({ background: `hsla(var(--a-${propColor}),var(--un-bg-opacity))` })
        classes.push('[--un-bg-opacity:0.15]')

        // text
        classes.push(`text-${propColor}`)
      }
      else {
        // Background
        const _hslaColor = _colord.toHsl()
        styles.push({ background: `hsla(${_hslaColor.h}, ${_hslaColor.s}%, ${_hslaColor.l}%, 0.15)` })

        // Text
        styles.push({ color: propColor })
      }
    }
    else if (propVariant === 'outline') {
      if (_isThemeColor) {
        // Border
        classes.push('border-width-1', 'border-solid')
        styles.push({ borderColor: `hsl(var(--a-${propColor})` })

        // Text
        classes.push(`text-${propColor}`)
      }
      else {
        // Border
        classes.push('border-width-1', 'border-solid')
        styles.push({ borderColor: propColor })

        // Text
        styles.push({ color: propColor })
      }
    }
    else if (propVariant === 'text') {
      if (_isThemeColor) {
        // Text
        classes.push(`text-${propColor}`)
      }
      else {
        // Text
        styles.push({ color: propColor })
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

import type { MaybeRef } from '@vueuse/core'
import { defu } from 'defu'
import type { ComponentObjectPropsOptions } from 'vue'
import { ref, unref, watch } from 'vue'
import { getContrastColor } from '@/utils/color'
import { color } from '@/composables/useProps'
import type { ColorProp } from '@/composables/useProps'

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
  const computeClassesStyles = (propColor: ColorProp, propVariant: string, propsStates: boolean, config?: UseLayerConfig) => {
    // 👉 Classes
    const classes: string[] = [
      propsStates
        ? (config && config.statesClass ? config.statesClass : 'states')
        : '',
    ]

    const isThemeColor = propColor && (['primary', 'success', 'info', 'warning', 'danger'] as ColorProp[]).includes(propColor)

    // 👉 Styles
    const styles = []

    // If it's not theme color => Set color we received as prop to `--a-layer-color`
    if (!isThemeColor) {
      styles.push({ '--a-layer-color': propColor })

      if (propColor) {
        // If color isn't theme color & is HEX color => Calculate contrast color => Assign it to `--a-layer-text`
        const contrastColor = getContrastColor(propColor as string)

        styles.push(`--a-layer-text: ${contrastColor}`)
        styles.push(`--un-ring-color: ${propColor}`)
      }
    }

    // If it's theme color => Use color's CSS var to `--a-layer-color` and to ring color '--un-ring-color'
    else {
      styles.push({ '--a-layer-color': `hsla(var(--a-${propColor}),var(--un-bg-opacity))` }, { '--un-ring-color': `hsl(var(--a-${propColor}))` })

      // ℹ️ We need to set un-bg-opacity just like UnoCSS class
      classes.push('[--un-bg-opacity:1]')
    }

    /*
      ℹ️ This is CSS var name

      If theme color
        If variant is fill => white
        Else => passed color
      Else
        string 'layer-text'

      Once we attach the proper class, text color will be handled by CSS variables
    */
    const textColor = isThemeColor
      ? propVariant === 'fill' ? 'white' : propColor
      : 'layer-text'

    // ℹ️ `a-title-${color}` does uses CSS variable however `text-${color}` don't so we need to attach the color our self
    // TODO: Check is it convenient to add `a-title-$color` like in above line to identify the color as CSS var 🤔
    const textClasses = `text-${isThemeColor ? textColor : `\$a-${textColor}`} a-title-${textColor} a-subtitle-${textColor}`

    if (propColor) {
      // common classes
      classes.push(textClasses)
      classes.push('a-subtitle-opacity-100')

      // Add classes based on variant
      if (propVariant === 'text') {
        classes.push('text-$a-layer-color')
      }
      else {
        if (propVariant === 'fill')
          classes.push('bg-$a-layer-color')
        if (propVariant === 'light')
          classes.push('bg-$a-layer-color bg-opacity-15')
        if (propVariant === 'outline')
          classes.push('border-width-1 border-solid border-$a-layer-color')
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

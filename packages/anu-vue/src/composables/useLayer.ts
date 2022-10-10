import type { MaybeRef } from '@vueuse/core'
import type { ComponentObjectPropsOptions, Ref } from 'vue'
import { ref, unref, watch } from 'vue'
import type { ColorProp } from '@/composables/useProps'
import { color } from '@/composables/useProps'
import { contrast } from '@/utils/color'

export const useProps = (propOverrides?: Partial<ComponentObjectPropsOptions>) => {
  const props = {
    /**
     * Layer color
     */
    color,

    /**
     * Layer variant
     */
    variant: {
      type: String,
      validator: (value: string) => ['fill', 'outline', 'light', 'text'].includes(value),
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

  // Add `defaults` property in `props` if it is provided via `defaults` argument
  if (propOverrides)
    Object.assign(props, propOverrides)

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

    const isThemeColor = propColor && ['primary', 'success', 'info', 'warning', 'danger'].includes(propColor)
    const isHexColor = propColor && /^#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}$/.test(propColor)

    // 👉 Styles
    const styles = []

    // If it's not theme color => Set color we received as prop to `--a-layer-color`
    if (!isThemeColor) {
      styles.push({ '--a-layer-color': propColor })

      // If color isn't theme color & is HEX color => Calculate contrast color => Assign it to `--a-layer-text`
      if (isHexColor) {
        const contrastColor = contrast(propColor)

        styles.push(`--a-layer-text: ${contrastColor}`)
      }
    }

    // If it's theme color => Use color's CSS var to `--a-layer-color`
    else {
      styles.push({ '--a-layer-color': `hsla(var(--a-${propColor}),var(--un-bg-opacity))` })

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

    // ℹ️ `typography-title-${color}` does uses CSS variable however `text-${color}` don't so we need to attach the color our self
    // TODO: Check is it convenient to add `typography-title-$color` like in above line to identify the color as CSS var 🤔
    const textClasses = `text-${isThemeColor ? textColor : `\$a-${textColor}`} typography-title-${textColor} typography-subtitle-${textColor} typography-text-${textColor}`

    if (propColor) {
      // common classes
      classes.push(textClasses)
      classes.push('typography-subtitle-opacity-100 typography-text-opacity-100')

      // Add classes based on variant
      if (propVariant === 'text') { classes.push('text-$a-layer-color') }
      else {
        if (propVariant === 'fill')
          classes.push('bg-$a-layer-color')
        if (propVariant === 'light')
          classes.push('bg-$a-layer-color bg-opacity-15')
        if (propVariant === 'outline')
          classes.push('border-width-1 uno-layer-base-border-solid border-$a-layer-color')
      }
    }

    return {
      styles,
      classes,
    }
  }

  const getLayerClasses = (propColor: Ref<ColorProp>, propVariant: Ref<string>, propsStates: Ref<boolean>, config?: MaybeRef<UseLayerConfig>) => {
    const classes = ref<any>([])
    const styles = ref<any>([])

    watch([propColor, propVariant, propsStates, () => config], () => {
      const { classes: _classes, styles: _styles } = computeClassesStyles(propColor.value, propVariant.value, propsStates.value, unref(config))
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

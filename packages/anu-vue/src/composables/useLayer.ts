import type { MaybeRef } from '@vueuse/core'
import { defu } from 'defu'
import type { ComponentObjectPropsOptions, ExtractPublicPropTypes } from 'vue'
import { ref, unref, watch } from 'vue'
import { isThemeColor } from '@/composables/useColor'
import type { ColorProp } from '@/composables/useProps'
import { color } from '@/composables/useProps'
import { useTypographyColor } from '@/composables/useTypographyColor'
import { colord } from '@/utils/colord'

export type LayerVariant = 'fill' | 'outline' | 'light' | 'text'

export const aLayerProps = {
  /**
   * Layer color
   */
  color,

  /**
   * Layer variant
   */
  variant: {
    type: String as PropType<LayerVariant>,
    default: 'text',
  },

  /**
   * Interaction states like hover & active
   */
  states: Boolean,
} as const

export type ALayerProps = ExtractPublicPropTypes<typeof aLayerProps>

// TODO: Use `useColor` composable to removed the color calculation
export function useProps(propOverrides?: Partial<ComponentObjectPropsOptions>) {
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
export function useLayer() {
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

    if (_isThemeColor.value) {
      styles.push({ '--a-layer-c': `var(--a-${propColor})` })

      if (propVariant === 'fill') {
        // Background
        styles.push({ background: 'hsla(var(--a-layer-c),var(--a-layer-opacity))' })
        classes.push('[--a-layer-opacity:1]')

        // Text
        if (propColor !== undefined && propColor !== null)
          classes.push('text-white')
      }

      else if (propVariant === 'light') {
        // Background
        styles.push({ background: 'hsla(var(--a-layer-c),var(--a-layer-opacity))' })
        classes.push('[--a-layer-opacity:0.15]')

        // text
        if (propColor !== undefined && propColor !== null)
          classes.push(`text-${propColor}`)
      }

      else if (propVariant === 'outline') {
        // Border
        classes.push('border-width-1', 'border-solid')
        styles.push({ borderColor: 'hsl(var(--a-layer-c)' })

        // Text
        if (propColor !== undefined && propColor !== null)
          classes.push('text-[hsl(var(--a-layer-c))]')
      }

      else if (propVariant === 'text') {
        // Text
        if (propColor !== undefined && propColor !== null)
          classes.push('text-[hsl(var(--a-layer-c))]')
      }
    }
    else if (propColor === 'inherit') {
      classes.push('text-inherit')

      if (propVariant === 'outline')
        classes.push('border-width-1 border-solid border-current')
    }
    else if (propColor) {
      const _colord = colord(propColor)

      styles.push({ '--a-layer-c': _colord.toHslValue() })

      if (propVariant === 'fill') {
        // Background
        styles.push({ background: 'hsla(var(--a-layer-c),var(--a-layer-opacity))' })
        classes.push('[--a-layer-opacity:1]')

        // Text
        if (propColor !== undefined && propColor !== null)
          styles.push({ color: _colord.contrasting().toHslString() })
      }
      else if (propVariant === 'light') {
        // Background
        styles.push({ background: 'hsla(var(--a-layer-c),var(--a-layer-opacity))' })
        classes.push('[--a-layer-opacity:0.15]')

        // Text
        if (propColor !== undefined && propColor !== null)
          styles.push({ color: 'hsl(var(--a-layer-c))' })
      }
      else if (propVariant === 'outline') {
        // Border
        classes.push('border-width-1', 'border-solid')
        styles.push({ borderColor: 'hsl(var(--a-layer-c))' })

        // Text
        if (propColor !== undefined && propColor !== null)
          styles.push({ color: 'hsl(var(--a-layer-c))' })
      }
      else if (propVariant === 'text') {
        // Text
        if (propColor !== undefined && propColor !== null)
          styles.push({ color: 'hsl(var(--a-layer-c))' })
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

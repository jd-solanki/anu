import type { ComponentObjectPropsOptions } from 'vue'
import { color } from '@/composables/useProps'
import { contrast } from '@/utils/color'

export const useProps = (propOverrides?: Partial<ComponentObjectPropsOptions>) => {
  const props = {
    color,
    variant: {
      type: String,
      validator: (value: string) => ['fill', 'outline', 'light', 'text'].includes(value),
      default: 'text',
    },
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
  const getLayerClasses = (props: any, config?: UseLayerConfig) => {
    const classes: string[] = [
      props.states
        ? (config && config.statesClass ? config.statesClass : 'states')
        : '',
    ]

    const isThemeColor = ['primary', 'success', 'info', 'warning', 'danger'].includes(props.color)
    const isHexColor = /^#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}$/.test(props.color)

    const style = []
    if (!isThemeColor) {
      style.push({ '--a-layer-color': props.color })
      if (isHexColor) {
        const contrastColor = contrast(props.color)

        style.push(`--a-layer-text: ${contrastColor}`)
      }
    }
    else {
      style.push({ '--a-layer-color': `hsla(var(--a-${props.color}),var(--un-bg-opacity))` })

      classes.push('[--un-bg-opacity:1]')
    }

    const color = isThemeColor
      ? props.variant === 'fill' ? 'white' : props.color
      : 'layer-text'

    // ℹ️ `typography-title-${color}` does uses CSS variable however `text-${color}` don't so we need to attach the color our self
    // TODO: Check is it convenient to add `typography-title-$color` like in above line to identify the color as CSS var 🤔
    const textClasses = `text-${isThemeColor ? color : `\$a-${color}`} typography-title-${color} typography-subtitle-${color} typography-text-${color}`

    if (props.color) {
      // common classes
      classes.push(textClasses)
      classes.push('typography-subtitle-opacity-100 typography-text-opacity-100')

      if (props.variant === 'text') { classes.push('text-$a-layer-color') }
      else {
        if (props.variant === 'fill')
          classes.push('bg-$a-layer-color')
        if (props.variant === 'light')
          classes.push('bg-$a-layer-color bg-opacity-15')
        if (props.variant === 'outline')
          classes.push('border-width-1 uno-layer-base-border-solid border-$a-layer-color')
      }
    }

    return [style, classes]
  }

  return {
    getLayerClasses,
  }
}

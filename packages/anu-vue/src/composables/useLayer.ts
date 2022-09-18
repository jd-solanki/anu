import type { ComponentObjectPropsOptions } from 'vue'
import { color } from '@/composables/useProps'

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

    if (props.color) {
      const color = props.variant === 'fill' ? 'white' : props.color
      classes.push(`text-${color} typography-title-${color} typography-subtitle-${color} typography-text-${color}`)

      // common classes
      classes.push('typography-subtitle-opacity-100 typography-text-opacity-100')

      if (props.variant === 'text') { classes.push(`text-${props.color}`) }
      else {
        // TODO: Below typography colors are using `--white` CSS var which doesn't exist
        const color = props.variant === 'fill' ? 'white' : props.color
        classes.push(`text-${color} typography-title-${color} typography-subtitle-${color} typography-text-${color}`)

        if (props.variant === 'fill')
          classes.push(`bg-${props.color}`)
        if (props.variant === 'light')
          classes.push(`bg-${props.color} bg-opacity-15`)
        if (props.variant === 'outline')
          classes.push(`border-width-1 uno-layer-base-border-solid border-${props.color}`)
      }
    }

    return classes
  }

  return {
    getLayerClasses,
  }
}

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

export const useLayer = () => {
  const getLayerClasses = (props: ComponentObjectPropsOptions) => {
    const classes: string[] = [props.states ? 'states' : '']

    if (props.color) {
      if (props.variant === 'fill')

        // TODO: Below typography colors are using `--white` CSS var which doesn't exist
        classes.push(`bg-${props.color} text-white typography-title-white typography-subtitle-white typography-text-white typography-title-opacity-100 typography-subtitle-opacity-100 typography-text-opacity-100`)
      if (props.variant === 'outline')
        classes.push(`border border-solid border-${props.color} text-${props.color} typography-title-${props.color} typography-subtitle-${props.color} typography-text-${props.color} typography-subtitle-opacity-100 typography-text-opacity-100`)
      if (props.variant === 'light')
        classes.push(`bg-${props.color} bg-opacity-15 text-${props.color} typography-title-${props.color} typography-subtitle-${props.color} typography-text-${props.color} typography-subtitle-opacity-100 typography-text-opacity-100`)
      if (props.variant === 'text')
        classes.push(`text-${props.color}`)
    }

    return classes
  }

  return {
    getLayerClasses,
  }
}

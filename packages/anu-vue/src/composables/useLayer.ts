import type { ComponentObjectPropsOptions } from 'vue'

export const useProps = (propOverrides?: Partial<ComponentObjectPropsOptions>) => {
  const props = {
    color: {
      type: String,
      validator: (value: string) => ['primary', 'success', 'info', 'warning', 'danger'].includes(value),
    },
    variant: {
      type: String,
      validator: (value: string) => ['fill', 'outline', 'light'].includes(value),
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
        classes.push(`bg-${props.color} text-white`)
      if (props.variant === 'outline')
        classes.push(`border border-solid border-${props.color} text-${props.color}`)
      if (props.variant === 'light')
        classes.push(`bg-${props.color} bg-opacity-15 text-${props.color}`)
    }

    return classes
  }

  return {
    getLayerClasses,
  }
}

import type { ComponentObjectPropsOptions, PropType, Ref, Slots, ToRef } from 'vue'
import type { TypographyProps } from '@/components/typography/props'
import type { ConfigurableValue } from '@/composables/useConfigurable'

export const useTypographyProps = (propOverrides?: Partial<ComponentObjectPropsOptions>) => {
  const props = {

    /**
     * Typography title
     */
    title: [String, Array] as PropType<ConfigurableValue>,

    /**
     * Typography subtitle
     */
    subtitle: [String, Array] as PropType<ConfigurableValue>,

    /**
     * Typography text content
     */
    text: [String, Array] as PropType<ConfigurableValue>,

    /**
     * Tag to use for title of the card
     */
    titleTag: {
      type: String,
      default: 'span',

    // default: 'h4',
    },

    /**
     * Tag to use for subtitle of the card
     */
    subtitleTag: {
      type: String,
      default: 'span',

    // default: 'p',
    },

    /**
     * Tag to use for text rendered via `text` prop
     */
    textTag: {
      type: String,
      default: 'span',
    },
  }

  // Add `defaults` property in `props` if it is provided via `defaults` argument
  if (propOverrides)
    Object.assign(props, propOverrides)

  return props
}

export const isTypographyUsed = (props: { [K in keyof TypographyProps]: ToRef<TypographyProps[K]> }, slots: Slots) => {
  const { title, subtitle, text } = props

  const validateProp = (prop?: Ref<ConfigurableValue>): boolean => {
    if (prop && prop.value) {
      if (typeof prop.value === 'string')
        return !!prop.value

      if (typeof prop.value === 'number') {
        // Thanks: https://stackoverflow.com/a/69422789/10796681
        // Check if prop is not null or undefined
        return (prop.value ?? null) !== null
      }

      else { return !!prop.value.length }
    }

    return false
  }

  return validateProp(title) || validateProp(subtitle) || validateProp(text) || slots.title || slots.subtitle || slots['header-right']
}

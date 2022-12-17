import type { ComponentObjectPropsOptions, PropType, Slots, ToRef, ToRefs } from 'vue'
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

// Thanks: <https://masteringjs.io/tutorials/fundamentals/filter-object>
// TODO(TS): improve typing so that it only returns the typography types. Omit using `Partial`
export const extractTypographyProp = <T>(props: ToRefs<T>): Partial<ToRefs<T>> => {
  return Object.fromEntries(
    Object.entries(props)
      .filter(
        ([propName]) => Object.keys(useTypographyProps()).includes(propName),
      ) as [keyof T, T[keyof T]][],
  ) as Partial<ToRefs<T>>
}

export const isTypographyUsed = (props: { [K in keyof TypographyProps]: ToRef<TypographyProps[K]> }, slots: Slots) => {
  const { title, subtitle, text } = props

  const validateProp = (prop: ConfigurableValue): boolean => {
    if (prop) {
      if (typeof prop === 'string')
        return !!prop

      if (typeof prop === 'number') {
        // Thanks: https://stackoverflow.com/a/69422789/10796681
        // Check if prop is not null or undefined
        return (prop ?? null) !== null
      }

      else { return !!prop.length }
    }

    return false
  }

  return validateProp(title.value) || validateProp(subtitle.value) || validateProp(text.value) || slots.title || slots.subtitle || slots.headerRight
}

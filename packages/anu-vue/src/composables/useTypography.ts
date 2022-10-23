import type { ComponentObjectPropsOptions, PropType, Slots, ToRefs } from 'vue'
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

// TODO [v0.2.0]: Find another way to check typography component usage & improve typing
// export const isTypographyUsed = (props: ComponentObjectPropsOptions, slots: Slots) => {
export const isTypographyUsed = (props: any, slots: Slots) => {
  const { title, subtitle, text } = props

  const validateProp = (prop: string | string[] | undefined): boolean => {
    if (prop) {
      if (typeof prop === 'string')
        return !!prop
      else return !!prop.length
    }

    return false
  }

  return validateProp(title) || validateProp(subtitle) || validateProp(text) || slots.title || slots.subtitle || slots.headerRight
}

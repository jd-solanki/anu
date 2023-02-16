import type { Ref, Slots, ToRef } from 'vue'
import type { TypographyProps } from './props'
import type { ConfigurableValue } from '@/composables/useConfigurable'

export const isTypographyUsed = (props: { [K in keyof TypographyProps]: ToRef<TypographyProps[K]> }, slots: Slots) => {
  const { title, subtitle, text } = props
  console.log('title :>> ', title.value, slots.title)
  console.log('subtitle :>> ', subtitle.value, slots.subtitle)
  console.log('text :>> ', text.value, slots.text)

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

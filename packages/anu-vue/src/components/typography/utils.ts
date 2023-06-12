import type { Ref, Slots, ToRef } from 'vue'
import type { ATypographyProps } from './meta'
import type { ConfigurableValue } from '@/composables/useConfigurable'

export function isTypographyUsed(props: { [K in keyof ATypographyProps]: ToRef<ATypographyProps[K]> }, slots: Slots) {
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

import type { MaybeRef } from '@vueuse/core'
import { resolveUnref } from '@vueuse/core'
import { computed } from 'vue'

// ℹ️ We might need generic here in future

export type ContentType = string | number | undefined
export type Class = string | Record<string, boolean> | undefined
export type ClassAttr = Class | Class[]
export type AttrsType = Record<string, any> | undefined
export type ConfigurableValue = undefined | ContentType | [ContentType, ClassAttr] | [ContentType, ClassAttr, AttrsType]

export const useConfigurable = (value: MaybeRef<ConfigurableValue>) => computed(() => {
  const _value = resolveUnref(value)

  const [content, classes, attrs] = _value === undefined
    ? []
    : (typeof _value === 'string' || typeof _value === 'number')
        ? [_value]
        : _value

  return { content, classes, attrs }
},
)

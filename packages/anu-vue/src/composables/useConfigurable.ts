import type { MaybeRef } from '@vueuse/core'
import { resolveUnref } from '@vueuse/core'

// ℹ️ We might need generic here in future

export type ContentType = string | number | undefined
export type ClassStyleType = string | { string: boolean } | undefined
export type ClassStyleAttr = ClassStyleType | ClassStyleType[]
export type AttrsType = { string: any } | undefined
export type ConfigurableValue = undefined | ContentType | [ContentType, ClassStyleAttr] | [ContentType, ClassStyleAttr, AttrsType]

export const useConfigurable = (value: MaybeRef<ConfigurableValue>): { content: ContentType; classes: ClassStyleAttr; attrs: AttrsType } => {
  const _value = resolveUnref(value)

  const [content, classes, attrs] = _value === undefined
    ? []
    : typeof _value === 'string' || typeof _value === 'number'
      ? [_value]
      : _value

  return { content, classes, attrs }
}

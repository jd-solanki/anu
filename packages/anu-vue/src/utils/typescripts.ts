import type { Ref } from 'vue'

export type Prettify<T> = {
  [k in keyof T]: T[k]
} & {}

export type LooseAutocomplete<T extends string> = T | Omit<string, T>

export type IsMaybeRefTrue<B> = (
  B extends Ref<infer M>
    ? M extends true ? true : false
    : B extends true ? true : false
)

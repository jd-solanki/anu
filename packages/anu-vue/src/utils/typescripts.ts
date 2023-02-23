export type Prettify<T> = {
  [k in keyof T]: T[k]
} & {}

export type LooseAutocomplete<T extends string> = T | Omit<string, T>

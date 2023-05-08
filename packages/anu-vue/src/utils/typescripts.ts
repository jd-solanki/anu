import type { IsAny, SetOptional } from 'type-fest'
import type { ExtractPropTypes } from 'vue'

export function objectKeys<T extends {}>(obj: T) {
  return Object.keys(obj) as Array<keyof T>
}

export type GetBooleanProps<T> = NonNullable<{
  [K in keyof T]: T[K] extends boolean
    ? IsAny<T[K]> extends true ? never : K
    : never;
}[keyof T]>

export type ExtractExternalPropTypes<TObj, IProps = ExtractPropTypes<TObj>> = SetOptional<IProps, GetBooleanProps<IProps>>

export type Prettify<T> = {
  [k in keyof T]: T[k]
} & {}

export type NoUndefined<T> = T extends undefined ? never : T

export type ExtendNested<T, U> = {
  [K in keyof T]: T[K] extends object
    ? U & ExtendNested<T[K], U>
    : U;
}

export type PickStartsWith<T extends object, S extends string> = {
  [K in keyof T as K extends `${S}${infer R}` ? K : never]: T[K]
}

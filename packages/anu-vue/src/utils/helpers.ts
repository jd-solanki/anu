import type { Prettify } from './typescripts'

// 👉 IsEmpty
export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined || value === '')
    return true

  return !!(Array.isArray(value) && value.length === 0)
}

// 👉 IsNullOrUndefined
export const isNullOrUndefined = (value: unknown): value is undefined | null => {
  return value === null || value === undefined
}

// 👉 IsEmptyArray
export const isEmptyArray = (arr: unknown): boolean => {
  return Array.isArray(arr) && arr.length === 0
}

// 👉 IsObject
export const isObject = (obj: unknown): obj is Record<string, unknown> =>
  obj !== null && !!obj && typeof obj === 'object' && !Array.isArray(obj)

// 👉 IsNumeric
export const isNumeric = (value: unknown): boolean =>
  (typeof value === 'string' || typeof value === 'number') && value !== '' && !isNaN(Number(value))

// 👉 Remove object keys
export const removeKeys = <T, K extends keyof T>(obj: T, keys: K[]): Prettify<Omit<T, K>> => {
  const copy: T = JSON.parse(JSON.stringify(obj))
  keys.forEach(key => delete copy[key])

  return copy
}

// 👉 Prefix object keys
// Thanks: https://stackoverflow.com/a/70387184
// type AddPrefixToObjectKeys<T, P extends string> = {
//   [K in keyof T as K extends string ? `${P}${K}` : never]: T[K]
// }

// export const prefixObjectKeys = <T extends Record<string, any>, K extends string>(
//   obj: T,
//   prefix: K,
// ): Prettify<AddPrefixToObjectKeys<T, K>> => {
//   return Object.fromEntries(
//     Object.entries(obj).map(([k, v]) => [`${prefix}${k}`, v]),
//   ) as AddPrefixToObjectKeys<T, K>
// }

export interface PrefixObjectKey<T, P extends string, K extends keyof T> {
  originalKey: keyof T
  prefixedKey: K extends string ? `${P}${K}` : never
  value: T[K]
}

export const prefixObjectKeys = <T extends Record<string, any>, K extends string>(
  obj: T,
  prefix: K,
): { [P in keyof T as P extends string ? `${K}${P}` : never]: PrefixObjectKey<T, K, Extract<P, keyof T>> } => {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [`${prefix}${k}`, { originalKey: k, prefixedKey: `${prefix}${k}`, value: v }]),
  ) as any
}

export const renameObjKey = <T extends Record<string, any>, K extends keyof T, R extends string>(
  obj: T,
  key: K,
  replaceWith: R,
): Prettify<Omit<T, K> & Record<R, T[K]>> => {
  const { [key]: value, ...rest } = obj

  return {
    ...rest,
    [replaceWith]: value,
  } as Omit<T, K> & Record<R, T[K]>
}

import type { Prettify } from './typescripts'

// 👉 IsEmpty
export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined || value === '')
    return true

  return !!(Array.isArray(value) && value.length === 0) || JSON.stringify(value) === '{}'
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

export const prefixObjectKeys = <T extends Record<string, any>, P extends string>(
  obj: T,
  prefix: P,
): { [K in keyof T as `${P}${string & K}`]: T[K] } => {
  const prefixedEntries = Object.entries(obj).map(([key, value]) => [
    `${prefix}${key}`,
    value,
  ])

  return Object.fromEntries(prefixedEntries) as any
}

export interface PrefixObjectKeyWithMeta<T, P extends string, K extends keyof T> {
  originalKey: K
  prefixedKey: K extends string ? `${P}${K}` : never
  value: T[K]
}

/**
 * prefixObjectKeys function that prefixes all keys of an object with a given string and returns a new object with the prefixed keys
 * @param obj - The object to prefix keys
 * @param prefix - The prefix to add to the keys
 * @returns A new object with the prefixed keys
 *
 * Return type should be type of `PrefixObjectKey` interface
 *
 * @example
 * const obj = { a: 1, b: 'b', c: false }
 * const prefixedObj = prefixObjectKeys(obj, 'new_')
 * // { new_a: { originalKey: 'a', prefixedKey: 'new_a', value: 1 }, new_b: { originalKey: 'b', prefixedKey: 'new_b', value: 'b' }, new_c: { originalKey: 'c', prefixedKey: 'new_c', value: false } }
 *
 * Return type is inferred as: { new_a: { originalKey: 'a', prefixedKey: 'new_a', value: number }, new_b: { originalKey: 'b', prefixedKey: 'new_b', value: string }, new_c: { originalKey: 'c', prefixedKey: 'new_c', value: boolean } }
 */
export const prefixObjectKeysWithMeta = <T extends Record<string, any>, K extends string>(
  obj: T,
  prefix: K,
): { [P in keyof T as P extends string ? `${K}${P}` : never]: Prettify<PrefixObjectKeyWithMeta<T, K, Extract<P, keyof T>>> } => {
  const prefixedObj = {} as any

  for (const key in obj) {
    prefixedObj[`${prefix}${key}`] = {
      originalKey: key,
      prefixedKey: `${prefix}${key}`,
      value: obj[key],
    }
  }

  return prefixedObj
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

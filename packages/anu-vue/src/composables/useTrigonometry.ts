import type { MaybeRef } from '@vueuse/shared'
import type { ComputedRef, Ref } from 'vue'

// import type { MaybeComputedElementRef } from '../unrefElement'

export interface UseArcsOptions {
  radius?: number
  padding?: number
  isPercentages?: MaybeRef<boolean>
}

// NOTE - If we use distance, we need to provide distance for points start and end of the arc. Maybe it's boring and useless... will see.

export interface typeArc extends SVGElement {
  value: MaybeRef<number>
  origin?: number
  distance?: number
  startDistance?: number
  endDistance?: number
  class?: string
}

export interface typeArcsResult {
  arcs: ComputedRef<typeArc[]>
  total: ComputedRef<number>
  radius: number
  side: number
  viewBox: String
}

// Svg is a square. Calculate side, circumference and viewBox.
function getBounds(radius: number, padding: number) {
  const side = radius + padding

  return {
    circumference: Math.PI * radius * 2,
    side,
    viewBox: `-${side},-${side},${(side) * 2},${(side) * 2}`,
  }
}

// Source could be a number, an array or an object. Normalize it !
function normalizeSource(source: MaybeRef<number | Array<typeArc> | typeArc>) {
  return computed(() => {
    if (!isRef(source) || source === undefined)
      return [{ value: source || 0, class: 'stroke-current' } as unknown as typeArc]
    if (Array.isArray(source.value))
      return source.value
    if (typeof source.value === 'object')
      return [source.value]

    return [{ value: source.value || 0, class: 'stroke-current' } as unknown as typeArc]
  })
}

// Return the total of all the values.
function getTotal(items: ComputedRef<typeArc[]>) {
  return computed(() => items.value.reduce((prev, cur) => prev + unref(cur.value), 0))
}

// Return percentages of the values.
function getPercentages(items: ComputedRef<typeArc[]>, total: ComputedRef<number>, isPercentages: MaybeRef<boolean>) {
  return computed(() => items.value.map(item => unref(item.value) / (unref(isPercentages) ? 100 : total.value)))
}

// option 1: number or reactive number
export function useArcs(source: MaybeRef<number>, options?: UseArcsOptions): typeArcsResult

// option 2: static array of possibly reactive numbers
export function useArcs<T extends MaybeRef<number>[]>(source: T, options?: UseArcsOptions): typeArcsResult

// option 3: reactive array of numbers
export function useArcs<T extends Ref<number[]>>(source: T, options?: UseArcsOptions): typeArcsResult

export function useArcs(source: MaybeRef<number | Array<typeArc> | typeArc>, options: UseArcsOptions = {}): typeArcsResult {
  const {
    radius = 100,
    padding = 20,
    isPercentages = true,
  } = options

  // Get bounds of the shape
  const { circumference, side, viewBox } = getBounds(radius, padding)

  // Convert source to array
  const items = normalizeSource(source)

  // Get the total and percentages of all items
  const total = getTotal(items)
  const percentages = getPercentages(items, total, isPercentages)

  // Compute all arcs
  const arcs: ComputedRef<typeArc[]> = computed(() => items.value.map((item, index) => {
    const percent = percentages.value[index]
    const cumul = percentages.value.slice(0, index).reduce((prev, cur) => prev + cur, 0)

    const origin = item.origin ? item.origin / 100 : 0
    const cumulPercent = cumul + origin - 0.25 // subtract 25% to start on North
    const startRayon = radius - (item.startDistance || 0)
    const endRayon = radius - (item.endDistance || 0)
    const pi2 = Math.PI * 2

    return {
      ...item,
      percent,
      cumul,

      'startX': Math.cos(cumulPercent * pi2) * startRayon,
      'startY': Math.sin(cumulPercent * pi2) * startRayon,
      'endX': Math.cos((cumulPercent + percent) * pi2) * endRayon,
      'endY': Math.sin((cumulPercent + percent) * pi2) * endRayon,
      'stroke-dasharray': `${percent * circumference} ${circumference}`,
      'stroke-dashoffset': -(cumul + origin) * circumference,
      'style': (item.distance ? { transform: `scale(${item.distance / radius})` } : {}) as CSSStyleDeclaration,
    }
  }))

  return { arcs, radius, side, total, viewBox }
}

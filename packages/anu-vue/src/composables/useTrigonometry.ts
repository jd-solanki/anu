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
  viewBox: String
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

  // The shape is a square, get svg side
  const side = radius + padding

  // Calculate and return viewBox
  const viewBox = `-${side},-${side},${(side) * 2},${(side) * 2}`

  const circumference = Math.PI * radius * 2

  // Convert source to array
  const items = computed(() => {
    if (!isRef(source) || source === undefined)
      return [{ value: source || 0, class: 'stroke-current' } as unknown as typeArc]
    if (Array.isArray(source.value))
      return source.value
    if (typeof source.value === 'object')
      return [source.value]

    return [{ value: source.value || 0, class: 'stroke-current' } as unknown as typeArc]
  })

  // Get the total and all percentages
  const total = computed(() => items.value.reduce((prev, cur) => prev + unref(cur.value), 0))
  const percentages = computed(() => items.value.map(item => total.value
    ? unref(item.value) / (unref(isPercentages) ? 100 : total.value)
    : 0))

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

  return { arcs, total, viewBox }
}

import type { ComputedRef, Ref, UnwrapRef } from 'vue'
import type { SortBy } from '@/components/data-table'

export function getComputedCols<PropColumn>(rows: Ref<Record<string, unknown>[]>, cols: Ref<PropColumn[]>) {
  return computed<PropColumn[]>(() => {
  // If custom cols are provided => Use them
    if (cols.value.length)
      return cols.value

    // if there's no rows => Don't generate col definition
    if (!rows.value.length)
      return []

    // Else generate cols from first row
    return Object.keys((rows.value[0]) as UnwrapRef<(typeof rows)>[number]).map(rowObjProperty => ({ name: rowObjProperty } as PropColumn))
  })
}

export function getSortedCols<PropColumn extends { isSortable: boolean; sortBy: SortBy }>(cols: ComputedRef<PropColumn[]>) {
  return computed(() => cols.value.filter(col => col.isSortable && col.sortBy !== undefined))
}

import type { App, ComputedRef, Ref } from 'vue'
import { computed, inject, provide } from 'vue'
import { spacingSymbol } from '@/symbols'

/*
  ℹ️ Why we are using provide/inject and not relying on CSS var?
  A: Because, When we render the element outside of the DOM tree, like dialog, selection options, etc. CSS var don't get applied there.
      We can use provided value (by parent) to apply the spacing.

      Assume, we are working on select component. To overcome above mentioned DOM tree issue we can use JS to get the CSS var value attached to the component,
      but we can't watch it. Hence, we have to use provide/inject instead of CSS var.
*/

export const provideAppSpacing = (app: App) => {
  app.provide(spacingSymbol, 100)
}

export const useSpacing = (spacing: Ref<number | undefined>): ComputedRef<number> => {
  const injectedSpacing = inject(spacingSymbol, 100)

  const _spacing = computed(() => spacing.value || injectedSpacing)

  provide(spacingSymbol, _spacing.value)

  return _spacing
}

/**
 * Modify component and its children spacing
 */
export const spacingProp = {
  type: Number,
  default: undefined,
}

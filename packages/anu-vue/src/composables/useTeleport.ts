// ℹ️ Inspired from Vuetify's useTeleport composable

import type { Ref } from 'vue'
import { computed, unref } from 'vue'

export function useTeleport(target?: Ref<string | Element>) {
  const teleportTarget = computed(() => {
    const _target = unref(target)

    if (typeof window === 'undefined')
      return undefined

    const targetElement
      = _target === undefined
        ? document.body
        : typeof _target === 'string'
          ? document.querySelector(_target)
          : _target

    if (targetElement == null) {
      console.warn(`Unable to locate target ${_target}`)

      return undefined
    }

    if (!useTeleport.cache.has(targetElement)) {
      const el = document.createElement('div')
      el.id = 'a-teleport-target'
      targetElement.appendChild(el)
      useTeleport.cache.set(targetElement, el)
    }

    return useTeleport.cache.get(targetElement)
  })

  return { teleportTarget }
}
useTeleport.cache = new WeakMap<Element, Element>()

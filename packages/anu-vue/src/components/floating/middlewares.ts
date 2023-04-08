import type { ElementRects } from '@floating-ui/vue'
import type { Ref } from 'vue'

export function sameWidth(floatingEl: Ref<HTMLElement>) {
  return {
    name: 'sameWidth',
    fn: ({ rects, x, y }: { rects: ElementRects; x: number; y: number }) => {
    // Set width of reference to floating
      const _floatingEL = unrefElement(floatingEl)
      if (_floatingEL)
        _floatingEL.style.minWidth = `${rects.reference.width}px`

      return { x, y }
    },
  }
}

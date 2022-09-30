import type { ElementRects } from '@floating-ui/dom'

export const sameWidth = (floatingEl: HTMLElement) => {
  return {
    name: 'sameWidth',
    fn: ({ rects, x, y }: { rects: ElementRects; x: number; y: number }) => {
      // Set width of reference to floating
      floatingEl.style.minWidth = `${rects.reference.width}px`

      return { x, y }
    },
  }
}

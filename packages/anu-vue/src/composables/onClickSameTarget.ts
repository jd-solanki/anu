import type { MaybeElementRef } from '@vueuse/core'

export function onClickSameTarget(elRef: MaybeElementRef, handler: (e: MouseEvent) => void) {
  let isMouseDownOnTarget = false
  let isMouseUpOnTarget = false

  // refer to this https://javascript.info/mouse-events-basics
  // events fired in the order: mousedown -> mouseup -> click
  const onClick = (e: MouseEvent) => {
    if (isMouseDownOnTarget && isMouseUpOnTarget)
      handler(e)

    isMouseDownOnTarget = isMouseUpOnTarget = false
  }

  const onMousedown = (e: MouseEvent) => {
    isMouseDownOnTarget = e.target === e.currentTarget
  }
  const onMouseup = (e: MouseEvent) => {
    isMouseUpOnTarget = e.target === e.currentTarget
  }

  const cleanup = [
    useEventListener(elRef as Element, 'click', onClick),
    useEventListener(elRef as Element, 'mousedown', onMousedown),
    useEventListener(elRef as Element, 'mouseup', onMouseup),
  ]

  const stop = () => cleanup.forEach(fn => fn())

  return stop
}

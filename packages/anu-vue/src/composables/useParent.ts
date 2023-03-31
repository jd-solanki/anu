import type { Ref } from 'vue'

export function useParent(): Readonly<Ref<HTMLElement | SVGElement | null | undefined>> {
  const parentElement = shallowRef<HTMLElement | SVGElement | null | undefined>()

  const update = () => {
    const vm = getCurrentInstance()

    const parentEl = vm!.parent!.vnode.el
    const proxyParentEl = vm!.proxy!.$el.parentElement

    // @ts-expect-error - `vm!.vnode.ctx` give type error
    parentElement.value = vm!.vnode.ctx === vm!.vnode.el!.parentElement.__vnode.ctx ? proxyParentEl : parentEl
  }

  tryOnMounted(update)

  return parentElement
}

export function useParent() {
  const parentEl = ref<HTMLElement | null>()

  onMounted(() => {
    const vm = getCurrentInstance()
    let parent: HTMLElement | null = vm?.proxy?.$el.parentElement

    while (parent && parent.hasAttribute('data-no-reference'))
      parent = parent.parentElement

    parentEl.value = parent
  })

  return parentEl
}

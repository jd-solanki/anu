export function useParent() {
  const parentEl = ref()

  onMounted(() => {
    const vm = getCurrentInstance()
    let parent: ParentNode | null = vm?.proxy?.$el.parentNode

    // TODO: Fix types
    // @ts-expect-error hasAttribute doesn't exist on parentNode type
    while (parent && parent.hasAttribute('data-no-reference'))
      parent = parent.parentNode

    parentEl.value = parent
  })

  return parentEl
}

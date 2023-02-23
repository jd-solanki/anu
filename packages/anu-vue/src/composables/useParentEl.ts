export const useParentEl = () => {
  const parentEL = ref()
  onMounted(() => {
    const vm = getCurrentInstance()
    if (vm?.proxy?.$parent)
      parentEL.value = unrefElement(vm?.proxy?.$parent)
  })

  return {
    parentEL,
  }
}

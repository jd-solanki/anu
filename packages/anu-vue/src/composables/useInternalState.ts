import type { Ref } from 'vue'

// NOTE: When using this composable, prop should be undefined
export const useInternalBooleanState = (state: Ref<boolean | undefined>, emit: any, eventToEmit: string, initialValue: boolean) => {
  const _internalState = ref(initialValue)

  const toggle = () => {
    if (state.value !== undefined)
      emit(eventToEmit)
    else
      _internalState.value = !_internalState.value
  }

  const internalState = computed(() => state.value !== undefined ? state.value : _internalState.value)

  return {
    internalState,
    toggle,
  }
}

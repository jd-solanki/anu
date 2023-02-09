import type { Ref } from 'vue'

// TODO: Make internalState writeable computed to easily modify the value
// NOTE: When using this composable, prop should be undefined
export const useInternalBooleanState = (state: Ref<boolean | undefined>, emit: any, eventToEmit: string, initialValue: boolean) => {
  const _internalState = ref(initialValue)

  // TODO: Allow passing value to set the value instead of just toggling
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

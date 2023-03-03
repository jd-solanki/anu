/**
 * `useCheckbox` vue composable using VueUse library that accepts v-model for checkbox state
 * It accepts modelValue of type boolean, string, number, array of unknown
 * Moreover, it also accepts trueValue and falseValue for customizing the values for true and false states
 */

import type { MaybeRef } from '@vueuse/core'

export function useCheckbox(
  modelValue: MaybeRef<string | number | boolean | unknown[]>,
  emit: (event: string, ...args: any[]) => void,
  trueValue: MaybeRef<string | number | boolean> = true,
  falseValue: MaybeRef<string | number | boolean> = false,
) {
  const handleModelValueChange = (val: typeof modelValue) => {
    const _modelValue = resolveUnref(modelValue)
    const _trueValue = resolveUnref(trueValue)
    const _falseValue = resolveUnref(falseValue)

    if (Array.isArray(_modelValue)) {
      if (val)
        emit('update:modelValue', [..._modelValue, _trueValue])

      else
        emit('update:modelValue', _modelValue.filter((item: any) => item !== _trueValue))
    }
    else {
      emit('update:modelValue', val ? _trueValue : _falseValue)
    }
  }

  const onChange = (e: Event) => {
    handleModelValueChange((e.target as HTMLInputElement).checked)
  }

  const isChecked = computed({
    get: () => {
      const _modelValue = resolveUnref(modelValue)
      const _trueValue = resolveUnref(trueValue)

      if (Array.isArray(_modelValue))
        return _modelValue.includes(_trueValue)

      return _modelValue === _trueValue
    },
    set: handleModelValueChange,
  })

  return {
    isChecked,
    onChange,
  }
}

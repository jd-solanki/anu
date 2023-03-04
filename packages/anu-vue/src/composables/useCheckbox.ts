/**
 * `useCheckbox` vue composable using VueUse library that accepts v-model for checkbox state
 * It accepts modelValue of type boolean, string, number, array of unknown
 * Moreover, it also accepts trueValue and falseValue for customizing the values for true and false states
 */

import type { MaybeComputedRef } from '@vueuse/core'

export type CheckboxModelValue = string | number | boolean | unknown[]

export function useCheckbox<Name extends string>(
  modelValue: MaybeComputedRef<CheckboxModelValue>,
  emit: (event: Name, ...args: any[]) => void,
  trueValue: MaybeComputedRef<CheckboxModelValue> = true,
  falseValue: MaybeComputedRef<CheckboxModelValue> = false,
) {
  const handleModelValueChange = (val: typeof modelValue) => {
    const _modelValue = resolveUnref(modelValue)
    const _trueValue = resolveUnref(trueValue)
    const _falseValue = resolveUnref(falseValue)

    if (Array.isArray(_modelValue)) {
      if (val)
        emit('update:modelValue' as Name, [..._modelValue, _trueValue])

      else
        emit('update:modelValue' as Name, _modelValue.filter((item: any) => item !== _trueValue))
    }
    else {
      emit('update:modelValue' as Name, val ? _trueValue : _falseValue)
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

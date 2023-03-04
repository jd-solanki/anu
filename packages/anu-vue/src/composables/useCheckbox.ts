/**
 * `useCheckbox` vue composable using VueUse library that accepts v-model for checkbox state
 * It accepts modelValue of type boolean, string, number, array of unknown
 * Moreover, it also accepts trueValue and falseValue for customizing the values for true and false states
 */

import type { MaybeComputedRef } from '@vueuse/core'
import type { ExtractPropTypes, PropType } from 'vue'

export type CheckboxModelValue = null | string | number | boolean | unknown[]

export const useCheckboxProps = {
  /**
   * Bind v-model value
   */
  modelValue: {
    type: [Boolean, Number, String, Array] as PropType<CheckboxModelValue>,
    default: true,
  },

  /**
   * Switch value when in on state
   */
  onValue: [Boolean, Number, String, Array] as PropType<CheckboxModelValue>,

  /**
   * Switch value when in off state
   */
  offValue: {
    type: [Boolean, Number, String, Array] as PropType<CheckboxModelValue>,
    default: false,
  },

  /**
   * Set custom value for indeterminate state
   */
  indeterminateValue: {
    type: [Boolean, Number, String, Array] as PropType<CheckboxModelValue>,
    default: null,
  },

  /**
   * Enable cycling indeterminate state
   */
  cycleIndeterminate: {
    type: Boolean,
    default: false,
  },
}

export type UseCheckboxProps = ExtractPropTypes<typeof useCheckboxProps>

export function useCheckbox<Name extends string>(
  modelValue: MaybeComputedRef<CheckboxModelValue>,
  emit: (event: Name, ...args: any[]) => void,
  trueValue: MaybeComputedRef<CheckboxModelValue> = true,
  falseValue: MaybeComputedRef<CheckboxModelValue> = false,
  indeterminateValue: MaybeComputedRef<CheckboxModelValue> = null,
  cycleIndeterminate: MaybeComputedRef<boolean> = false,
) {
  const handleModelValueChange = () => {
    const _cycleIndeterminate = resolveUnref(cycleIndeterminate)
    const _modelValue = resolveUnref(modelValue)

    const _trueValue = resolveUnref(trueValue)
    const _falseValue = resolveUnref(falseValue)
    const _indeterminateValue = resolveUnref(indeterminateValue)

    const cycleInitialValue = Array.isArray(_modelValue)
      ? (_modelValue.includes(_trueValue) ? _trueValue : _falseValue)
      : _modelValue
    const { next } = useCycleList(
      [...(_cycleIndeterminate ? [_indeterminateValue] : []), _trueValue, _falseValue],
      { initialValue: cycleInitialValue },
    )

    // Get next value in the cycle
    const newValue = next()

    if (Array.isArray(_modelValue)) {
      // ℹ️ Only add true values in the array
      if (newValue === _trueValue)
        emit('update:modelValue' as Name, [..._modelValue, _trueValue])

      else
        emit('update:modelValue' as Name, _modelValue.filter(item => item !== _trueValue))
    }
    else {
      emit('update:modelValue' as Name, newValue)
    }
  }

  const onChange = () => {
    handleModelValueChange()
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

  const isIndeterminate = computed(() => {
    const _modelValue = resolveUnref(modelValue)
    const _indeterminateValue = resolveUnref(indeterminateValue)

    if (Array.isArray(_modelValue))
      return _modelValue.includes(_indeterminateValue)

    return _modelValue === _indeterminateValue
  })

  return {
    isChecked,
    isIndeterminate,
    onChange,
  }
}

import type { MaybeRefOrGetter } from '@vueuse/core'
import type { ComponentObjectPropsOptions, PropType } from 'vue'
import { toValue } from 'vue'

export type CheckboxModelValue = null | string | number | boolean | unknown[]

export interface UseCheckboxProps {
  modelValue?: CheckboxModelValue
  checkedValue?: CheckboxModelValue
  uncheckedValue?: CheckboxModelValue
  indeterminateValue?: CheckboxModelValue
  cycleIndeterminate?: boolean
}

export const useCheckboxProps = ({
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
  checkedValue: [Boolean, Number, String, Array] as PropType<CheckboxModelValue>,

  /**
   * Switch value when in off state
   */
  uncheckedValue: {
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
} as const) satisfies ComponentObjectPropsOptions<UseCheckboxProps>

export function useCheckbox<Name extends string>(
  modelValue: MaybeRefOrGetter<CheckboxModelValue>,
  emit: (event: Name, ...args: any[]) => void,
  checkedValue: MaybeRefOrGetter<CheckboxModelValue> = true,
  uncheckedValue: MaybeRefOrGetter<CheckboxModelValue> = false,
  indeterminateValue: MaybeRefOrGetter<CheckboxModelValue> = null,
  cycleIndeterminate: MaybeRefOrGetter<boolean> = false,
) {
  const handleModelValueChange = () => {
    const _cycleIndeterminate = toValue(cycleIndeterminate)
    const _modelValue = toValue(modelValue)

    const _checkedValue = toValue(checkedValue)
    const _uncheckedValue = toValue(uncheckedValue)
    const _indeterminateValue = toValue(indeterminateValue)

    const cycleInitialValue = Array.isArray(_modelValue)
      ? (_modelValue.includes(_checkedValue) ? _checkedValue : _uncheckedValue)
      : _modelValue
    const { next } = useCycleList(
      [...(_cycleIndeterminate ? [_indeterminateValue] : []), _checkedValue, _uncheckedValue],
      { initialValue: cycleInitialValue },
    )

    // Get next value in the cycle
    const newValue = next()

    if (Array.isArray(_modelValue)) {
      // ℹ️ Only add true values in the array
      if (newValue === _checkedValue)
        emit('update:modelValue' as Name, [..._modelValue, _checkedValue])

      else
        emit('update:modelValue' as Name, _modelValue.filter(item => item !== _checkedValue))
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
      const _modelValue = toValue(modelValue)
      const _checkedValue = toValue(checkedValue)

      if (Array.isArray(_modelValue))
        return _modelValue.includes(_checkedValue)

      return _modelValue === _checkedValue
    },
    set: handleModelValueChange,
  })

  const isIndeterminate = computed(() => {
    const _modelValue = toValue(modelValue)
    const _indeterminateValue = toValue(indeterminateValue)

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

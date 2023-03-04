import { describe, expect, it, vitest } from 'vitest'
import type { CheckboxModelValue } from '../../src/composables/useCheckbox'
import { useCheckbox } from '../../src/composables/useCheckbox'

describe('useCheckbox', () => {
  it('should have `isChecked` as `false` when `modelValue` is `false`', () => {
    const modelValue = ref(false)
    const emitMock = vitest.fn()
    const trueValue = true
    const falseValue = false

    const { isChecked } = useCheckbox(modelValue, emitMock, trueValue, falseValue)

    expect(isChecked.value).toBe(false)
  })

  it('should have `isChecked` as `true` when `modelValue` is changed to `true`', async () => {
    const modelValue = ref<CheckboxModelValue>(false)
    const emitMock = vitest.fn((fnName: string, value: CheckboxModelValue) => {
      if (fnName === 'update:modelValue')
        modelValue.value = value
    })
    const trueValue = true
    const falseValue = false

    const { isChecked, onChange } = useCheckbox(modelValue, emitMock, trueValue, falseValue)

    // modelValue.value = true
    onChange()

    // await nextTick()

    expect(isChecked.value).toBe(true)

    // Check if `emit` was called with `update:modelValue` and `true` as arguments
    expect(emitMock).toBeCalledTimes(1)
    expect(emitMock).toHaveBeenCalledWith('update:modelValue', true)
  })

  // Test indeterminate value on cycle
  it('should have `isIndeterminate` as `true` when `onChange` is called', async () => {
    const modelValue = ref<CheckboxModelValue>(false)
    const emitMock = vitest.fn((fnName: string, value: CheckboxModelValue) => {
      if (fnName === 'update:modelValue')
        modelValue.value = value
    })
    const trueValue = true
    const falseValue = false
    const indeterminateValue = null

    const { isChecked, isIndeterminate, onChange } = useCheckbox(modelValue, emitMock, trueValue, falseValue, indeterminateValue, true)

    // `isChecked` should be false because `modelValue` is false
    expect(isChecked.value).toBe(false)

    // `isIndeterminate` should be false because `modelValue` is false and not `null`
    expect(isIndeterminate.value).toBe(false)

    // trigger checkbox click/update
    onChange()

    // As we are cycling through the values, `isIndeterminate` should be true and `isChecked` should be `false` after the first click
    expect(isIndeterminate.value).toBe(true)

    // Check if `emit` was called with `update:modelValue` and `true` as arguments
    expect(emitMock).toBeCalledTimes(1)
    expect(emitMock).toHaveBeenCalledWith('update:modelValue', null)

    // trigger checkbox click/update again to cycle through the values (modelValue will be `true`)
    onChange()

    // `isChecked` should be true
    expect(isChecked.value).toBe(true)

    // `isIndeterminate` should be false
    expect(isIndeterminate.value).toBe(false)

    // Check if `emit` was called with `update:modelValue` and `true` as arguments
    expect(emitMock).toBeCalledTimes(2)
    expect(emitMock).toHaveBeenCalledWith('update:modelValue', true)
  })

  it('should have `isChecked` as `true` when `modelValue` is changed to `true`', () => {
    const trueValue = 'on'
    const falseValue = 'off'

    const modelValue = ref<CheckboxModelValue>(falseValue)

    const emitMock = vitest.fn((fnName: string, value: CheckboxModelValue) => {
      if (fnName === 'update:modelValue')
        modelValue.value = value
    })

    const { isChecked, onChange } = useCheckbox(modelValue, emitMock, trueValue, falseValue)

    expect(isChecked.value).toBe(false)
    expect(modelValue.value).toBe(falseValue)

    modelValue.value = trueValue
    expect(isChecked.value).toBe(true)

    onChange()

    expect(modelValue.value).toBe(falseValue)
  })

  it('`trueValue`, `falseValue` & `indeterminateValue` should cycle when `cycleIndeterminate` is true', () => {
    const trueValue = 'on'
    const falseValue = 'off'
    const indeterminateValue = 'unknown'

    const modelValue = ref<CheckboxModelValue>(falseValue)

    const emitMock = vitest.fn((fnName: string, value: CheckboxModelValue) => {
      if (fnName === 'update:modelValue')
        modelValue.value = value
    })

    const { isChecked, isIndeterminate, onChange } = useCheckbox(modelValue, emitMock, trueValue, falseValue, indeterminateValue, true)

    // `isChecked` should be false because `modelValue` is false
    expect(isChecked.value).toBe(false)

    // `isIndeterminate` should be false because `modelValue` is false and not `null`
    expect(isIndeterminate.value).toBe(false)

    // `modelValue` should be `falseValue` initially
    expect(modelValue.value).toBe(falseValue)

    // trigger checkbox click/update
    onChange()

    // As we are cycling through the values, `isIndeterminate` should be true and `isChecked` should be `false` after the first click
    expect(isChecked.value).toBe(false)
    expect(isIndeterminate.value).toBe(true)

    // `modelValue` should be `indeterminateValue` after the first click
    expect(modelValue.value).toBe(indeterminateValue)

    // trigger checkbox click/update again to cycle through the values (modelValue will be `true`)
    onChange()

    // `isChecked` should be true
    expect(isChecked.value).toBe(true)

    // `isIndeterminate` should be false
    expect(isIndeterminate.value).toBe(false)

    // `modelValue` should be `trueValue` after the second click
    expect(modelValue.value).toBe(trueValue)

    // trigger checkbox click/update again to cycle through the values (modelValue will be `false`)
    onChange()

    // `isChecked` should be false
    expect(isChecked.value).toBe(false)

    // `isIndeterminate` should be false
    expect(isIndeterminate.value).toBe(false)

    // `modelValue` should be `falseValue` after the third click
    expect(modelValue.value).toBe(falseValue)
  })

  it('`trueValue` and `falseValue` should cycle only when `cycleIndeterminate` is false', () => {
    const trueValue = 'on'
    const falseValue = 'off'

    // ℹ️ We are just using & passing indeterminateValue to make sure even if it is passed, it is not used
    const indeterminateValue = 'unknown'

    const modelValue = ref<CheckboxModelValue>(falseValue)

    const emitMock = vitest.fn((fnName: string, value: CheckboxModelValue) => {
      if (fnName === 'update:modelValue')
        modelValue.value = value
    })

    const { isChecked, isIndeterminate, onChange } = useCheckbox(modelValue, emitMock, trueValue, falseValue, indeterminateValue, false)

    // `isChecked` should be false because `modelValue` is false
    expect(isChecked.value).toBe(false)

    // `isIndeterminate` should be false because `modelValue` is false and not `null`
    expect(isIndeterminate.value).toBe(false)

    // `modelValue` should be `falseValue` initially
    expect(modelValue.value).toBe(falseValue)

    // trigger checkbox click/update
    onChange()

    // As we are cycling through the values, `isChecked` should be true and `isChecked` should be `isIndeterminate` after the first click because `cycleIndeterminate` is false
    expect(isChecked.value).toBe(true)
    expect(isIndeterminate.value).toBe(false)

    // `modelValue` should be `trueValue` after the first click
    expect(modelValue.value).toBe(trueValue)

    // trigger checkbox click/update again to cycle through the values (modelValue will be `false`)
    onChange()

    // `isChecked` should be false
    expect(isChecked.value).toBe(false)

    // `isIndeterminate` should be false
    expect(isIndeterminate.value).toBe(false)

    // `modelValue` should be `falseValue` after the second click
    expect(modelValue.value).toBe(falseValue)
  })

  // TODO: Add array tests
})

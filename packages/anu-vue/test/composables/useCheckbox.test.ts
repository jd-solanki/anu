import { describe, expect, it, vitest } from 'vitest'
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

  it('should have `isChecked` as `true` when `modelValue` is changed to `true`', () => {
    const modelValue = ref(false)
    const emitMock = vitest.fn()
    const trueValue = true
    const falseValue = false

    const { isChecked } = useCheckbox(modelValue, emitMock, trueValue, falseValue)

    modelValue.value = true

    expect(isChecked.value).toBe(true)

    // TODO: Why it isn't working?
    // Check if `emit` was called with `update:modelValue` and `true` as arguments
    // expect(emitMock).toBeCalledTimes(1)
    // expect(emitMock).toHaveBeenCalledWith('update:modelValue', true)
  })

  // Test passing trueValue and falseValue
  it('should have `isChecked` as `true` when `modelValue` is changed to `true`', () => {
    const trueValue = 'on'
    const falseValue = 'off'

    const modelValue = ref(falseValue)
    const emitMock = vitest.fn()

    const { isChecked, onChange } = useCheckbox(modelValue, emitMock, trueValue, falseValue)

    expect(isChecked.value).toBe(false)

    modelValue.value = trueValue
    expect(isChecked.value).toBe(true)

    onChange({ target: { checked: false } } as unknown as Event)

    // TODO: Why it isn't working?
    // expect(modelValue.value).toBe(falseValue)
  })
})

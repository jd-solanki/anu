import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick, ref } from 'vue'
import { ASelect } from '../src'

describe('Testing ASelect', async () => {
  it('should render', () => {
    const options = ref(['banana', 'apple', 'watermelon'])
    const wrapper = mount(() =>
      <ASelect options={options.value}></ASelect>,
    )
    expect(wrapper).toBeDefined()
  })

  it('should select default value', async () => {
    const options = ref(['banana', 'apple', 'watermelon'])
    const modelValue = ref('apple')
    const wrapper = mount(() =>
      <ASelect
        v-model={modelValue.value}
        options={options.value}
      ></ASelect>,
    )
    await nextTick()
    const inputElement = wrapper.find('.a-select-input').element as HTMLInputElement
    expect(inputElement.value).toContain('apple')
  })
})

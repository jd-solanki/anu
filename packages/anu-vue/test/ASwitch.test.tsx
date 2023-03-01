import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { ASwitch } from '../src/components'

describe('Testing ASwitch', () => {
  it('expand switch value', async () => {
    const modelValue = ref('100')
    const onValue = ref('100')
    const offValue = ref('0')

    const wrapper = mount(() => (
      <ASwitch
        v-model={modelValue.value}
        onValue={onValue.value}
        offValue={offValue.value}
      />
    ), {
      // trigger click on a label have an issue
      // https://github.com/vuejs/vue-test-utils/issues/760
      attachTo: document.body,
    })

    const coreWrapper = wrapper.find('.a-switch')
    await coreWrapper.trigger('click')
    expect(modelValue.value).toBe('0')
    await wrapper.trigger('click')
    expect(modelValue.value).toBe('100')
  })
})

import { nextTick } from 'node:process'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { ASwitch } from '../src/components'

describe('Testing ASwitch', () => {
  // Test switch model value
  it('switch model value', async () => {
    const modelValue = ref(false)

    const wrapper = mount(() => (
      <ASwitch v-model={modelValue.value} />
    ), {
      // trigger click on a label have an issue
      // https://github.com/vuejs/vue-test-utils/issues/760
      attachTo: document.body,
    })

    const coreWrapper = wrapper.find('.a-switch')
    await coreWrapper.trigger('click')
    expect(modelValue.value).toBe(true)
  })

  // Test switch color via color prop
  it('switch color', async () => {
    const wrapper = mount(() => (
      <ASwitch color="primary" />
    ))

    const switchToggler = wrapper.find('.a-switch-toggle')

    // Check `.a-switch-toggle` class has `bg-primary` class
    expect(switchToggler.classes()).toContain('bg-primary')
  })

  // Test switch color prop reactivity
  it('switch color prop reactivity', async () => {
    const color = ref('primary')

    const wrapper = mount(() => (
      <ASwitch color={color.value} />
    ))

    const switchToggler = wrapper.find('.a-switch-toggle')

    // Check `.a-switch-toggle` class has `bg-primary` class
    expect(switchToggler.classes()).toContain('bg-primary')

    color.value = 'success'

    // We need to call await nextTick() to wait for the DOM to update
    await nextTick(() => {
      // Check `.a-switch-toggle` class has `bg-success` class
      expect(switchToggler.classes()).toContain('bg-success')
    })
  })

  // Test label prop renders text in .a-switch-label
  it('switch label', async () => {
    const wrapper = mount(() => (
      <ASwitch label="Email Notification" />
    ))

    const switchLabel = wrapper.find('label > .a-switch-label')

    // Check `.a-switch-label` has text `Email Notification`
    expect(switchLabel.text()).toBe('Email Notification')
  })

  // Test switch `on-icon` & `off-icon` props
  it('switch on-icon & off-icon', async () => {
    const modelValue = ref(false)

    const wrapper = mount(() => (
      <ASwitch v-model={modelValue.value}
        onIcon="i-bx-bell"
        offIcon="i-bx-bell-off"
      />
    ), {
      // trigger click on a label have an issue
      // https://github.com/vuejs/vue-test-utils/issues/760
      attachTo: document.body,
    })

    const switchIconEl = wrapper.find('.a-switch-icon')

    // Check switchIconEl has `i-bx-bell-off` class
    expect(switchIconEl.classes()).toContain('i-bx-bell-off')

    // Toggle switch
    await wrapper.trigger('click')

    // Check switchIconEl has `i-bx-bell` class
    expect(switchIconEl.classes()).toContain('i-bx-bell')
  })

  it('custom model value', async () => {
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

  // Test switch `disabled` prop added `.a-switch-disabled` class nad has `pointer-events: none` & `opacity: 0.5`
  it('switch disabled', async () => {
    const wrapper = mount(() => (
      <ASwitch disabled />
    ))

    const coreWrapper = wrapper.find('.a-switch')

    // Check `.a-switch` has `.a-switch-disabled` class
    expect(coreWrapper.classes()).toContain('a-switch-disabled')

    // Check `.a-switch` has `pointer-events-none` class
    expect(coreWrapper.classes()).toContain('pointer-events-none')

    // Check `.a-switch` has `pointer-events: none` & `opacity: 0.5` styles
    // expect(window.getComputedStyle(coreWrapper.element).pointerEvents).toBe('none')
    // expect(window.getComputedStyle(coreWrapper.element).opacity).toBe('0.5')
  })
})

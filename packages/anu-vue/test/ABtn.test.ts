import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { ABtn } from '../src/components'

describe('Testing ABtn', () => {
  it('can mount component', () => {
    const wrapper = shallowMount(ABtn, { props: {}, slots: { default: 'Click me' } })

    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button').text()).toBe('Click me')

    expect(wrapper.classes()).toContain('a-btn')

    // In browser mode, this is invalid
    // const btnStyles = window.getComputedStyle(wrapper.find('button').element)._values
    // expect(btnStyles['--a-layer-c']).toBe('var(--a-primary)')

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('has proper classes', () => {
    const wrapper = shallowMount(ABtn, { props: {}, slots: { default: 'Click me' } })
    expect(wrapper.classes()).toMatchSnapshot()
  })

  it('handles click event', async () => {
    const wrapper = shallowMount(ABtn, { props: {}, slots: { default: 'Click me' } })

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeDefined()
  })

  // Invalid in browser
  // it('color prop changes button color', () => {
  //   const wrapper = shallowMount(ABtn, { props: { color: 'warning' }, slots: { default: 'Click me' } })

  //   const btnStyles = window.getComputedStyle(wrapper.find('button').element)._values

  //   expect(btnStyles['--a-layer-c']).toBe('var(--a-warning)')
  // })

  it('icon prop adds an icon', () => {
    const wrapper = shallowMount(ABtn, { props: { icon: 'i-bx-heart' }, slots: { default: 'Click me' } })

    expect(wrapper.findAll('button i')[0].classes()).toContain('i-bx-heart')
  })

  it('appendIcon prop adds an icon after the text', () => {
    const wrapper = shallowMount(ABtn, { props: { icon: 'i-bx-heart', appendIcon: 'i-bx-star' }, slots: { default: 'Click me' } })

    expect(wrapper.findAll('button i')[0].classes()).toContain('i-bx-heart')
    expect(wrapper.findAll('button i')[1].classes()).toContain('i-bx-star')
  })

  it('iconOnly prop applies a-btn-icon-only style', () => {
    const wrapper = shallowMount(ABtn, { props: { icon: 'i-bx-heart', iconOnly: true }, slots: { default: 'Click me' } })

    expect(wrapper.findAll('button i')[0].classes()).toContain('i-bx-heart')
    expect(wrapper.classes()).not.toContain('a-btn')
    expect(wrapper.classes()).toContain('a-btn-icon-only')
  })

  it('disabled prop disables cursor, decreases opacity and set tabindex to -1', async () => {
    const wrapper = shallowMount(ABtn, { props: { disabled: true }, slots: { default: 'Click me' } })

    expect(wrapper.classes()).toContain('opacity-50')
    expect(wrapper.classes()).toContain('pointer-events-none')
    expect(wrapper.find('button').element.tabIndex).toBe(-1)

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })
})

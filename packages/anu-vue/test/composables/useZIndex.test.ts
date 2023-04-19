import { describe, expect, it } from 'vitest'
import type { ComponentPublicInstance } from 'vue'
import { defineComponent, nextTick, ref } from 'vue'
import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { defaultBaseZIndex, useZIndex, zIndexContextKey } from '../../src/composables/useZIndex'

describe('useZIndex', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>

  const mountComponent = (provideZIndex?: number) => mount(
    defineComponent({
      setup(_, { expose }) {
        const zIndex = useZIndex()
        expose(zIndex)
      },
    }),
    {
      global: {
        provide: {
          [zIndexContextKey]: ref(provideZIndex),
        },
      },
    },
  )

  it('should have the default baseZIndex when no custom zIndex is provided', async () => {
    wrapper = mountComponent()
    await nextTick()
    expect(wrapper.vm.baseZIndex).toBe(defaultBaseZIndex)
  })

  it('should use the provided custom zIndex', async () => {
    const zIndex = 1000
    wrapper = mountComponent(zIndex)
    const { vm } = wrapper
    await nextTick()
    expect(vm.baseZIndex).toBe(zIndex)
  })

  it('should increment zIndex correctly', async () => {
    wrapper = mountComponent()
    const { vm } = wrapper
    await nextTick()
    const initialZIndex = vm.activeZIndex
    const incrementedZIndex = vm.nextZIndex()
    expect(incrementedZIndex).toBe(initialZIndex + 1)
    expect(vm.activeZIndex).toBe(initialZIndex + 1)
  })
})

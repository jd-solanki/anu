import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, nextTick, ref } from 'vue'
import ConfigProvider from '../src/components/config-provider/config-provider'
import { useConfig } from '../src/composables/useConfig'

describe('ConfigProvider.vue', () => {
  it('provides config to child components', () => {
    const config = ref()
    const zIndex = 1000
    const TestComponent = defineComponent({
      setup() {
        config.value = useConfig().value

        return () => <div></div>
      },
    })

    mount(() =>
      <ConfigProvider zIndex={zIndex}>
        <TestComponent />
      </ConfigProvider>,
    )
    expect(config.value.zIndex).toBe(zIndex)
  })

  it('updates provided config when value changes', async () => {
    const config = ref()
    const zIndex = ref(1000)
    const TestComponent = defineComponent({
      setup() {
        config.value = useConfig().value

        return () => <div></div>
      },
    })
    mount(() =>
      <ConfigProvider zIndex={zIndex.value}>
        <TestComponent></TestComponent>
      </ConfigProvider>,
    )

    zIndex.value = 3000
    await nextTick()

    expect(config.value.zIndex).toBe(3000)
  })

  it('provides nested child config correctly', async () => {
    const parentZIndex = 2000
    const childZIndex = 3000
    const nestedConfig = ref()

    const NestedChildComponent = defineComponent({
      setup() {
        nestedConfig.value = useConfig().value

        return () => <div></div>
      },
    })

    const ChildComponent = defineComponent({
      components: { ConfigProvider, NestedChildComponent },
      setup() {
        return () => (
          <ConfigProvider zIndex={childZIndex}>
            <NestedChildComponent />
          </ConfigProvider>
        )
      },
    })

    const ParentComponent = defineComponent({
      components: { ConfigProvider, ChildComponent },
      setup() {
        return () => (
          <ConfigProvider zIndex={parentZIndex}>
            <ChildComponent />
          </ConfigProvider>
        )
      },
    })

    mount(ParentComponent)
    await nextTick()
    expect(nestedConfig.value.zIndex).toBe(childZIndex)
  })
})

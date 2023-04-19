import { defineComponent, renderSlot } from 'vue'
import { provideConfig } from '@/composables/useConfig'
import { configProviderProps } from '@/components/config-provider/config-provider-props'

const ConfigProvider = defineComponent({
  name: 'AConfigProvider',
  props: configProviderProps,
  setup(props, { slots }) {
    const config = provideConfig(props)

    return () => renderSlot(slots, 'default', { config: config?.value })
  },
})

export type ConfigProviderInstance = InstanceType<typeof ConfigProvider>

export default ConfigProvider

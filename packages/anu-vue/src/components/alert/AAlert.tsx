import { useLayer, useProps as useLayerProps } from '@/composables/useLayer'
import { defineComponent } from 'vue'

export const AAlert = defineComponent({
  name: 'AAlert',
  props: {
    ...useLayerProps({
      color: {
        default: 'primary',
      },
      variant: {
        default: 'light',
      },
    }),
  },
  setup(props, { slots }) {
    const { getLayerClasses } = useLayer()

    return () => <div class={['alert flex items-start i:flex-shrink-0', ...getLayerClasses(props)]}>
            {slots.default?.()}
        </div>
  },
})

export type AAlert = InstanceType<typeof AAlert>

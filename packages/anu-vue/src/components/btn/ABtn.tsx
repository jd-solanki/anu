import { useLayer, useProps as useLayerProps } from '@/composables/useLayer';
import { defineComponent } from "vue";

export const ABtn = defineComponent({
    name: 'ABtn',
    props: {
        ...useLayerProps({
            color: {
                default: 'primary',
            },
            variant: {
                default: 'fill'
            }
        })
    },
    setup(props, { slots }) {
        const { getLayerClasses } = useLayer()

        return () => <button class={['btn flex items-center', ...getLayerClasses(props)]}>
            {slots.default?.()}
        </button>

    }
})

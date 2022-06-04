import { defineComponent } from 'vue'

export const ADrawer = defineComponent({
    name: 'ADrawer',
    props: {
        static: {
            type: Boolean,
            default: true,
        }
    },
    setup(props, { slots }) {

        return () => <aside class={['drawer sticky left-0 top-0 h-full max-h-screen']}>
            {slots.default?.()}
        </aside>
    },
})

export type ADrawer = InstanceType<typeof ADrawer>

import { defineComponent } from 'vue'

export const AHeading = defineComponent({
    name: 'AHeading',
    props: {
        title: String,
        subtitle: String,
        tag: {
            type: String,
            default: 'h2',
        },
        subtitleTag: {
            type: String,
            default: 'p',
        },
    },
    setup(props, { slots }) {
        return () => <>
            <props.tag>{slots.title ? slots.title() : props.title}</props.tag>
            <props.subtitleTag>{slots.subtitle ? slots.subtitle() : props.subtitle}</props.subtitleTag>
        </>
    },
})

export type AHeading = InstanceType<typeof AHeading>

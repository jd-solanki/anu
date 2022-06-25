import { defineComponent, PropType } from 'vue'

export const ATypography = defineComponent({
    name: 'ATypography',
    props: {
        title: [String, Array] as PropType<string | string[]>,
        subtitle: [String, Array],
        text: [String, Array],
        tag: {
            type: String,
            default: 'span',
            // default: 'h4',
        },
        subtitleTag: {
            type: String,
            default: 'span',
            // default: 'p',
        },
        textTag: {
            type: String,
            default: 'span',
        }
    },
    setup(props, { slots }) {

        const [titleContent, titleClasses] = props.title == undefined
            ? []
            : typeof props.title === 'string'
                ? [props.title]
                : props.title

        const [subtitleContent, subtitleClasses] = props.subtitle == undefined
            ? []
            : typeof props.subtitle === 'string'
                ? [props.subtitle]
                : props.subtitle

        const [textContent, textClasses] = props.text == undefined
            ? []
            : typeof props.text === 'string'
                ? [props.text]
                : props.text

        // TODO: Remove class block and use commented tag defaults instead of span once VitePress allow style isolation
        return () => <div>
            {
                slots.title || props.title
                    ? <props.tag class={["block text-rlg", titleClasses]}>{slots.title ? slots.title() : titleContent}</props.tag>
                    : null
            }
            {
                slots.subtitle || props.subtitle
                    ? <props.subtitleTag class={["block text-rsm text-gray-400", subtitleClasses]}>{slots.subtitle ? slots.subtitle() : subtitleContent}</props.subtitleTag>
                    : null
            }
            {
                slots.default || props.text
                    ? <props.textTag class={["text-rbase", textClasses]}>{slots.default ? slots.default() : textContent}</props.textTag>
                    : null
            }
        </div>
    },
})

export type ATypography = InstanceType<typeof ATypography>

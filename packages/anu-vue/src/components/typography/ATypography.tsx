import { useTypographyProps } from '@/composables/useTypography';
import { defineComponent } from 'vue';

export const ATypography = defineComponent({
    name: 'ATypography',
    props: {
        ...useTypographyProps(),
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
        return () => <div class="uno-layer-base-text-base gap-4 flex flex-col">
            <div>
                {
                    slots.title || props.title
                        ? <props.titleTag class={["block uno-layer-base-text-rlg uno-layer-base-text-[hsla(var(--typography-title-color),var(--typography-title-opacity))]", titleClasses]}>{slots.title ? slots.title() : titleContent}</props.titleTag>
                        : null
                }
                {
                    slots.subtitle || props.subtitle
                        ? <props.subtitleTag class={["block uno-layer-base-text-rsm uno-layer-base-text-[hsla(var(--typography-subtitle-color),var(--typography-subtitle-opacity))]", subtitleClasses]}>{slots.subtitle ? slots.subtitle() : subtitleContent}</props.subtitleTag>
                        : null
                }
            </div>
            {
                slots.default || props.text
                    ? <props.textTag class={["uno-layer-base-text-rbase uno-layer-base-text-[hsla(var(--typography-text-color),var(--typography-text-opacity))]", textClasses]}>{slots.default ? slots.default() : textContent}</props.textTag>
                    : null
            }
        </div>
    },
})

export type ATypography = InstanceType<typeof ATypography>

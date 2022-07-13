import { useTypographyProps } from '@/composables/useTypography'
import { computed, defineComponent } from 'vue'

export const ATypography = defineComponent({
  name: 'ATypography',
  props: {
    ...useTypographyProps(),
  },
  setup(props, { slots }) {
    const title = computed(() => {
      const [titleContent, titleClasses] = props.title === undefined
        ? []
        : typeof props.title === 'string'
          ? [props.title]
          : props.title

      return {
        titleContent,
        titleClasses,
      }
    })

    // const [subtitleContent, subtitleClasses] = computed(() => props.subtitle === undefined
    const subtitle = computed(() => {
      const [subtitleContent, subtitleClasses] = props.subtitle === undefined
        ? []
        : typeof props.subtitle === 'string'
          ? [props.subtitle]
          : props.subtitle

      return {
        subtitleContent,
        subtitleClasses,
      }
    })

    const text = computed(() => {
      const [textContent, textClasses] = props.text === undefined
        ? []
        : typeof props.text === 'string'
          ? [props.text]
          : props.text

      return {
        textContent,
        textClasses,
      }
    })

    // TODO: Remove class block and use commented tag defaults instead of span once VitePress allow style isolation
    return () => <div class="uno-layer-base-text-base gap-4 flex flex-col">
            <div class="flex justify-between">
                {/* Only render this header div if required */}
                <div class="flex-grow">
                    {
                        slots.title || props.title
                          ? <props.titleTag class={['font-medium block uno-layer-base-text-rlg uno-layer-base-text-[hsla(var(--typography-title-color),var(--typography-title-opacity))]', title.value.titleClasses]}>{slots.title ? slots.title() : title.value.titleContent}</props.titleTag>
                          : null
                    }
                    {
                        slots.subtitle || props.subtitle
                          ? <props.subtitleTag class={['block em:uno-layer-base-text-sm uno-layer-base-text-[hsla(var(--typography-subtitle-color),var(--typography-subtitle-opacity))]', subtitle.value.subtitleClasses]}>{slots.subtitle ? slots.subtitle() : subtitle.value.subtitleContent}</props.subtitleTag>
                          : null
                    }
                </div>
                {slots.headerRight?.()}
            </div>
            {
                slots.default || props.text
                  ? <props.textTag class={['em:uno-layer-base-text-base uno-layer-base-text-[hsla(var(--typography-text-color),var(--typography-text-opacity))]', text.value.textClasses]}>{slots.default ? slots.default() : text.value.textContent}</props.textTag>
                  : null
            }
        </div>
  },
})

export type ATypography = InstanceType<typeof ATypography>

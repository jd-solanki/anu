import { defineComponent, toRef } from 'vue'
import { useConfigurable } from '@/composables/useConfigurable'
import { useTypographyProps } from '@/composables/useTypography'

export const ATypography = defineComponent({
  name: 'ATypography',
  props: {
    ...useTypographyProps(),
  },
  setup(props, { slots }) {
    const title = useConfigurable(toRef(props, 'title'))
    const subtitle = useConfigurable(toRef(props, 'subtitle'))
    const text = useConfigurable(toRef(props, 'text'))

    // TODO: Remove class block and use commented tag defaults instead of span once VitePress allow style isolation
    return () => {
      const typographyHeader = <div class="flex justify-between">
        <div class="flex-grow">
          {
            slots.title || props.title
              ? <props.titleTag
                  {...title.value.attrs}
                  class={[
                    'font-medium block em:uno-layer-base-text-lg uno-layer-base-text-[hsla(var(--a-typography-title-color),var(--a-typography-title-opacity))]',
                    title.value.classes,
                  ]}
                >
                {slots.title ? slots.title() : title.value.content}
              </props.titleTag>
              : null
            }
          {
            slots.subtitle || props.subtitle
              ? <props.subtitleTag
                  {...subtitle.value.attrs}
                  class={[
                    'block em:uno-layer-base-text-sm uno-layer-base-text-[hsla(var(--a-typography-subtitle-color),var(--a-typography-subtitle-opacity))]',
                    subtitle.value.classes,
                  ]}
                >
                {slots.subtitle ? slots.subtitle() : subtitle.value.content}
              </props.subtitleTag>
              : null
            }
        </div>
        {slots.headerRight?.()}
      </div>

      return <div class="uno-layer-base-text-base gap-4 flex flex-col">
        {slots.title || props.title || slots.subtitle || props.subtitle || slots.headerRight ? typographyHeader : null}
        {
          slots.default || props.text
            ? <props.textTag
                {...text.value.attrs}
                class={[
                  'uno-layer-base-text-[hsla(var(--a-typography-text-color),var(--a-typography-text-opacity))]',
                  text.value.classes,
                ]}
              >
              {slots.default ? slots.default() : text.value.content}
            </props.textTag>
            : null
        }
      </div>
    }
  },
})

export type ATypography = InstanceType<typeof ATypography>

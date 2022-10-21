import type { Ref } from 'vue'
import { defineComponent, toRef } from 'vue'
import type { ConfigurableValue } from '@/composables/useConfigurable'
import { useConfigurable } from '@/composables/useConfigurable'
import { useTypographyProps } from '@/composables/useTypography'

export const ATypography = defineComponent({
  name: 'ATypography',
  props: {
    ...useTypographyProps(),
  },
  setup(props, { slots }) {
    const typographyItems = ['title', 'subtitle', 'text'] as const

    const data = typographyItems.reduce((acc, item) => {
      acc[item] = useConfigurable(toRef(props, item) as Ref<ConfigurableValue>)

      return acc
    }, {} as Record<typeof typographyItems[number], ReturnType<typeof useConfigurable>>)

    // TODO: Remove class block and use commented tag defaults instead of span once VitePress allow style isolation
    return () => {
      const typographyHeader = <div class="flex justify-between">
        <div class="flex-grow">
            {
                slots.title || props.title
                  ? <props.titleTag class={['font-medium block em:uno-layer-base-text-lg uno-layer-base-text-[hsla(var(--a-typography-title-color),var(--a-typography-title-opacity))]', data.title.value.classes]}>{slots.title ? slots.title() : data.title.value.content}</props.titleTag>
                  : null
            }
            {
                slots.subtitle || props.subtitle
                  ? <props.subtitleTag class={['block em:uno-layer-base-text-sm uno-layer-base-text-[hsla(var(--a-typography-subtitle-color),var(--a-typography-subtitle-opacity))]', data.subtitle.value.classes]}>{slots.subtitle ? slots.subtitle() : data.subtitle.value.content}</props.subtitleTag>
                  : null
            }
        </div>
        {slots.headerRight?.()}
    </div>

      return <div class="uno-layer-base-text-base gap-4 flex flex-col">
            {slots.title || props.title || slots.subtitle || props.subtitle || slots.headerRight ? typographyHeader : null}
            {
                slots.default || props.text
                  ? <props.textTag class={['em:uno-layer-base-text-base uno-layer-base-text-[hsla(var(--a-typography-text-color),var(--a-typography-text-opacity))]', data.text.value.classes]}>{slots.default ? slots.default() : data.text.value.content}</props.textTag>
                  : null
            }
        </div>
    }
  },
})

export type ATypography = InstanceType<typeof ATypography>

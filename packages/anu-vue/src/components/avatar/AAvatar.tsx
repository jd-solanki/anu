import { computed, defineComponent, toRef } from 'vue'
import { avatarOnlyProps } from '@/components/avatar/props'
import { useLayer, useProps as useLayerProps } from '@/composables/useLayer'

export const AAvatar = defineComponent({
  name: 'AAvatar',
  props: {
    ...useLayerProps({
      color: {
        default: 'primary',
      },
      variant: {
        default: 'light',
      },
    }),
    ...avatarOnlyProps,
  },
  setup(props, { slots }) {
    const { getLayerClasses } = useLayer()
    const { styles, classes } = getLayerClasses(
      toRef(props, 'color'),
      toRef(props, 'variant'),
      toRef(props, 'states'),
    )

    const defaultSlotContent = computed(() => {
      if (props.icon)
        return <i class={props.icon}></i>
      if (props.src)
        return <img src={props.src} alt={props.alt} />

      return props.content
    })

    return () => <div class={['a-avatar overflow-hidden uno-layer-base-text-2xl em:h-8 em:w-8 inline-flex items-center justify-center uno-layer-base-rounded-full', ...classes.value]} style={[...styles.value]}>
      {
        slots.default
          ? slots.default()
          : defaultSlotContent.value
      }
    </div>
  },
})

export type AAvatar = InstanceType<typeof AAvatar>

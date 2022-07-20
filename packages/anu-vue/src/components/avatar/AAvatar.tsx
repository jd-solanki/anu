import { useLayer, useProps as useLayerProps } from '@/composables/useLayer'
import { computed, defineComponent } from 'vue'

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
    icon: {
      type: String,
      required: false,
      default: undefined,
    },
    text: {
      type: String,
      required: false,
      default: undefined,
    },
    src: {
      type: String,
      required: false,
      default: undefined,
    },
    alt: {
      type: String,
      required: false,
      default: 'avatar',
    },
  },
  setup(props, { slots }) {
    const { getLayerClasses } = useLayer()

    const defaultSlotContent = computed(() => {
      if (props.icon)
        return <i class={props.icon}></i>
      if (props.src)
        return <img src={props.src} alt={props.alt}></img>

      return props.text
    })

    return () => <div class={['a-avatar overflow-hidden uno-layer-base-text-2xl em:h-8 em:w-8 inline-flex items-center justify-center uno-layer-base-rounded-full', ...getLayerClasses(props)]}>
      {
        slots.default
          ? slots.default()
          : defaultSlotContent.value
      }
    </div>
  },
})

export type AAvatar = InstanceType<typeof AAvatar>

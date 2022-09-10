import type { PropType } from 'vue'
import { computed, defineComponent } from 'vue'
import { color } from '@/composables/useProps'

export interface AnchorOrigin {
  vertical: 'top' | 'bottom'
  horizontal: 'left' | 'right'
}

export const ABadge = defineComponent({
  name: 'ABadge',
  props: {
    color: {
      ...color,
      default: 'primary',
    },
    variant: {
      type: String as PropType<'standard' | 'dot'>,
      default: 'standard',
    },
    max: {
      type: Number,
      default: 99,
    },
    badgeContent: {
      type: Number,
    },
    anchorOrigin: {
      type: Object as PropType<AnchorOrigin>,
      default: () => ({ vertical: 'top', horizontal: 'right' }),
    },
  },
  setup(props, { slots }) {
    const badgeSlotContent = computed(() => {
      if (slots.badgeContent)
        return slots.badgeContent?.()
      if (props.badgeContent)
        return props.badgeContent

      return ''
    })

    return () => <div class={['a-badge-wrapper']}>
      {slots.default?.()}
      <div class={[`a-badge a-badge-${props.variant} a-badge-${props.anchorOrigin.vertical}-${props.anchorOrigin.horizontal} bg-${props.color}`]}>{badgeSlotContent}</div>
    </div>
  },
})

export type ABadge = InstanceType<typeof ABadge>

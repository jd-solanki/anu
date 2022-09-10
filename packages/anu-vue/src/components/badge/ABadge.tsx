import type { PropType } from 'vue'
import { computed, defineComponent } from 'vue'
import { color } from '@/composables/useProps'
import { isNumeric } from '@/utils/helpers'

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
    overlap: {
      type: String as PropType<'rectangular' | 'circular'>,
      default: 'rectangular',
    },
  },
  setup(props, { slots }) {
    const formatMaxBadgeContent = (badgeContent: unknown) => {
      if (!isNumeric(badgeContent))
        return badgeContent

      const numericBadgeContent = Number(badgeContent)
      if (numericBadgeContent > props.max)
        return `${props.max}+`

      return numericBadgeContent
    }

    const badgeSlotContent = computed(() => {
      if (props.variant === 'dot')
        return ''
      if (slots.badgeContent)
        return formatMaxBadgeContent(slots.badgeContent?.())
      if (props.badgeContent)
        return formatMaxBadgeContent(props.badgeContent)

      return ''
    })

    return () => <div class={['a-badge-wrapper']}>
      {slots.default?.()}
      <div class={[`a-badge a-badge-${props.variant} a-badge-${props.overlap}-${props.anchorOrigin.vertical}-${props.anchorOrigin.horizontal} bg-${props.color}`]}>
        {badgeSlotContent.value}
      </div>
    </div>
  },
})

export type ABadge = InstanceType<typeof ABadge>

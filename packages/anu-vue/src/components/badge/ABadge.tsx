import type { PropType } from 'vue'
import { Transition, computed, defineComponent } from 'vue'
import { color } from '@/composables/useProps'
import { isNumeric } from '@/utils/helpers'

export type VerticalAnchor = 'top' | 'bottom'
export type HorizontalAnchor = 'left' | 'right'
export type Anchor = `${VerticalAnchor} ${HorizontalAnchor}`

const defaultOffset = 4
const defaultOverlapOffset = 12

export const ABadge = defineComponent({
  name: 'ABadge',
  props: {
    modelValue: {
      type: Boolean,
      default: true,
    },
    color: {
      ...color,
      default: 'primary',
    },
    dot: {
      type: Boolean,
      default: false,
    },
    bordered: {
      type: Boolean,
      default: true,
    },
    max: {
      type: Number,
      default: 99,
    },
    content: {
      type: [Number, String],
      default: undefined,
    },
    anchor: {
      type: String as PropType<Anchor>,
      default: 'top right',
    },
    overlap: {
      type: Boolean,
      default: true,
    },
    offsetX: {
      type: [Number, String],
      default: defaultOffset,
    },
    offsetY: {
      type: [Number, String],
      default: defaultOffset,
    },
  },
  setup(props, { slots }) {
    const formatMaxContent = (content: unknown) => {
      if (!isNumeric(content))
        return content

      const numericContent = Number(content)
      if (numericContent > props.max)
        return `${props.max}+`

      return numericContent
    }

    const badgeSlotContent = computed(() => {
      if (!props.dot && slots.content)
        return formatMaxContent(slots.content?.()[0].children)

      if (!props.dot && props.content)
        return formatMaxContent(props.content)

      return ''
    })

    const anchorOffset = computed(() => {
      const newOffsetY = props.overlap && defaultOffset === props.offsetY ? defaultOverlapOffset : props.offsetY
      const newOffsetX = props.overlap && defaultOffset === props.offsetX ? defaultOverlapOffset : props.offsetX

      return { y: newOffsetY, x: newOffsetX }
    })

    const positionStyles = computed(() => {
      const [anchorY, anchorX] = props.anchor.split(' ')

      return {
        top: anchorY === 'top' ? 'auto' : `calc(100% - ${anchorOffset.value.y}px)`,
        bottom: anchorY === 'bottom' ? 'auto' : `calc(100% - ${anchorOffset.value.y}px)`,
        left: anchorX === 'left' ? 'auto' : `calc(100% - ${anchorOffset.value.x}px)`,
        right: anchorX === 'right' ? 'auto' : `calc(100% - ${anchorOffset.value.x}px)`,
      }
    })

    return () => <div class={['a-badge-wrapper relative']}>
      {slots.default?.()}
      <Transition name="scale">
        <div v-show={props.modelValue} class={[`a-badge bg-${props.color} absolute`, { 'a-badge-dot': props.dot }, { 'a-badge-bordered': props.bordered }]} style={positionStyles.value}>
          {badgeSlotContent.value}
        </div>
      </Transition>

    </div>
  },
})

export type ABadge = InstanceType<typeof ABadge>

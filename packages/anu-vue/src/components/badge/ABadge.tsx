import type { PropType } from 'vue'
import { Transition, computed, defineComponent, toRef } from 'vue'
import { color } from '@/composables/useProps'
import { spacingProp, useSpacing } from '@/composables/useSpacing'
import { isNumeric } from '@/utils/helpers'

export type VerticalAnchor = 'top' | 'bottom'
export type HorizontalAnchor = 'left' | 'right'
export type Anchor = `${VerticalAnchor} ${HorizontalAnchor}`

const defaultOffset = 4
const defaultOverlapOffset = 12

export const ABadge = defineComponent({
  name: 'ABadge',
  inheritAttrs: false,
  props: {
    spacing: spacingProp,

    /**
     * Show/Hide badge based on v-model value
     */
    modelValue: {
      type: Boolean,
      default: true,
    },

    /**
     * Sets badge color
     */
    color: {
      ...color,
      default: 'primary',
      type: String as PropType<string | null>,
    },

    /**
     * Converts badge to a dot
     */
    dot: {
      type: Boolean,
      default: false,
    },

    /**
    * Adds badge border
    */
    bordered: {
      type: Boolean,
      default: true,
    },

    /**
     * Sets the highest possible value
     */
    max: {
      type: Number,
      default: 99,
    },

    /**
     * Use to pass numeric values
     */
    content: {
      type: [Number, String],
      default: undefined,
    },

    /**
     * Sets the badge position
     */
    anchor: {
      type: String as PropType<Anchor>,
      default: 'top right',
    },

    /**
     * Adjusts position of badge
     */
    overlap: {
      type: Boolean,
      default: true,
    },

    /**
     * Sets offset on x-axis
     */
    offsetX: {
      type: [Number, String],
      default: defaultOffset,
    },

    /**
     * Sets offset on y-axis
     */
    offsetY: {
      type: [Number, String],
      default: defaultOffset,
    },
  },
  setup(props, { slots, attrs }) {
    const spacing = useSpacing(toRef(props, 'spacing'))
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
        <div
          v-show={props.modelValue}
          {...attrs}
          class={[`a-badge bg-${props.color} absolute`, { 'a-badge-dot': props.dot }, { 'a-badge-bordered': props.bordered }]}
          style={[positionStyles.value, { '--a-spacing': spacing.value / 100 }]}
        >
          {badgeSlotContent.value}
        </div>
      </Transition>
    </div>
  },
})

export type ABadge = InstanceType<typeof ABadge>

import { computed, defineComponent, ref, toRef } from 'vue'
import { useLayer, useProps as useLayerProps } from '@/composables/useLayer'
import { disabled, readonly } from '@/composables/useProps'

export const ARating = defineComponent({
  name: 'ARating',
  props: {
    // color: { default: 'primary' },
    ...useLayerProps({
      color: {
        default: 'warning',
      },
    }),

    /**
     * Bind v-model value to rating
     */
    modelValue: {
      type: Number,
      default: undefined,
    },

    /**
     * Sets amount of rating items
     */
    length: {
      type: [Number, String],
      default: 5,
    },

    /**
     * Allows the award of half a point
     */
    halve: {
      type: Boolean,
      default: false,
    },

    /**
     * Sets empty icon
     */
    emptyIcon: {
      type: String,
      default: 'i-bx:star',
    },

    /**
     * Sets half-filled icon
     */
    halfIcon: {
      type: String,
      default: 'i-bx:bxs-star-half',
    },

    /**
     * Sets filled icon
     */
    fullIcon: {
      type: String,
      default: 'i-bx:bxs-star',
    },

    /**
     * Allows to see visual changes of value on hover
     */
    noHoverHint: {
      type: Boolean,
      default: false,
    },

    /**
     * Animate icon on hover
     */
    animate: {
      type: Boolean,
      default: false,
    },

    /**
     * Make rating component readonly
     */
    readonly,

    /**
     * Disable rating selection
     */
    disabled,
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { getLayerClasses } = useLayer()

    const { styles, classes } = getLayerClasses(
      toRef(props, 'color'),
      ref(''),
      ref(false),
    )

    const rating = ref(0)
    const isHovered = ref(false)

    const visibleRating = computed(() =>
      !props.noHoverHint
      && !props.readonly
      && !props.disabled
      && isHovered.value
        ? rating.value
        : props.modelValue ?? 0,
    )

    const items = computed(() =>
      Array.from({ length: Number(props.length) }, (_, i) => i + 1).map(item =>
        item <= visibleRating.value
          ? props.fullIcon
          : item - visibleRating.value === 0.5
            ? props.halfIcon
            : props.emptyIcon,
      ),
    )

    const handleClick = () => {
      emit('update:modelValue', rating.value)
    }

    const onMouseEnter = (e: MouseEvent, index: number) => {
      isHovered.value = true

      const { offsetX, target } = e
      if (target instanceof HTMLElement) {
        const widthPercentage = (offsetX * 100) / target.clientWidth
        props.halve
          ? (rating.value = widthPercentage < 50 ? index + 0.5 : index + 1)
          : (rating.value = index + 1)
      }
    }

    const onMouseLeave = () => {
      isHovered.value = false
    }

    return () => (
       <div
        class={[
          'a-rating flex',
          (props.animate && !props.readonly && !props.disabled) && 'a-rating-animated',
          props.readonly && 'a-rating-readonly pointer-events-none',
          props.disabled && 'a-rating-disabled pointer-events-none',
          ...classes.value,
        ]}
        style={[...styles.value]}
       >

        {items.value.map((icon, i) => {
          return <i class={['cursor-pointer', icon]}
             onClick={handleClick}
             onMouseenter={(event => onMouseEnter(event, i))}
             onMouseleave={onMouseLeave}/>
        })}
       </div>
    )
  },
})

export type ARating = InstanceType<typeof ARating>

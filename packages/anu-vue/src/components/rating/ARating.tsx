import { computed, defineComponent, ref, toRef } from 'vue'
import { useLayer, useProps as useLayerProps } from '@/composables/useLayer'

export const ARating = defineComponent({
  name: 'ARating',
  props: {
    // color: { default: 'primary' },
    ...useLayerProps({
      color: {
        default: 'primary',
      },
    }),
    modelValue: {
      type: Number,
      default: 2.5,
      required: true,
    },
    itemsAmount: {
      type: Number,
      default: 5,
    },
    halving: {
      type: Boolean,
      default: false,
    },
    iconEmpty: {
      type: String,
      default: 'i-bx:star',
    },
    iconHalf: {
      type: String,
      default: 'i-bx:bxs-star-half',
    },
    iconFull: {
      type: String,
      default: 'i-bx:bxs-star',
    },
    texts: {
      type: Array,
      required: false,
      default: () => [],
    },
    hover: {
      type: Boolean,
      default: false,
    },
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

    const visibleRating = computed(() => props.hover && isHovered.value ? rating.value : props.modelValue)

    const stars = computed(() =>
      Array.from({ length: props.itemsAmount }, (_, i) => i + 1).map(item =>
        item <= visibleRating.value
          ? props.iconFull
          : item - visibleRating.value === 0.5
            ? props.iconHalf
            : props.iconEmpty,
      ),
    )

    const handleStarClick = () => {
      emit('update:modelValue', rating.value)
    }

    const onMouseMove = (e: MouseEvent, index: number) => {
      isHovered.value = true

      const { offsetX, target } = e
      if (target instanceof HTMLElement) {
        const starPercentage = (offsetX * 100) / target.clientWidth
        props.halving
          ? (rating.value = starPercentage < 50 ? index + 0.5 : index + 1)
          : (rating.value = index + 1)
      }
    }

    const onMouseLeave = () => {
      isHovered.value = false
    }

    return () => (
       <div class={['flex', ...classes.value]} style={[...styles.value]} >

        {stars.value.map((icon, i) => {
          return <i class={['cursor-pointer', icon]}
             onClick={() => handleStarClick()}
             onMousemove={(event => onMouseMove(event, i))}
             onMouseleave={onMouseLeave}/>
        })}

       {props.texts.length > 0 && <span class="ml-2">{props.texts[Math.floor(props.modelValue) - 1]}</span>}
       </div>
    )
  },
})

export type ARating = InstanceType<typeof ARating>

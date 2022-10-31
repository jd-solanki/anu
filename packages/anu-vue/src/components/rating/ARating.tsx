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

  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { getLayerClasses } = useLayer()

    const { styles, classes } = getLayerClasses(
      toRef(props, 'color'),
      ref(''),
      ref(false),
    )

    const hoverValue = ref(0)

    const stars = computed(() =>
      Array.from({ length: props.itemsAmount }, (_, i) => i + 1).map(item =>
        item <= props.modelValue
          ? props.iconFull
          : item - props.modelValue === 0.5
            ? props.iconHalf
            : props.iconEmpty,
      ),
    )

    const handleStarClick = (index: number) => {
      emit('update:modelValue', index + hoverValue.value)
    }

    const onMouseMove = (e: MouseEvent) => {
      const { offsetX, target } = e
      if (target instanceof HTMLElement) {
        const starPercentage = (offsetX * 100) / target.clientWidth
        props.halving ? (hoverValue.value = starPercentage < 50 ? 0.5 : 1) : (hoverValue.value = 1)
      }
    }

    return () => (
       <div class={['flex', ...classes.value]} style={[...styles.value]} onMousemove={onMouseMove}>

        {stars.value.map((icon, i) => {
          return <i class={['cursor-pointer', icon]} onClick={() => handleStarClick(i)}/>
        })}

       {props.texts.length > 0 && <span class="ml-2">{props.texts[Math.floor(props.modelValue) - 1]}</span>}
       </div>
    )
  },
})

export type ARating = InstanceType<typeof ARating>

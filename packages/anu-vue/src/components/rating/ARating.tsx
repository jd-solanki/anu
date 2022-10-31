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

    iconEmpty: {
      type: String,
      default: 'i-bx:star',
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

    const stars = computed(() =>
      Array.from({ length: props.itemsAmount }, (_, i) => i + 1).map(item =>
        item <= props.modelValue
          ? props.iconFull
          : props.iconEmpty,
      ),
    )

    const handleStarClick = (index: number) => {
      emit('update:modelValue', index + 1)
    }

    return () => (
       <div class={['flex', ...classes.value]} style={[...styles.value]}>
        {stars.value.map((icon, i) => {
          return <i class={[icon]} onClick={() => handleStarClick(i)}/>
        })}

       {props.texts.length > 0 && <span class="ml-2">{props.texts[Math.floor(props.modelValue) - 1]}</span>}
       </div>
    )
  },
})

export type ARating = InstanceType<typeof ARating>

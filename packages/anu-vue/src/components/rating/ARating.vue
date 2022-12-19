<script lang="ts" setup>
import type { LayerProps } from '@/composables/useLayer'
import { useLayer } from '@/composables/useLayer'

type ModelValue = number

interface Props extends LayerProps {
  modelValue?: ModelValue
  length?: number | string
  halve?: boolean
  emptyIcon?: string
  halfIcon?: string
  fullIcon?: string
  noHoverHint?: boolean
  animate?: boolean
  readonly?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: 'warning',
  length: 5,
  emptyIcon: 'i-bx-star',
  halfIcon: 'i-bx:bxs-star-half',
  fullIcon: 'i-bx:bxs-star',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: ModelValue): void
}>()

defineOptions({
  name: 'ARating',
})

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
</script>

<template>
  <div
    :style="styles"
    class="a-rating flex"
    :class="[
      (props.animate && !props.readonly && !props.disabled) && 'a-rating-animated',
      props.readonly && 'a-rating-readonly pointer-events-none',
      props.disabled && 'a-rating-disabled pointer-events-none',
      ...classes,
    ]"
  >
    <i
      v-for="(icon, index) in items"
      :key="index"
      class="cursor-pointer"
      :class="icon"
      @click="handleClick"
      @mouseenter="onMouseEnter($event, index)"
      @mouseleave="onMouseLeave"
    />
  </div>
</template>

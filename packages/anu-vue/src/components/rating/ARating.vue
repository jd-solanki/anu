<script lang="ts" setup>
import { defu } from 'defu'
import type { ExtractPropTypes } from 'vue'
import { useColor } from '@/composables'
import { color as colorProp, disabled as disabledProp, readonly as readonlyProp } from '@/composables/useProps'

const props = defineProps({
  /**
   * Rating color
   */
  color: defu({ default: 'warning' }, colorProp),

  /**
   * Bind v-model value to rating
   */
  modelValue: Number,

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
  halve: Boolean,

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
  noHoverHint: Boolean,

  /**
   * Animate icon on hover
   */
  animate: Boolean,

  /**
   * Make rating component readonly
   */
  readonly: readonlyProp,

  /**
   * Disable rating selection
   */
  disabled: disabledProp,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: (ExtractPropTypes<typeof props>)['modelValue']): void
}>()

defineOptions({
  name: 'ARating',
})

const { styles } = useColor(toRef(props, 'color'), 'rating-color')

const rating = ref(0)
const isHovered = ref(false)

const visibleRating = computed(() =>
  (!props.noHoverHint
    && !props.readonly
    && !props.disabled
    && isHovered.value)
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

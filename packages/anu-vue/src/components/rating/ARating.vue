<script lang="ts" setup>
import type { ARatingEvents } from './meta'
import { aRatingProps } from './meta'
import { useColor } from '@/composables'
import { useDefaults } from '@/composables/useDefaults'

// SECTION Meta
const _props = defineProps(aRatingProps)
const emit = defineEmits<ARatingEvents>()

defineOptions({
  name: 'ARating',
})
const { props, defaultsClass, defaultsStyle, defaultsAttrs } = useDefaults(_props)

// !SECTION

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

function handleClick() {
  emit('update:modelValue', rating.value)
}

function onMouseEnter(e: MouseEvent, index: number) {
  isHovered.value = true

  const { offsetX, target } = e
  if (target instanceof HTMLElement) {
    const widthPercentage = (offsetX * 100) / target.clientWidth
    props.halve
      ? (rating.value = widthPercentage < 50 ? index + 0.5 : index + 1)
      : (rating.value = index + 1)
  }
}

function onMouseLeave() {
  isHovered.value = false
}
</script>

<template>
  <div
    v-bind="defaultsAttrs"
    :style="[styles, defaultsStyle]"
    class="a-rating flex"
    :class="[
      (props.animate && !props.readonly && !props.disabled) && 'a-rating-animated',
      props.readonly && 'a-rating-readonly pointer-events-none',
      props.disabled && 'a-rating-disabled pointer-events-none',
      defaultsClass,
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

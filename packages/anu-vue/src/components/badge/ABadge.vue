<script lang="ts" setup>
import { defu } from 'defu'
import type { PropType } from 'vue'
import { color as colorProp } from '@/composables/useProps'
import { isNumeric } from '@/utils/helpers'

type VerticalAnchor = 'top' | 'bottom'
type HorizontalAnchor = 'left' | 'right'
type Anchor = `${VerticalAnchor} ${HorizontalAnchor}`

const props = defineProps({

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
  color: defu({
    default: 'primary',
  }, colorProp),

  /**
   * Converts badge to a dot
   */
  dot: Boolean,

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
  max: Number,

  /**
   * Use to pass numeric values
   */
  content: [Number, String],

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
    default: 4,
  },

  /**
   * Sets offset on y-axis
   */
  offsetY: {
    type: [Number, String],
    default: 4,
  },
})

// ❗ Make sure to sync it with props `offsetX` & `offsetY`
const defaultOffset = 4

const defaultOverlapOffset = 12

defineOptions({
  name: 'ABadge',
  inheritAttrs: false,
})

const formatMaxContent = (content: unknown) => {
  if (!isNumeric(content) || props.max === undefined)
    return content

  const numericContent = Number(content)
  if (numericContent > props.max)
    return `${props.max}+`

  return numericContent
}

const anchorOffset = computed(() => {
  const newOffsetY = (props.overlap && defaultOffset === props.offsetY) ? defaultOverlapOffset : props.offsetY
  const newOffsetX = (props.overlap && defaultOffset === props.offsetX) ? defaultOverlapOffset : props.offsetX

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
</script>

<template>
  <div class="a-badge-wrapper relative">
    <slot />
    <Transition name="scale">
      <div
        v-show="props.modelValue"
        v-bind="$attrs"
        class="a-badge absolute"
        :class="[
          `bg-${props.color}`,
          { 'a-badge-dot': props.dot },
          { 'a-badge-bordered': props.bordered },
        ]"
        :style="positionStyles"
      >
        <template v-if="!props.dot">
          <template v-if="$slots.content">
            {{ formatMaxContent($slots.content()[0].children) }}
          </template>
          <template v-else-if="props.content">
            {{ formatMaxContent(props.content) }}
          </template>
        </template>
      </div>
    </Transition>
  </div>
</template>

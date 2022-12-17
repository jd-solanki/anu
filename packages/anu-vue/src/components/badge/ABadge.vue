<script lang="ts" setup>
import type { ColorProp } from '@/composables/useProps'
import { useSpacing } from '@/composables/useSpacing'
import { isNumeric } from '@/utils/helpers'

defineOptions({
  name: 'ABadge',
  inheritAttrs: false,
})

type VerticalAnchor = 'top' | 'bottom'
type HorizontalAnchor = 'left' | 'right'
type Anchor = `${VerticalAnchor} ${HorizontalAnchor}`

interface Props {
  spacing: number
  modelValue: boolean
  color?: ColorProp
  dot?: boolean
  bordered?: boolean
  max?: number
  content: number | string
  anchor: Anchor
  overlap?: boolean
  offsetX: number | string
  offsetY: number | string
}

const defaultOffset = 4

// eslint-disable-next-line vue/define-macros-order
const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  modelValue: true,
  dot: false,
  bordered: true,
  anchor: 'top right',
  overlap: true,
  offsetX: defaultOffset,
  offsetY: 4,
})

const defaultOverlapOffset = 12

const spacing = useSpacing(toRef(props, 'spacing'))
const formatMaxContent = (content: unknown) => {
  if (!isNumeric(content) || props.max === undefined)
    return content

  const numericContent = Number(content)
  if (numericContent > props.max)
    return `${props.max}+`

  return numericContent
}

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
        :style="[
          positionStyles,
          { '--a-spacing': spacing / 100 },
        ]"
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

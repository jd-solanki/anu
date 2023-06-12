<script lang="ts" setup>
import type { aBadgeSlots } from './meta'
import { aBadgeDefaultOffset, aBadgeDefaultOverlapOffset, aBadgeProps } from './meta'
import { useDefaults } from '@/composables/useDefaults'
import { isNumeric } from '@/utils/helpers'

// SECTION Meta
const _props = defineProps(aBadgeProps)
defineSlots<typeof aBadgeSlots>()

defineOptions({
  name: 'ABadge',
  inheritAttrs: false,
})
const { props, defaultsClass, defaultsStyle, defaultsAttrs } = useDefaults(_props)

// !SECTION

function formatMaxContent(content: unknown) {
  if (!isNumeric(content) || props.max === undefined)
    return content

  const numericContent = Number(content)
  if (numericContent > props.max)
    return `${props.max}+`

  return numericContent
}

const anchorOffset = computed(() => {
  const newOffsetY = (props.overlap && aBadgeDefaultOffset === props.offsetY) ? aBadgeDefaultOverlapOffset : props.offsetY
  const newOffsetX = (props.overlap && aBadgeDefaultOffset === props.offsetX) ? aBadgeDefaultOverlapOffset : props.offsetX

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
    <Transition name="dialog">
      <div
        v-show="props.modelValue"
        v-bind="{ ...$attrs, ...defaultsAttrs }"
        class="a-badge absolute"
        :class="[
          `bg-${props.color}`,
          { 'a-badge-dot': props.dot },
          { 'a-badge-bordered': props.bordered },
          defaultsClass,
        ]"
        :style="[positionStyles, defaultsStyle]"
      >
        <template v-if="!props.dot">
          <template v-if="$slots.content">
            {{ formatMaxContent($slots.content()[0]?.children) }}
          </template>
          <template v-else-if="props.content">
            {{ formatMaxContent(props.content) }}
          </template>
        </template>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { circleProps } from './props'
import { useLayer } from '@/composables/useLayer'

const props = defineProps(circleProps)

defineOptions({
  name: 'ACircle',
})

const { getLayerClasses } = useLayer()

const { styles, classes } = getLayerClasses(
  toRef(props, 'color'),
  toRef(props, 'variant'),
  toRef(props, 'states'),
)

// NOTE - Inspired from https://codepen.io/yufish/pen/mdBRmaM
// and https://stackoverflow.com/questions/52067363/how-to-create-a-circle-progress-inside-a-vue-component

// Calculate circle data
const pad = props.rounded ? 9 : 0
const radius = props.rounded ? 52 : 28
const side = radius + pad
const circumference = Math.round(Math.PI * radius * 2)

// Convert to array or format data
const items = computed(() => Array.isArray(props.value) ? props.value : [{ value: props.value, class: 'stroke-current' }])

// Get the total and all percentages
const total = computed(() => items.value.reduce((prev, cur) => prev + cur.value, 0))
const percentages = computed(() => items.value.map(item => total.value ? item.value / (props.isPercent ? 100 : total.value) : 0))

const circles = computed(() => items.value.map((item, index) => {
  const percent = percentages.value[index]
  const cumul: number = percentages.value.slice(0, index).reduce((prev, cur) => prev + cur, 0)

  return {
    ...item,
    percent,
    cumul,

    'startX': Math.cos((cumul - 0.25) * 2 * Math.PI) * (radius - (item.startOffset || 0)), // subtract .25 to start on North
    'startY': Math.sin((cumul - 0.25) * 2 * Math.PI) * (radius - (item.startOffset || 0)),
    'endX': Math.cos((cumul + percent - 0.25) * 2 * Math.PI) * (radius - (item.endOffset || 0)),
    'endY': Math.sin((cumul + percent - 0.25) * 2 * Math.PI) * (radius - (item.endOffset || 0)),
    'stroke-dasharray': `${percent * circumference} ${circumference}`,
    'stroke-dashoffset': -cumul * circumference,
    'style': item.offset && `transform: scale(${item.offset / 40})`,
  }
}))
</script>

<template>
  <div class="">
    <div class="relative flex">
      <svg
        class="inline w-[1em] h-[1em] ww-$a-spinner-size hh-$a-spinner-size"
        :class="[
          animation,
          !rounded && 'rounded-full',
          ...classes,
          svgClasses,
        ]"
        fill="none"
        :style="styles"
        :viewBox="`-${side},-${side},${(side) * 2},${(side) * 2}`"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          class="progress-ring-circle fill-none stroke-18 stroke-current opacity-25"
          :class="ringClasses"
          :r="radius"
        />

        <g class="-rotate-90">

          <circle
            v-for="(circle, index) in circles"
            :key="index"
            :r="radius"
            :stroke-linecap="rounded ? 'round' : 'inherit'"
            stroke-width="18"
            v-bind="circle"
          />
        </g>

        <slot v-bind="{ circles, total }" />
      </svg>

      <div class="absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center select-none pointer-events-none">
        <slot
          name="center"
          v-bind="{ circles, total }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
svg * {
  transform-box: fill-box;
  transform-origin: center
}
</style>

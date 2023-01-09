<script setup lang="ts">
import { circleProps } from './props'
import { useLayer } from '@/composables/useLayer'
import { useArcs } from '@/composables/useTrigonometry'

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
styles.value.push(props.svgStyles)
if (props.gooey)
  styles.value.push({ filter: 'url(#goo)' })

// NOTE - Inspired from https://codepen.io/yufish/pen/mdBRmaM
// and https://stackoverflow.com/questions/52067363/how-to-create-a-circle-progress-inside-a-vue-component

// Calculate circle data
const padding = props.type === 'pie' ? 0 : 20
const radius = props.rounded ? 100 : 100
const side = radius + padding

const circumference = Math.round(Math.PI * radius * 2)

let circles: any

const { arcs, total, viewBox: composableViewBox } = useArcs(toRef(props, 'value'))

let viewBox = props.viewBox || composableViewBox

    const origin = item.origin ? item.origin / 100 : 0
    const cumulPercent = cumul + origin - 0.25 // subtract 25% to start on North
    const startR = radius - (item.startDistance || 0)
    const endR = radius - (item.endDistance || 0)
    const pi2 = Math.PI * 2

    return {
      ...item,
      percent,
      cumul,

      'startX': Math.cos(cumulPercent * pi2) * startR,
      'startY': Math.sin(cumulPercent * pi2) * startR,
      'endX': Math.cos((cumulPercent + percent) * pi2) * endR,
      'endY': Math.sin((cumulPercent + percent) * pi2) * endR,
      'stroke-dasharray': `${percent * circumference} ${circumference}`,
      'stroke-dashoffset': -(cumul + origin) * circumference,
      'style': item.distance && `transform: scale(${item.distance / radius})`,
    }
  }))
}
</script>

<template>
  <div class="">
    <div
      class="relative flex"
    >
      <svg
        class="inline w-[1em] h-[1em] ww-$a-spinner-size hh-$a-spinner-size"
        :class="[
          animation,
          ...classes,
          svgClasses,
          props.type === 'pie' && 'rounded-full',
        ]"
        fill="none"
        :style="styles"
        :viewBox="viewBox"
        :width="maxX"
        :height="maxY"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          v-if="arcs"
          class="-rotate-90"
        >
          <circle
            class="progress-ring-circle fill-none stroke-current opacity-25"
            stroke-width="40"
            :class="ringClasses"
            :r="radius"
          />
          <circle
            v-for="(circle, index) in arcs"
            :key="index"
            :r="radius"
            :stroke-linecap="rounded ? 'round' : 'inherit'"
            class="stroke-current"
            stroke-width="40"
            v-bind="circle"
            style="text: red;"
          />
        </g>

        <slot v-bind="{ arcs, matrix, total }" />
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

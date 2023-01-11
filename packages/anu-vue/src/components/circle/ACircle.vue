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

let circles: any

const { arcs, radius, side, total, viewBox: composableViewBox } = useArcs(toRef(props, 'value'), {
  isPercentages: toRef(props, 'isPercentages'),
  padding: props.type === 'pie' ? 0 : 20,
})

const viewBox = props.viewBox || composableViewBox
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
          />
        </g>

        <slot v-bind="{ arcs, radius, side, total }" />
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

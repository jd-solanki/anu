<script lang="ts" setup>
import { TransitionPresets, useMouseInElement, useMousePressed, useTransition, useWindowScroll } from '@vueuse/core'
import { rand } from '@vueuse/shared'
import { computed, onMounted, ref, watch } from 'vue'

const colors = ['primary', 'info', 'success', 'warning', 'danger']

const baseNumber = ref(35)

const number = useTransition(baseNumber, {
  duration: 1500,
  transition: TransitionPresets.easeOutExpo,
})

const toggle = () => {
  baseNumber.value = rand(0, 100)
}

const target = ref(null)
const knob = ref(25)
const { elementX, elementY, elementWidth, elementHeight, isOutside } = useMouseInElement(target)
const { pressed } = useMousePressed({ target })

// Calculate the angle
const angle = computed(() => {
  const theta = (Math.atan2(elementY.value - (elementHeight.value / 2), elementX.value - (elementWidth.value / 2)) * 180 / Math.PI + 450) % 360

  return (theta / 3.6) % 100
})
watch(angle, () => {
  if (pressed.value)
    knob.value = angle.value
})

// scroll
const { y } = useWindowScroll()

const scroll = ref(1)
const wHeight = ref(0)
onMounted(() => {
  wHeight.value = document.body.scrollHeight - window.innerHeight
})
watch(y, () => {
  scroll.value = y.value / wHeight.value * 100
})

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const onClick = () => {
  console.log('click')
}
</script>

<template>
  <ACircle
    color="danger"
    class="text-xl"
    :value="[{ class: 'fill-$a-layer-color animate-ping-dot', r: 40 },
             { class: 'fill-$a-layer-color animate-ping', r: 60 },
    ]"
    svg-classes="rounded-full"
    ring-classes="hidden"
  />

  <ACircle
    :value="scroll"
    :color="scroll >= 100 ? 'success' : null"
    class="text-6xl fixed z-999 bottom-4 right-4 cursor-pointer hover:opacity-80 transition"
    svg-classes="transition"
    ring-classes="hover:bg-primary"
    @click="scrollToTop()"
  >
    <template #center>
      <div
        v-if="scroll < 100"
        class="text-xs"
      >
        {{ Math.round(y) }}
      </div>
      <i
        v-else
        class="i-bx-bxs-arrow-from-bottom text-success text-2xl"
      />
    </template>
  </ACircle>

  <div class="flex justify-between">
    <ABtn
      class="animate-shake-x"
      @click="toggle()"
    >
      Transition
    </ABtn>

    <ACircle
      :value="number"
      color="warning"
      class="text-6xl"
    />

    <ACircle
      ref="target"
      :value="number"
      color="primary"
      class="text-6xl"
    >
      <template #center>
        <div class="text-sm">
          {{ Math.round(number) }}
        </div>
      </template>
    </ACircle>

    <ACircle
      ref="target"
      :value="{ value: knob, class: 'stroke-15 stroke-cap-round' }"
      color="danger"
      class="text-8xl cursor-pointer"
      ring-classes="stroke-15"
    >
      <template #default="{ circles, total }">
        <circle
          class="fill-danger"
          :cx="circles[0].endX"
          :cy="circles[0].endY"
          r="20"
          @click="onClick"
        />
        <text
          x="0"
          y="0"
          fill="red"
          class="text-5xl text-center"
          dominant-baseline="middle"
          text-anchor="middle"
        >
          {{ Math.round(total) }}
        </text>
      </template>
    </ACircle>

    <ACircle
      ref="target"
      :value="[{ value: knob, class: 'stroke-info' }]"
      color="info"
      class="text-8xl bg-info bg-opacity-30 rounded-full cursor-pointer"
      ring-classes="stroke-white opacity-50"
    >
      <template #center>
        <div class="text-base flex justify-between items-center w-10 text-info font-bold">
          <i class="i-bx-bxs-volume-full" />
          {{ Math.round(knob) }}
        </div>
      </template>
    </ACircle>
  </div>
</template>
